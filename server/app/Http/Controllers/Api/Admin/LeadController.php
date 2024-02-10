<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Lead;
use Auth;
use DB;

class LeadController extends Controller
{

    public function index(Request $request)
    {
    	$SubscriptionRegistrations = Lead::where('form_id', '2908')->get();
    	$DigitalMarketingBundlePlans = Lead::where('form_id', '2897')->get();
    	$FreeMarketingAnalysis = Lead::where('form_id', '2895')->get();
    	$BookFreeStrategyCalls  = Lead::where('form_id', '2893')->get();
    	$response = [
	        'SubscriptionRegistrations' => $SubscriptionRegistrations,
	        'DigitalMarketingBundlePlans' => $DigitalMarketingBundlePlans,
	        'FreeMarketingAnalysis' => $FreeMarketingAnalysis,
	        'BookFreeStrategyCalls' => $BookFreeStrategyCalls,
	    ];
		return response()->json([
		   'status' => 200,
		   'response' => $response,
		], 200);
    }
   
    
}
