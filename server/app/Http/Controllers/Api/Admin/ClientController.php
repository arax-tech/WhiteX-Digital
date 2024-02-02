<?php

namespace App\Http\Controllers\Api\Admin;

use App\Campaign;
use App\Credit;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
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
	    	error_reporting(0);
			$client = new User();
			$client->name = $request->name;
			$client->email = $request->email;
			$client->role = $request->role;
			$client->designation = $request->designation;
			$client->password = Hash::make($request->password);

			if ($request->hasFile('image')){
				if ($client->image) {unlink(public_path('assets/client/profile/').$client->image);}
			    $file1 = 'client-'.time().'.'.$request->image->extension();
			    $request->image->storeAs('/client/profile/', $file1, 'my_files');
			    $client->image = URL::to('').'/assets/client/profile/'.$file1;
			}
			$client->permissions = $request->permissions;
			$client->save();
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
		$client->name = $request->name;
		$client->email = $request->email;
		$client->designation = $request->designation;

		if ($request->hasFile('image')){
			if ($client->image) {unlink(public_path('assets/client/profile/').$client->image);}
		    $file1 = 'client-'.time().'.'.$request->image->extension();
		    $request->image->storeAs('/client/profile/', $file1, 'my_files');
		    $client->image = URL::to('').'/assets/client/profile/'.$file1;
		}else{
		    $client->image = $client->image;
		}
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
	public function credit($id)
    {
		if(! Credit::where('user_id',$id)->where('type','email')->first()){
			Credit::insert([
				['type' => 'email', 'credits' => 0, 'user_id' => $id],
			]);
		}
		if(! Credit::where('user_id',$id)->where('type','sms')->first()){
			Credit::insert([
				['type' => 'sms', 'credits' => 0, 'user_id' => $id],
			]);
		}
		if(! Credit::where('user_id',$id)->where('type','chatbot')->first()){
			Credit::insert([
				['type' => 'chatbot', 'credits' => 0, 'user_id' => $id],
			]);
		}
    	$user= User::find($id);
		if($user){
			$credits = Credit::where('user_id',$user->id)->get();
			if($credits){
				return response()->json([
					'status' => 200,
					'credits' => $credits,
				 ], 200);
			}else{
				return response()->json([
					'status' => 500,
					'message' => 'Credits Not Found...',
				 ], 200);
			}
		}else{
			return response()->json([
				'status' => 500,
				'message' => 'Client Not Found...',
			 ], 200);
		}
    }
	public function editCredit(Request $request)
    {
    	$user= User::find($request->user_id);
		if($user){
			$credit = Credit::where('user_id',$request->user_id)->where('type',$request->c_type)->first();
			if($request->type == 'sum'){
				$credit->credits -= $request->credit;
			}elseif($request->type == 'add'){
				$credit->credits += $request->credit;
				// update users campaigns
				Campaign::where('user_id',$request->user_id)
				->where('flag', 1)->update([
					'flag' => 0
				]);
			}
			$credit->save();
			return response()->json([
				'status' => 200,
				'credit' => $credit,
			 ], 200);
		}else{
			return response()->json([
				'status' => 500,
				'message' => 'Client Not Found...',
			 ], 200);
		}
    }
    
}
