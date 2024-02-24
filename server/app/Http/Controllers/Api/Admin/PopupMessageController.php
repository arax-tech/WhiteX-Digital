<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\PopupMessage;
use App\User;
use Auth;

class PopupMessageController extends Controller
{

    public function index(Request $request)
    {
    	$popupMessages = PopupMessage::get();
		foreach ($popupMessages as $key => $val)
		{
			$client = User::where(['id' => $val->client_id])->first();
	        $popupMessages[$key]->client = $client;
		}
		return response()->json([
		   'status' => 200,
		   'popupMessages' => $popupMessages,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$popupMessage = PopupMessage::find($id);
		return response()->json([
		   'status' => 200,
		   'popupMessage' => $popupMessage,
		], 200);
    }
    public function store(Request $request)
    {
	    $popupMessages = new PopupMessage();
	    $popupMessages->client_id = $request->client_id;
	    $popupMessages->content = $request->content;
	    $popupMessages->trigger_event = $request->trigger_event;
	    $popupMessages->visibility_start = $request->visibility_start;
	    $popupMessages->visibility_end = $request->visibility_end;
	    $popupMessages->status = $request->status;
	    $popupMessages->save();
	    return response()->json([
	       'status' => 200,
	       'message' => 'Popup Message Create Successfuly...',
	    ], 200);
    	
    }

    public function update(Request $request, $id)
    {
		$popupMessages = PopupMessage::find($id);
	    $popupMessages->client_id = $request->client_id;
	    $popupMessages->content = $request->content;
	    $popupMessages->trigger_event = $request->trigger_event;
	    $popupMessages->visibility_start = $request->visibility_start;
	    $popupMessages->visibility_end = $request->visibility_end;
	    $popupMessages->status = $request->status;
	    $popupMessages->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Popup Message Update Successfuly...',
		], 200);
    }

    public function delete($id)
    {
    	PopupMessage::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Popup Message Delete Successfuly...',
		], 200);
    }
    
}
