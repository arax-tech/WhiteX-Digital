<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\User;
use Auth;
use DB;

class ClientController extends Controller
{

    public function index(Request $request)
    {
    	$clients = User::where('role', 'Client')->get();
		return response()->json([
		   'status' => 200,
		   'clients' => $clients,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$client = User::find($id);
		return response()->json([
		   'status' => 200,
		   'client' => $client,
		], 200);
    }
    public function store(Request $request)
    {
	    $check = User::where('email', $request->email)->count();
	    if ($check < 1) {
			$client = new User();
			$res = explode("--|--", $request->email);
			$client->customer_id = $res[0];
			$client->email = $res[1];
			$client->role = 'Client';
			$client->password = Hash::make('123');
			$client->permissions = $request->permissions;
			$reset_token = sha1(time());
			$client->reset_token = $reset_token;
			$client->save();

			$verify_url = "http://localhost:5173/password/set/".$reset_token;
			$details = ['verify_url' =>  $verify_url];
			   
			Mail::to($client->email)->send(new \App\Mail\NewAccount($details));


			return response()->json([
			   'status' => 200,
			   'message' => 'Client Create Successfuly...',
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
		$client = User::find($id);
		$res = explode("--|--", $request->email);
		$client->customer_id = $res[0];
		$client->email = $res[1];
		$client->permissions = $request->permissions;
		$client->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Client Update Successfuly...',
		], 200);
    }

    public function delete($id)
    {
    	User::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Client Delete Successfuly...',
		], 200);
    }
    
}
