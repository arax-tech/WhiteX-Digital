<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;

use Illuminate\Http\Request;
use App\Subscription;
use App\SubscriptionCancellation;
use Auth;
use DB;

class SubscriptionCancellationController extends Controller
{

    public function index(Request $request)
    {
    	$cancellations = SubscriptionCancellation::where('client_id', auth::user()->id)->get();

		return response()->json([
		   'status' => 200,
		   'cancellations' => $cancellations,
		], 200);
    }
    public function single($id)
    {
    	$cancellation =  SubscriptionCancellation::find($id);
		return response()->json([
		   'status' => 200,
		   'cancellation' => $cancellation,
		], 200);
    }
    public function store(Request $request)
    {
	    $cancellation = new SubscriptionCancellation();
	    $cancellation->client_id = auth::user()->id;
	    $cancellation->title = $request->title;
	    $cancellation->description = $request->description;
	    $cancellation->status = "Pending";
	    $cancellation->save();
	    return response()->json([
	       'status' => 200,
	       'message' => 'Cancellation Request Create Successfuly...',
	    ], 200);
    	
    }

    public function update(Request $request, $id)
    {
	    $cancellation = SubscriptionCancellation::find($id);
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
