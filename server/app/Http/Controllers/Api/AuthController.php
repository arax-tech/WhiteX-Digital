<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use App\Setting;
use Illuminate\Http\JsonResponse;
class AuthController extends Controller
{
	
	public function register(Request $request): JsonResponse
	{
	    $check = User::where('email', $request->email)->count();
	    if ($check < 1) {
    		$user = New User();
    	    $user->name = $request->name;
    	    $user->email = $request->email;
    	    $user->password = Hash::make($request->password);
    	    $user->save();

    	    return response()->json([
    	       'status' => 200,
			   'token' => $user->createToken('WhiteX')->plainTextToken,
    	       'message'=> 'Registration Successfully...'
    	    ]);
	    }else{
	    	return response()->json([
	    	   'status' => 401,
	    	   'message'=> 'Email already taken, Please use another email...'
	    	],401);
	    }
	}
	   
    public function login(Request $request): JsonResponse
    {
    	$user = User::where('email',$request->email)->first();

        if(!$user || !Hash::check($request->password,$user->password)){
        	return response()->json([
	    	   'status' => 401,
	    	   'message'=> 'Invalid Email OR Password...',
	    	], 401);
        }else{

        	// $user->otp = rand(38000, 980000);
        	// $user->save();


            $details = ['otp' => $user->otp];
               
            // Mail::to($user->email)->send(new \App\Mail\OtpVerification($details));


        	return response()->json([
	    	   'status' => 200,
	    	   'message'=> 'OTP Send Successfully...',
	    	], 200);
        }


    }
    public function verify_otp(Request $request): JsonResponse
    {
        $user = User::where('otp', $request->otp)->first();

        if ($user != null) {
            Auth::login($user);
            // Auth::user()->otp = null;
            // Auth::user()->save();
            return response()->json([
                'status'  => 202,
                'message' => 'Login Successfully...',
                'user'    => Auth::user(),
                'token'   => Auth::user()->createToken('WhiteX')->plainTextToken,
            ], 200);
        } else {
            return response()->json([
                'status'  => 401,
                'message' => 'Invalid OTP...',
            ], 401);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::user()->tokens()->delete();
        return response()->json([
           'status' => 200,
           'message'=> 'Logout Successfully...',
        ], 200);
    }

    public function setting(Request $request): JsonResponse
    {
        $setting = Setting::find(1);
    	return response()->json([
           'status' => 200,
    	   'setting' => $setting,
    	   'message'=> 'Logout Successfully...',
    	], 200);
    }

    public function profile()
    {
        $setting = Setting::find(1);
		return response()->json([
		   'status' => 204,
           'setting' => $setting,
		   'user' => Auth::user(),
		], 200);
    }


    
}
