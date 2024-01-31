<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'Api', 'prefix' => 'auth'], function (){
	Route::post('register', 'AuthController@register');
	
	Route::post('login', 'AuthController@login');
	Route::post('verify-otp', 'AuthController@verify_otp');
	Route::post('/password/forgot', 'PasswordResetController@forgot');
	Route::post('/password/reset/{reset_token}', 'PasswordResetController@reset');
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
	Route::post('/update/password', 'PasswordController@update_password');
	

	// Admins
	Route::get('/admins', 'AdminsController@index');
	Route::post('/admins/store', 'AdminsController@store');
	Route::get('/admins/single/{id}', 'AdminsController@single');
	Route::post('/admins/update/{id}', 'AdminsController@update');
	Route::get('/admins/delete/{id}', 'AdminsController@delete');

	// Clients
	Route::get('/client', 'ClientController@index');
	Route::post('/client/store', 'ClientController@store');
	Route::get('/client/single/{id}', 'ClientController@single');
	Route::post('/client/update/{id}', 'ClientController@update');
	Route::get('/client/delete/{id}', 'ClientController@delete');

	// Subscription
	Route::get('/subscription', 'SubscriptionController@index');
	Route::post('/subscription/store', 'SubscriptionController@store');
	Route::get('/subscription/single/{id}', 'SubscriptionController@single');
	Route::post('/subscription/update/{id}', 'SubscriptionController@update');
	Route::get('/subscription/delete/{id}', 'SubscriptionController@delete');



	// Custom Menus
	Route::get('/menu', 'MenuController@index');
	Route::post('/menu/store', 'MenuController@store');
	Route::get('/menu/single/{id}', 'MenuController@single');
	Route::post('/menu/update/{id}', 'MenuController@update');
	Route::get('/menu/delete/{id}', 'MenuController@delete');
});


// Client
Route::group(['namespace' => 'Api\Client', 'prefix' => 'client', 'middleware' => ['auth:sanctum', 'Client']], function (){
	Route::get('/dashboard', 'ClientController@dashboard');
	Route::get('/profile', 'ClientController@profile');
	Route::post('/update/profile', 'ClientController@update_profile');

	Route::get('/password', 'PasswordController@password');
	Route::post('/update/password', 'PasswordController@update_password');


	// Teams
	Route::get('/team', 'TeamController@index');
	Route::post('/team/store', 'TeamController@store');
	Route::get('/team/single/{id}', 'TeamController@single');
	Route::post('/team/update/{id}', 'TeamController@update');
	Route::get('/team/delete/{id}', 'TeamController@delete');
	
	// Subscription
	Route::get('/subscription', 'SubscriptionController@index');
	Route::post('/subscription/store', 'SubscriptionController@store');
	Route::get('/subscription/single/{id}', 'SubscriptionController@single');

	// Cancellation Request
	Route::get('/cancellation/request', 'CancellationRequestController@index');
	Route::post('/cancellation/request/store', 'CancellationRequestController@store');
	Route::get('/cancellation/request/single/{id}', 'CancellationRequestController@single');
	Route::post('/cancellation/request/update/{id}', 'CancellationRequestController@update');
	Route::get('/cancellation/request/delete/{id}', 'CancellationRequestController@delete');


	// Supports
	Route::get('/support', 'SupportController@index');
	Route::post('/support/store', 'SupportController@store');
	Route::get('/support/single/{id}', 'SupportController@single');
	Route::post('/support/update/{id}', 'SupportController@update');
	Route::get('/support/delete/{id}', 'SupportController@delete');

	// Feedbacks
	Route::get('/feedback', 'FeedbackController@index');
	Route::post('/feedback/store', 'FeedbackController@store');
	Route::get('/feedback/single/{id}', 'FeedbackController@single');
	Route::post('/feedback/update/{id}', 'FeedbackController@update');
	Route::get('/feedback/delete/{id}', 'FeedbackController@delete');
});