@component('mail::message')
# Forgot Password
<br>
For reset password please click below 👇
@component('mail::button', ['url' => $details['verify_url']])
	Reset Password
@endcomponent
<br><br>
Best Regards,<br>
{{ config('app.name') }}
@endcomponent
