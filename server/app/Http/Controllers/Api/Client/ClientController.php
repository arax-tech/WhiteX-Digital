<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use App\CustomMenu;
use App\PopupMessage;
use App\Setting;
use App\User;
use Auth;

class ClientController extends Controller
{

    public function profile(Request $request)
    {
		$menus = CustomMenu::where('user_id', auth::user()->id)->get();
		$PopupMessages = PopupMessage::where('client_id', auth::user()->id)->get();
    	$setting = Setting::find(1);
		return response()->json([
		   'status' => 200,
		   'user' => Auth::user(),
		   'menus' => $menus,
		   'setting' => $setting,
		   'PopupMessages' => $PopupMessages,
		], 200);
    }
    public function update_profile(Request $request)
    {
    	error_reporting(0);
		// return $request->all();
		$client = User::find(auth::user()->id);
		$client->name = $request->name;
		$client->company_name = $request->company_name;
		$client->phone = $request->phone;
		$client->address_1 = $request->address_1;
		$client->address_2 = $request->address_2;

		if ($request->hasFile('image')){
			if ($client->image) {unlink(public_path('assets/client/profile/').$client->image);}
		    $file1 = 'client-'.time().'.'.$request->image->extension();
		    $request->image->storeAs('/client/profile/', $file1, 'my_files');
		    $client->image = URL::to('').'/assets/client/profile/'.$file1;
		}else{
		    $client->image = $client->image;
		}
		$client->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Profile Updated Successfuly...',
		   'user' => Auth::user(),
		], 200);
    }
}
