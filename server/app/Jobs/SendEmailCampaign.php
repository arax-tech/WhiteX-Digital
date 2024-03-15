<?php

namespace App\Jobs;

use App\Mail\EmailCampaign;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Mail;

class SendEmailCampaign implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $client;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->client = new Client([
        //     'base_uri' => 'https://api.mailgun.net/v3/' . config('services.mailgun.domain'),
        //     'auth' => [config('services.mailgun.api_key'), 'api'],
        // ]);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::info("IN JOB");
        $this->sendMail('usama@fundingpips.com');
    }
    public function sendMail($recipient)
    {       

        Mail::to($recipient)->send(new EmailCampaign('Test Sub','Hello' ));

        // return "Email sent successfully!";
        // $apiKey = '6a8e4b0263a8a00b1b0c8d13ad2b4514-69a6bd85-adb3edb2';
        // $domain = 'sandboxf2f1b30fd7854c94bf48a02e89edf1e3.mailgun.org';
        // $from = 'Whitex Digital <usamaja@fundingpips.com>';
        // $to = ['usama@fundingpips.com'];
        // $subject = 'Hello';
        // $text = 'Testing some Mailgun awesomeness!';

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



        // Make a POST request to the Mailgun API using Laravel's HTTP facade
        // $authorizationHeader = 'Basic ' . base64_encode("api:{$apiKey}");

        // // Make a POST request to the Mailgun API using Laravel's HTTP facade
        // $response = Http::withHeaders([
        //         'Authorization' => $authorizationHeader,
        //     ])
        //     ->post("https://api.mailgun.net/v3/{$domain}/messages", [
        //         'from' => $from,
        //         'to' => $to,
        //         'subject' => $subject,
        //         'text' => $text,
        //     ]);
        
        // // Get the response body
        // $body = $response->body();

        // Get the response body
        // $body = $response->body();
        // Log::info($body);
    }
}
