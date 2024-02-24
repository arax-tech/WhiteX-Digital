<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use Auth;


class PasswordController extends Controller
{

    public function update_password(Request $request)
    {
        if (!(Hash::check($request->get('current_password'),Auth::user()->password)))
        {
            return response()->json([
               'status' => 400,
               'message' => 'Current Password is Incorrect...',
            ], 400);
        }

        if (strcmp($request->get('current_password'), $request->get('new_password'))==0)
        {
        	return response()->json([
        	   'status' => 400,
        	   'message' => 'Your new password can not be same...',
        	], 400);
        }

        $user = Auth::user();
        $user->password = bcrypt($request->get('new_password'));
        $user->save();
        return response()->json([
           'status' => 200,
           'message' => 'Password Update Successfully...',
        ], 200);

    }
}
