<?php

namespace App\Http\Controllers\Api\Admin;

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
    	$cancellations = SubscriptionCancellation::join('users', 'subscription_cancellations.client_id', '=', 'users.id')->select(
    			'subscription_cancellations.*',
		        'users.id as user_id',
		        'users.name as user_name',
		        'users.email as user_email',
		        'users.image as user_image',
		    )->get();

		return response()->json([
		   'status' => 200,
		   'cancellations' => $cancellations,
		], 200);
    }
    public function store(Request $request)
    {
	    $cancellation = new SubscriptionCancellation();
	    $cancellation->client_id = $request->client_id;
	    $cancellation->title = $request->title;
	    $cancellation->description = $request->description;
	    $cancellation->status = $request->status;
	    $cancellation->save();
	    return response()->json([
	       'status' => 200,
	       'message' => 'Cancellation Request Create Successfuly...',
	    ], 200);
    	
    }

    public function update(Request $request, $id)
    {
	    $cancellation = SubscriptionCancellation::find($id);
	    $cancellation->status = $request->status;
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
