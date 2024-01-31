<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgotPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $details;
    
    public function __construct($details)
    {
        $this->details = $details;
    }
    

    public function build()
    {
        return $this->markdown('emails.forgot-password')->subject('WhiteX Digital Forgot Password');
    }
}
