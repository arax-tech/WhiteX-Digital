<?php

namespace App\Jobs;

use App\Campaign;
use App\CampaignRecever;
use App\Settings;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendCampaign implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::info("IN JOB");
        $setting = Settings::where('type', 'sms_api')->first();
        if (!$setting) {
            Log::error("ERROR IN SMS API");
            die();
        }
        $send_limit = 50;
        $remaining_limit = $send_limit;
        $finish = 0;

        do {
            Log::info("IN do");
            // Get the next campaign
            $cmp = Campaign::where('status', 1)
                ->orderBy('created_at', 'asc')
                ->first();

            if ($cmp) {
                Log::info("IN cmp");
                // Get messages for the current campaign
                $msgs = CampaignRecever::where('status', 'waiting')
                    ->where('campaign_id', $cmp->id)
                    ->orderBy('created_at', 'asc')
                    ->take($remaining_limit)
                    ->get();
                foreach ($msgs as $msg) {
                    Log::info("IN msg");
                    Log::info(json_encode($msg));
                    $curl = curl_init();
                    curl_setopt_array($curl, array(
                        CURLOPT_URL => 'https://api.sms.net.bd/sendsms',
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_CUSTOMREQUEST => 'POST',
                        CURLOPT_POSTFIELDS => array('api_key' => $setting->value, 'msg' => $cmp->body, 'to' => $msg->recever),
                    ));
                    $response = curl_exec($curl);
                    Log::info($response);
                    $response = json_decode($response, true); // Decode JSON into associative array
                    // Check if there's an error
                    if (isset($response['error']) && $response['error'] != 0) {
                        Log::info("IN ERROR");
                        // Access the message
                        $msg->status = 'error';
                        $msg->error_code = $response['msg'];                        
                    } elseif (isset($response['error']) && $response['error'] == 0) {
                        $msg->status = 'sent';
                    }
                    $remaining_limit --;
                    $msg->save();
                    curl_close($curl);
                }
                $msg_count = CampaignRecever::where('status', 'waiting')
                    ->where('campaign_id', $cmp->id)->count();
                if($msg_count == 0){
                    $cmp->status = 0;
                    $cmp->save();
                }
            }else{
                $finish = 1;
            }
        } while ($finish == 0 && $remaining_limit > 0);
    }
}
