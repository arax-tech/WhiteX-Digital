<?php

namespace App\Jobs;

use App\Settings;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CreateGHLLocation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $data;
    private $user_id;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user_id,$data)
    {
        $this->data = $data;
        $this->user_id = $user_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $setting = Settings::where('type','ghl_api')->first();
        $token = $setting->value;

        // Set the API endpoint
        $endpoint = 'https://rest.gohighlevel.com/v1/locations/';

        // Set the data for the request
        // $data = [
        //     "businessName" => "Tesla inc",
        //     "address" => "3500 Deer Creek Road",
        //     "city" => "Palo Alto",
        //     "country" => "US",
        //     "state" => "CA",
        //     "postalCode" => "94304",
        //     "website" => "https://www.tesla.com",
        //     "timezone" => "US/Central",
        //     "firstName" => "John",
        //     "lastName" => "Deo",
        //     "email" => "john@deo.com",
        //     "phone" => "+1202-555-0107",
        //     "settings" => [
        //         "allowDuplicateContact" => false,
        //         "allowDuplicateOpportunity" => false,
        //         "allowFacebookNameMerge" => false,
        //         "disableContactTimezone" => false
        //     ],
        //     "twilio" => [
        //         "sid" => "AC_XXXXXXXXXXX",
        //         "authToken" => "77_XXXXXXXXXXX"
        //     ],
        //     "snapshot" => [
        //         "id" => "XXXXXXXXXXX",
        //         "type" => "vertical"
        //     ],
        //     "mailgun" => [
        //         "apiKey" => "key-XXXXXXXXXXX",
        //         "domain" => "replies.yourdomain.com"
        //     ],
        //     "social" => [
        //         "facebookUrl" => "https://facebook.com/groups/XXX",
        //         "googlePlus" => "https://groups.google.com/d/XXX",
        //         "linkedIn" => "https://www.linkedin.com/groups/XXX/profile",
        //         "foursquare" => "https://foursquare.com/groups/XXX",
        //         "twitter" => "https://twitter.com/XXX",
        //         "yelp" => "https://yelp.com/XXX",
        //         "instagram" => "https://instagram.com/XXX",
        //         "youtube" => "https://youtube.com/XXX",
        //         "pinterest" => "https://pinterest.com/XXX",
        //         "blogRss" => "https://rss.xyz.com",
        //         "googlePlaceId" => "redfdfdere"
        //     ]
        // ];

        // Make the POST request to the API using Laravel's HTTP facade
        $response = Http::withToken($token)
            ->post($endpoint, $this->data);

        // Get the response body
        $body = $response->json();
        Log::info($body);
        $user= User::find($this->user_id);
        if($user){
            $user->ghl_id = $body->id;
            $user->save();
        }

    }
}
