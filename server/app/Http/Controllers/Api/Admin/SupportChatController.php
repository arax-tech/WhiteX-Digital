<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\SupportChat;
use App\Support;
use App\User;
use Auth;
use DB;
class SupportChatController extends Controller
{

    public function index($id)
    {
    	$supportChats = SupportChat::where('support_id', $id)->get();
    	foreach ($supportChats as $key => $value)
    	{
    		$user = User::where(['id' => $value->user_id])->first();
    		$supportChats[$key]->user = $user;
    		$supportChats[$key]->assigned = $assigned;
    	}
		return response()->json([
		   'status' => 200,
		   'supportChats' => $supportChats,
		], 200);
    }
    public function store(Request $request, $support_id)
    {
		$chat = new SupportChat();
		$chat->user_id = auth::user()->id;
		$chat->support_id = $support_id;
		$chat->content = $request->content;
		$chat->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Message Send Successfuly...',
		], 200);
    }
    

    public function delete($id)
    {
    	SupportChat::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Chat Delete Successfuly...',
		], 200);
    }
    
}
