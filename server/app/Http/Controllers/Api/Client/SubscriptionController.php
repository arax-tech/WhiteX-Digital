<?php

namespace App\Http\Controllers\Api\Client;

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
    	$subscription = Subscription::where('client_id', auth::user()->id)->first();
		return response()->json([
		   'status' => 200,
		   'subscription' => $subscription,
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

    
}
