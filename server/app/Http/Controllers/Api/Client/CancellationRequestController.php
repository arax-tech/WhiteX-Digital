<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\SubscriptionCancellation;
use App\User;
use Auth;
class CancellationRequestController extends Controller
{

    public function index(Request $request)
    {
    	$cancellationRequests = SubscriptionCancellation::where('client_id', auth::user()->id)->get();
		return response()->json([
		   'status' => 200,
		   'cancellationRequests' => $cancellationRequests,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$cancellationRequest = SubscriptionCancellation::find($id);
		return response()->json([
		   'status' => 200,
		   'cancellationRequest' => $cancellationRequest,
		], 200);
    }
    public function store(Request $request)
    {
	    $check = SubscriptionCancellation::where('client_id', auth::user()->id)->count();
	    if ($check < 1) {
			$cancellation = new CancellationRequest();
			$cancellation->client_id = auth::user()->id;
			$cancellation->title = $request->title;
			$cancellation->description = $request->description;
			$cancellation->save();
			return response()->json([
			   'status' => 200,
			   'message' => 'Cancellation Request Create Successfuly...',
			], 200);
	    }else{
	    	return response()->json([
	    	   'status' => 422,
	    	   'message'=> 'You have already cancellation request...'
	    	],422);
	    }
    	
    }

    public function update(Request $request, $id)
    {
   
		$cancellation = SubscriptionCancellation::find($id);
		$$cancellation->client_id = auth::user()->id;
		$cancellation->title = $request->title;
		$cancellation->description = $request->description;
		$cancellation->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Cancellation Request Update Successfuly...',
		], 200);
    }

    public function delete($id)
    {
    	SubscriptionCancellation::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Cancellation Request Delete Successfuly...',
		], 200);
    }
    
}
