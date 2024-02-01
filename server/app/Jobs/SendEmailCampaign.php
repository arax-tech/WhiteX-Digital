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
use Illuminate\Support\Facades\Mail;

class SendEmailCampaign implements ShouldQueue
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
        $this->sendMail('usamajalal17@gmail.com');
    }
    public function sendMail($recipient)
    {
    //     $body = "HELLO";
    //     $response = Http::post("https://api.mailgun.net/v3/sandbox94d6ba7b67c04637b9142a692d070a45.mailgun.org/messages", [
    //         'auth' => ['api', '58aa94e22726924f964a7a5180aeee44-69a6bd85-a382dcab'],
    //         'form_params' => [
    //             'from' => 'usama@fundingpips.com',
    //             'to' => $recipient,
    //             'subject' => 'Test Mail',
    //             'html' => view('emails.campaign')->with(compact('body'))->render(),
    //         ],
    //     ]);
    //     Log::info(json_encode($response));
    //     Log::info("asd");
    //     Log::info($response);
    //     if ($response->successful()) {
    //         return "Email sent successfully!";
    //     } else {
    //         return "Failed to send email.";
    //     }
                
            Mail::to('recipient@example.com')->send(new EmailCampaign('Test Sub', ));

            return "Email sent successfully!";
        }
}
