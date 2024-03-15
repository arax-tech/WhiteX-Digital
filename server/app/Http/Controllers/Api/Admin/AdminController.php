<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;

use Illuminate\Http\Request;
use App\CustomMenu;
use App\Setting;
use App\User;
use App\Lead;
use Auth;
use DB;

class AdminController extends Controller
{

    public function profile(Request $request)
    {
    	$menus = CustomMenu::where('user_id', auth::user()->id)->get();
    	$setting = Setting::find(1);
        $notifications = Lead::where('notification', 1)->get();
		return response()->json([
		   'status' => 200,
		   'user' => Auth::user(),
		   'menus' => $menus,
           'setting' => $setting,
		   'notifications' => $notifications,
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

    public function update_setting(Request $request)
    {
        // $setting = Setting::find($id);
        $setting = Setting::find(1);
        if ($request->hasFile('menu_logo')){
            $file1 = 'menu_logo-'.time().'.'.$request->menu_logo->extension();
            $request->menu_logo->storeAs('/setting/', $file1, 'my_files');
            $setting->menu_logo = URL::to('').'/assets/setting/'.$file1;
        }else{
            $setting->menu_logo = $setting->menu_logo;
        }

        if ($request->hasFile('fevicon')){
            $file1 = 'fevicon-'.time().'.'.$request->fevicon->extension();
            $request->fevicon->storeAs('/setting/', $file1, 'my_files');
            $setting->fevicon = URL::to('').'/assets/setting/'.$file1;
        }else{
            $setting->fevicon = $setting->fevicon;
        }

        if ($request->hasFile('invoice_logo')){
            $file1 = 'invoice_logo-'.time().'.'.$request->invoice_logo->extension();
            $request->invoice_logo->storeAs('/setting/', $file1, 'my_files');
            $setting->invoice_logo = URL::to('').'/assets/setting/'.$file1;
        }else{
            $setting->invoice_logo = $setting->invoice_logo;
        }
        $setting->company_name = $request->company_name;
        $setting->email = $request->email;
        $setting->phone1 = $request->phone1;
        $setting->phone2 = $request->phone2;
        $setting->phone3 = $request->phone3;
        $setting->address_1 = $request->address_1;
        $setting->address_2 = $request->address_2;
        $setting->save();
        return response()->json([
           'status' => 200,
           'message'=> 'Setting Update Successfully...',
        ], 200);
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
