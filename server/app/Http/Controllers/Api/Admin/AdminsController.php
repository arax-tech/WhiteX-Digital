<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use Auth;
use DB;

class AdminsController extends Controller
{

    public function index(Request $request)
    {
    	$admins = User::where('role', 'Admin')->get();
		return response()->json([
		   'status' => 200,
		   'admins' => $admins,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$admin = User::find($id);
		return response()->json([
		   'status' => 200,
		   'admin' => $admin,
		], 200);
    }
    public function store(Request $request)
    {
	    $check = User::where('email', $request->email)->count();
	    if ($check < 1) {
	    	error_reporting(0);
			$admin = new User();
			$admin->name = $request->name;
			$admin->email = $request->email;
			$admin->role = $request->role;
			$admin->designation = $request->designation;
			$admin->password = Hash::make($request->password);

			if ($request->hasFile('image')){
				if ($admin->image) {unlink(public_path('assets/admin/profile/').$admin->image);}
			    $file1 = 'admin-'.time().'.'.$request->image->extension();
			    $request->image->storeAs('/admin/profile/', $file1, 'my_files');
			    $admin->image = URL::to('').'/assets/admin/profile/'.$file1;
			}
			$admin->permissions = $request->permissions;
			$admin->save();
			return response()->json([
			   'status' => 200,
			   'message' => 'Admin Create Successfuly...',
			], 200);
	    }else{
	    	return response()->json([
	    	   'status' => 422,
	    	   'message'=> 'Email already taken, Please use another email...'
	    	],422);
	    }
    	
    }

    public function update(Request $request, $id)
    {
    	error_reporting(0);
		// return $request->all();
		$admin = User::find($id);
		$admin->name = $request->name;
		$admin->email = $request->email;
		$admin->designation = $request->designation;

		if ($request->hasFile('image')){
			if ($admin->image) {unlink(public_path('assets/admin/profile/').$admin->image);}
		    $file1 = 'admin-'.time().'.'.$request->image->extension();
		    $request->image->storeAs('/admin/profile/', $file1, 'my_files');
		    $admin->image = URL::to('').'/assets/admin/profile/'.$file1;
		}else{
		    $admin->image = $admin->image;
		}
		$admin->permissions = $request->permissions;
		$admin->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Admin Update Successfuly...',
		], 200);
    }

    public function delete($id)
    {
    	User::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Admin Delete Successfuly...',
		], 200);
    }
    
}
