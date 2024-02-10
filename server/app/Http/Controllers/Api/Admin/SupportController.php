<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Support;
use App\SupportChat;
use App\User;
use Auth;
use DB;
class SupportController extends Controller
{

    public function index(Request $request)
    {
    	$supports = Support::get();
    	foreach ($supports as $key => $value)
    	{
    		$client = User::where(['id' => $value->client_id])->first();
    		$assigned = User::where(['id' => $value->assigned_to])->first();
    		$supports[$key]->client = $client;
    		$supports[$key]->assigned = $assigned;
    	}
		return response()->json([
		   'status' => 200,
		   'supports' => $supports,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	error_reporting(0);
    	$support = Support::find($id);
    	$chats = SupportChat::where('support_id', $id)->get();
    	foreach ($chats as $key => $value) {
    		$user = User::where(['id' => $value->user_id])->first();
    		$chats[$key]->user_id = $user->id;
    		$chats[$key]->user_name = $user->name;
    		$chats[$key]->user_email = $user->email;
    		$chats[$key]->user_image = $user->image;
    	}
		return response()->json([
		   'status' => 200,
		   'support' => $support,
		   'chats' => $chats,
		], 200);
    }
    public function store(Request $request)
    {
		$support = new Support();
		$support->client_id = $request->client_id;
		$support->title = $request->title;
		$support->message = $request->message;
		$support->department = $request->department;
		$support->priority = $request->priority;
		$support->resolution_summary = $request->resolution_summary;
		$support->status = $request->status;
		$support->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Support Create Successfuly...',
		], 200);
    }

    public function update(Request $request, $id)
    {
   
		$support = Support::find($id);
		$support->assigned_to = $request->assigned_to;
		$support->status = $request->status;
		$support->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Support Ticket Assigned Successfuly...',
		], 200);
    }

    public function delete($id)
    {
    	Support::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Support Delete Successfuly...',
		], 200);
    }
    
}
