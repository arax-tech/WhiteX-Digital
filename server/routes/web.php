<?php

use App\GhlLeads;
use App\Settings;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request as Psr7Request;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    dd(url()->full());
});

Route::get('/mail', function () {
    $client = new Client([
        'base_uri' => 'https://api.mailgun.net/v3/' . 'sandboxf2f1b30fd7854c94bf48a02e89edf1e3.mailgun.org',
        'auth' => [
            'acea4d7d918cdcfb9697b19ef2c3d0a3-2c441066-655a2611',
            'api',
        ],
    ]);
    
    $response = $client->post('messages', [
        'from' => 'usamajalal17@gmail.com',
        'to' => 'stressjp99@gmail.com',
        'subject' => 'Your Email Subject',
        'html' => 'Your email body content in HTML format',
    ]);
    dd($response);
});


Route::get('cache', function () {
    Artisan::call('cache:clear');
    Artisan::call('view:clear');
    Artisan::call('config:cache');
    die("Cash Cleard");
});

Route::get('ghl', function () {
    $client = new Client();
$headers = [
  'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6IkR2Qm5BUWxTbU9zMlQ0WUFNUlNvIiwiY29tcGFueV9pZCI6Ik5xdG5JYmZZUkpXZmZ3N0tGU0U0IiwidmVyc2lvbiI6MSwiaWF0IjoxNzA2ODcyOTQ2Mjc1LCJzdWIiOiJ1c2VyX2lkIn0.W0LKakIpqfG9tHTm89WxxHrxDy8Bo4vSmWlhAj7glic'
];
$body = '{
    "email": "john@deo.com",
    "phone": "+18887324197",
    "firstName": "John",
    "lastName": "Deo",
    "name": "John Deo",
    "dateOfBirth": "1990-09-25",
    "address1": "3535 1st St N",
    "city": "Dolomite",
    "state": "AL",
    "country": "US",
    "postalCode": "35061",
    "companyName": "DGS VolMAX",
    "website": "35061",
    "tags": [
        "commodo",
        "veniam ut reprehenderit"
    ],
    "source": "public api",
    "customField": {
        "__custom_field_id__": "do in Lorem ut exercitation"
    }
}';
$request = new Psr7Request('POST', 'https://rest.gohighlevel.com/v1/contacts/', $headers, $body);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
        $data = json_decode($res->getBody(), true);
        return response()->json([
            'data' => $data,
        ], 200);
});

