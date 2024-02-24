<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use Auth;
use DB;

class TeamController extends Controller
{

    public function index(Request $request)
    {
    	$teams = User::where('role', 'Team')->get();
		return response()->json([
		   'status' => 200,
		   'teams' => $teams,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$team = User::find($id);
		return response()->json([
		   'status' => 200,
		   'team' => $team,
		], 200);
    }
    public function store(Request $request)
    {
	    $check = User::where('email', $request->email)->count();
	    if ($check < 1) {
	    	error_reporting(0);
			$team = new User();
			$team->name = $request->name;
			$team->email = $request->email;
			$team->role = $request->role;
			$team->designation = $request->designation;
			$team->password = Hash::make($request->password);

			if ($request->hasFile('image')){
				if ($team->image) {unlink(public_path('assets/team/profile/').$team->image);}
			    $file1 = 'team-'.time().'.'.$request->image->extension();
			    $request->image->storeAs('/team/profile/', $file1, 'my_files');
			    $team->image = URL::to('').'/assets/team/profile/'.$file1;
			}
			$team->permissions = $request->permissions;
			$team->save();
			return response()->json([
			   'status' => 200,
			   'message' => 'Team Create Successfuly...',
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
		$team = User::find($id);
		$team->name = $request->name;
		$team->email = $request->email;
		$team->designation = $request->designation;

		if ($request->hasFile('image')){
			if ($team->image) {unlink(public_path('assets/team/profile/').$team->image);}
		    $file1 = 'team-'.time().'.'.$request->image->extension();
		    $request->image->storeAs('/team/profile/', $file1, 'my_files');
		    $team->image = URL::to('').'/assets/team/profile/'.$file1;
		}else{
		    $team->image = $team->image;
		}
		$team->permissions = $request->permissions;
		$team->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Team Update Successfuly...',
		], 200);
    }

    public function delete($id)
    {
    	User::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Team Delete Successfuly...',
		], 200);
    }
    
}
