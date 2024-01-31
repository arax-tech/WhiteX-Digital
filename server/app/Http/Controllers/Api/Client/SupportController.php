<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Support;
use App\User;
use Auth;
use DB;
use Illuminate\Http\JsonResponse;
class SupportController extends Controller
{

    public function index(Request $request)
    {
    	$supports = Support::where('client_id', auth::user()->id)->get();
		return response()->json([
		   'status' => 200,
		   'supports' => $supports,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$support = Support::find($id);
		return response()->json([
		   'status' => 200,
		   'support' => $support,
		], 200);
    }
    public function store(Request $request)
    {
		$support = new Support();
		$support->client_id = auth::user()->id;
		$support->title = $request->title;
		$support->message = $request->message;
		$support->department = $request->department;
		$support->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Support Create Successfuly...',
		], 200);
    }

    public function update(Request $request, $id)
    {
   
		$support = Support::find($id);
		$support->title = $request->title;
		$support->message = $request->message;
		$support->department = $request->department;
		$support->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Support Update Successfuly...',
		], 200);
    }

    public function delete($id)
    {
    	Support::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Support Delete Successfuly...',
		], 200);
    }
    
}
