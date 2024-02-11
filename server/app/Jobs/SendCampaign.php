<?php

namespace App\Jobs;

use App\Campaign;
use App\CampaignRecever;
use App\Credit;
use App\Mail\EmailCampaign;
use App\Settings;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Mail;

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
        $send_limit = 40;
        $remaining_limit = $send_limit;
        $finish = 0;

        do {
            // Get the next campaign
            $cmp = Campaign::where('status', 1)
                ->where('flag', 0)
                ->orderBy('created_at', 'asc')
                ->first();
            if ($cmp) {
                if ($cmp->type == 'sms' || $cmp->type == 'SMS') {
                    $setting = Settings::where('type', 'sms_api')->first();
                    if (!$setting) {
                        die();
                    }
                    $credit = Credit::where('user_id', $cmp->user_id)->where('type', 'sms')->first();
                    // Get messages for the current campaign
                    $msgs = CampaignRecever::where('status', 'waiting')
                        ->where('campaign_id', $cmp->id)
                        ->orderBy('created_at', 'asc')
                        ->take($remaining_limit)
                        ->get();
                    foreach ($msgs as $msg) {
                        if ($credit->credits != 0) {
                            // Send SMS
                            $response = $this->sendSms($setting->value, $cmp->body, $msg->recever);
                            // Check if there's an error
                            if (isset($response['error']) && $response['error'] != 0) {
                                // Access the message
                                $msg->status = 'error';
                                $msg->error_code = $response['msg'];
                            } elseif (isset($response['error']) && $response['error'] == 0) {
                                $msg->status = 'sent';
                            }
                            $remaining_limit--;
                            $msg->save();
                            $credit->credits--;
                            $credit->save();
                        } else {
                            $cmp->flag = 1;
                            $cmp->save();
                            break;
                        }
                    }
                    $msg_count = CampaignRecever::where('status', 'waiting')
                        ->where('campaign_id', $cmp->id)->count();
                    if ($msg_count == 0) {
                        $cmp->status = 0;
                        $cmp->save();
                    }
                } elseif ($cmp->type == 'email') {
                    $setting = Settings::where('type', 'email_api')->first();
                    if (!$setting) {
                        die();
                    }
                    $credit = Credit::where('user_id', $cmp->user_id)->where('type', 'email')->first();
                    // Get messages for the current campaign
                    $msgs = CampaignRecever::where('status', 'waiting')
                        ->where('campaign_id', $cmp->id)
                        ->orderBy('created_at', 'asc')
                        ->take($remaining_limit)
                        ->get();
                    foreach ($msgs as $msg) {
                        if ($credit->credits != 0) {
                            // Send SMS
                            $response = $this->sendEmail($setting->value, $cmp->subject, $cmp->body, $msg->recever);
                            // Check if there's an error
                            $msg->status = 'sent';
                            $remaining_limit--;
                            $msg->save();
                            $credit->credits--;
                            $credit->save();
                        } else {
                            $cmp->flag = 1;
                            $cmp->save();
                            break;
                        }
                    }
                    $msg_count = CampaignRecever::where('status', 'waiting')
                        ->where('campaign_id', $cmp->id)->count();
                    if ($msg_count == 0) {
                        $cmp->status = 0;
                        $cmp->save();
                    }
                }
            } else {
                $finish = 1;
            }
        } while ($finish == 0 && $remaining_limit > 0);
    }
    public function sendSms($api, $body, $recever)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.sms.net.bd/sendsms',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array('api_key' => $api, 'msg' => $body, 'to' => $recever),
        ));
        $response = json_decode(curl_exec($curl), true);
        curl_close($curl);
        return $response;
    }
    public function sendEmail($api, $subject, $body, $recipient)
    {
        Mail::to($recipient)->send(new EmailCampaign($subject,$body ));

        // return "Email sent successfully!";
        // $apiKey = $api;
        // $domain = 'sandbox94d6ba7b67c04637b9142a692d070a45.mailgun.org';
        // $from = 'fundingpip <usama@fundingpips.com>';
        // // $to = ['usama@fundingpips.com', 'usamajalal17@gmail.com'];
        // $to = $recipient;
        // $subject = $subject;
        // $text = $body;

        // // Create a Guzzle HTTP client
        // $client = new Client();

        // // Make a POST request to the Mailgun API
        // $response = $client->request('POST', "https://api.mailgun.net/v3/{$domain}/messages", [
        //     'auth' => ['api', 'Basic ' . base64_encode("api:{$apiKey}")],
        //     'form_params' => [
        //         'from' => $from,
        //         'to' => $to,
        //         'subject' => $subject,
        //         'text' => $text,
        //     ],
        // ]);

        // // Get the response body
        // $body = $response->getBody()->getContents();
        // Log::info($body);
        return true;
    }
}