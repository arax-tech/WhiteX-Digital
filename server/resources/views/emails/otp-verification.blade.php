@component('mail::message')
# WhiteX Digital OTP Verification
<br><br>
<b>OTP : </b>{{ $details['otp'] }}
<br><br>
Best Regards,<br>
{{ config('app.name') }}
@endcomponent
