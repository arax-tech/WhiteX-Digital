@component('mail::message')
# WhiteX Digital OTP Verification
<br><br>
<b>OTP : </b>{{ $details['otp'] }}
<br><br>
Thanks,<br>
{{ config('app.name') }}
@endcomponent
