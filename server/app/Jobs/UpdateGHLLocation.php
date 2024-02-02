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

class UpdateGHLLocation implements ShouldQueue
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

        $user = User::find($this->user_id);
        if($user){
            // Set the API endpoint with the location ID
            $locationId = $user->ghl_id;
            $endpoint = "https://rest.gohighlevel.com/v1/locations/{$locationId}";

            // Make the PUT request to the API using Laravel's HTTP facade
            $response = Http::withToken($token)
                ->put($endpoint, $this->data);
            // Get the response body
            $body = $response->json();
            Log::info($body);
        }
    }
}
