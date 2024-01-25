<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Auth;
use DB;

class AdminController extends Controller
{

    public function profile(Request $request)
    {
		return response()->json([
		   'status' => 200,
		   'user' => Auth::user(),
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
			if ($admin->image) {unlink(public_path('backend/admin/profile/').$admin->image);}
		    $file1 = 'admin-'.time().'.'.$request->image->extension();
		    $request->image->storeAs('/admin/profile/', $file1, 'my_files');
		    $admin->image = $file1;
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
}
