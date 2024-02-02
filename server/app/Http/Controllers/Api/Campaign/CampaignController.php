<?php

namespace App\Http\Controllers\Api\Campaign;

use App\Campaign;
use App\CampaignRecever;
use App\Http\Controllers\Controller;
use App\Imports\CampaignReceverImport;
use App\Jobs\SendEmailCampaign;
use App\Mail\EmailCampaign;
use Illuminate\Http\Request;
use App\User;
use Auth;
use COM;
use DB;
use Maatwebsite\Excel\Facades\Excel;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        SendEmailCampaign::dispatch();
        $campaigns = Campaign::where('user_id',auth()->user()->id)->get();
        return response()->json([
            'status' => 200,
            'campaign' => $campaigns,
            'rate' =>1,
         ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->merge([
            'user_id' => auth()->user()->id
        ]);
        $cmp = Campaign::create($request->all());
        Excel::import(new CampaignReceverImport($cmp->id), request()->file('file'));
        return response()->json([
            'status' => 200,
            'message' => "Campaign Created Successfully",
         ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cmp = Campaign::find($id);
        if($cmp){
            $total = CampaignRecever::where('campaign_id',$cmp->id)->count();
            $sent = CampaignRecever::where('campaign_id',$cmp->id)->where('status','!=','waiting')->count();
            $fail = CampaignRecever::where('campaign_id',$cmp->id)->where('status','!=','fail')->count();
            $all = CampaignRecever::where('campaign_id', $cmp->id)->get()->toJson();
            $data = [
                'total' => $total,
                'sent' => $sent,
                'fail' => $fail,
                'all' => $all
            ];
            return response()->json([
                'status' => 200,
                'data' => $data,
             ], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Campaign::find($id)->delete();
        return response()->json([
            'status' => 200,
            'message' => "Campaign deleted successfully",
        ], 200);
    }
}
