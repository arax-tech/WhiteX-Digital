<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\CustomMenu;
use App\User;
use Auth;

class MenuController extends Controller
{

    public function index(Request $request)
    {
    	$menus = CustomMenu::get();

    	foreach ($menus as $key => $value)
    	{
    		$user = User::where(['id' => $value->user_id])->first();
    		$menus[$key]->user = $user;
    	}
		return response()->json([
		   'status' => 200,
		   'menus' => $menus,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$menu = CustomMenu::find($id);
		return response()->json([
		   'status' => 200,
		   'menu' => $menu,
		], 200);
    }
    public function store(Request $request)
    {
	    $menu = new CustomMenu();
	    $menu->user_id = $request->user_id;
	    $menu->name = $request->name;
	    $menu->link = $request->link;
	    $menu->tooltip = $request->tooltip;
	    $menu->status = $request->status;
	    $menu->save();
	    return response()->json([
	       'status' => 200,
	       'message' => 'Menu Create Successfuly...',
	    ], 200);
    	
    }

    public function update(Request $request, $id)
    {
		$menu = CustomMenu::find($id);
		$menu->user_id = $request->user_id;
		$menu->name = $request->name;
		$menu->link = $request->link;
		$menu->tooltip = $request->tooltip;
		$menu->status = $request->status;
		$menu->save();
		return response()->json([
		   'status' => 200,
		   'message' => 'Menu Update Successfuly...',
		], 200);
    }

    public function delete($id)
    {
    	CustomMenu::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Menu Delete Successfuly...',
		], 200);
    }
    
}
