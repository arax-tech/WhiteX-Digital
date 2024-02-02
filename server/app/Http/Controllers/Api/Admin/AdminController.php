<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;

use Illuminate\Http\Request;
use App\CustomMenu;
use App\Settings;
use App\User;
use Auth;
use DB;

class AdminController extends Controller
{

    public function profile(Request $request)
    {
    	$menus = CustomMenu::where('user_id', auth::user()->id)->get();
		return response()->json([
		   'status' => 200,
		   'user' => Auth::user(),
		   'menus' => $menus,
		], 200);
    }
    public function update_profile(Request $request)
    {
    	error_reporting(0);
		// return $request->all();
		$admin = User::find(auth::user()->id);
		$admin->name = $request->name;
		$admin->email = $request->email;

		if ($request->hasFile('image')){
			if ($admin->image) {unlink(public_path('assets/admin/profile/').$admin->image);}
		    $file1 = 'admin-'.time().'.'.$request->image->extension();
		    $request->image->storeAs('/admin/profile/', $file1, 'my_files');
		    $admin->image = URL::to('').'/assets/admin/profile/'.$file1;
		}else{
		    $admin->image = $admin->image;
		}
		$admin->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Profile Updated Successfuly...',
		   'user' => Auth::user(),
		], 200);
    }
	public function apiKey(Request $request)
    {
    	$config = Settings::where('type', $request->type)->first();
		if(!$config){
			$config = new Settings();
			$config->type = $request->type;
			$config->value = $request->value;
			$config->save();
			return response()->json([
			'status' => 200,
			'message' => "key Updated",
			], 200);
		}else{
			$config->value = $request->value;
			$config->save();
			return response()->json([
			'status' => 200,
			'message' => "key Updated",
			], 200);
		}
    }
}
