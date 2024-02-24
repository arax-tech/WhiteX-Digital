<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;

use Illuminate\Http\Request;
use App\Subscription;
use Auth;
use DB;

class SubscriptionController extends Controller
{

    public function index(Request $request)
    {
    	$subscriptions = Subscription::get();
		return response()->json([
		   'status' => 200,
		   'subscriptions' => $subscriptions,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$subscription = Subscription::find($id);
		return response()->json([
		   'status' => 200,
		   'subscription' => $subscription,
		], 200);
    }


    public function delete($id)
    {
    	Subscription::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Subscription Delete Successfuly...',
		], 200);
    }
    
}
