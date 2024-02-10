<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Feedback;
use App\User;
use Auth;
class FeedbackController extends Controller
{

    public function index(Request $request)
    {
    	$feedbacks = Feedback::where('client_id', auth::user()->id)->get();
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
		$feedback->title = $request->title;
		$feedback->description = $request->description;
		$feedback->ratings = $request->ratings;
		$feedback->category = $request->category;
		$feedback->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Feedback Update Successfuly...',
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
