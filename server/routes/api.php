<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'Api', 'prefix' => 'auth'], function (){
	Route::post('register', 'AuthController@register');
	
	Route::post('login', 'AuthController@login');
	Route::post('verify-otp', 'AuthController@verify_otp');
});


Route::group(['namespace' => 'Api', 'prefix' => 'auth', 'middleware' => 'auth:sanctum'], function (){
	Route::get('logout', 'AuthController@logout');
});


// Admin
Route::group(['namespace' => 'Api\Admin', 'prefix' => 'admin', 'middleware' => ['auth:sanctum', 'Admin']], function (){
	Route::get('/dashboard', 'AdminController@dashboard');
	Route::get('/profile', 'AdminController@profile');
	Route::post('/update/profile', 'AdminController@update_profile');

	Route::get('/password', 'PasswordController@password');
	Route::get('/check-pwd', 'PasswordController@check');
	Route::post('/update/password', 'PasswordController@update_password');
	

});