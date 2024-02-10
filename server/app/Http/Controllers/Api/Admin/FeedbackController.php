<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Feedback;
use App\User;
use Auth;
class FeedbackController extends Controller
{

    public function index(Request $request)
    {
    	$feedbacks = Feedback::get();
    	foreach ($feedbacks as $key => $value)
    	{
    		$client = User::where(['id' => $value->client_id])->first();
    		$feedbacks[$key]->client = $client;
    	}
		return response()->json([
		   'status' => 200,
		   'feedbacks' => $feedbacks,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$feedback = Feedback::find($id);
		return response()->json([
		   'status' => 200,
		   'feedback' => $feedback,
		], 200);
    }
    public function store(Request $request)
    {
		$feedback = new Feedback();
		$feedback->client_id = auth::user()->id;
		$feedback->title = $request->title;
		$feedback->description = $request->description;
		$feedback->ratings = $request->ratings;
		$feedback->category = $request->category;
		$feedback->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Feedback Create Successfuly...',
		], 200);
    }

    public function update(Request $request, $id)
    {
   
		$feedback = Feedback::find($id);
		$feedback->action_taken = $request->action_taken;
		$feedback->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Feedback Action Taken Successfuly...',
		], 200);
    }

    public function delete($id)
    {
    	Feedback::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Feedback Delete Successfuly...',
		], 200);
    }
    
}
