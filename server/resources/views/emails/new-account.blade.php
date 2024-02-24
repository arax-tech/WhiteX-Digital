@component('mail::message')
# New Account Creating
<br>
For set new password please click below 👇
@component('mail::button', ['url' => $details['verify_url']])
	Set Password
@endcomponent
<br><br>
Best Regards,<br>
{{ config('app.name') }}
@endcomponent
