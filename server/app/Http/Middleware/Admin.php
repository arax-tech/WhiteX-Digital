<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Auth;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
    	if (Auth::check() && Auth::user()->role()=='Admin')
    	{
    	    return $next($request);
    	}
    	else
    	{
    	    return response()->json([
    	        'status' => 401,
    	        'message'=> 'Please Login to Access...'
    	     ], 401);
    	}
    }
}
