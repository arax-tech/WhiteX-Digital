<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Http\JsonResponse;
class PasswordResetController extends Controller
{
	
	
	   
    public function forgot(Request $request): JsonResponse
    {
        $user = User::where('email',$request->email)->first();

        if(!$user){
            return response()->json([
               'status' => 422,
               'message'=> 'User not found with this email...',
            ], 422);
        }else{

            $reset_token = sha1(time());
            $user->reset_token = $reset_token;
            $user->save();


            $verify_url = "http://localhost:3000/reset/password/".$reset_token;
            $details = ['verify_url' =>  $verify_url];
               
            Mail::to($user->email)->send(new \App\Mail\ForgotPassword($details));


            return response()->json([
               'status' => 200,
               'message'=> 'Password reset link send to your email...',
            ], 200);
        }


    }
    public function reset(Request $request): JsonResponse
    {
    	$user = User::where('reset_token',$request->reset_token)->first();

        if(!$user){
        	return response()->json([
	    	   'status' => 422,
	    	   'message'=> 'Invalid Reset Token...',
	    	], 422);
        }else{

            $user->reset_token = null;
            $user->password = Hash::make($request->password);
        	$user->save();

        	return response()->json([
	    	   'status' => 200,
	    	   'message'=> 'Password Update Successfully...',
	    	], 200);
        }


    }
}
