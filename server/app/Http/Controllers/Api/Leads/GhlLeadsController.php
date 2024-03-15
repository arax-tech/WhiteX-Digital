<?php

namespace App\Http\Controllers\Api\Leads;

use GuzzleHttp\Psr7\Request as Psr7Request;
use App\GhlLeads;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Settings;
use Illuminate\Http\Client\Request as ClientRequest;

class GhlLeadsController extends Controller
{
    public function index(){
        $api = Settings::where('type','ghl_location_api')->first();
        $key="";
        if($api){
            $key=$api->value;
        }
        $client = new Client();
        $headers = [
        'Authorization' => 'Bearer '.$key
        ];
        $request = new Psr7Request('GET', 'https://rest.gohighlevel.com/v1/contacts/', $headers);
        $res = $client->sendAsync($request)->wait();
        $data = json_decode($res->getBody(), true);
        foreach($data['contacts'] as $con){
            $lead = GhlLeads::where('c_id',$con['id'])->first();
            if(! $lead){
                $con['tags']=json_encode($con['tags']);
                $con['customField']=json_encode($con['customField']);
                $con['c_id']=$con['id'];
                GhlLeads::create($con);
            }
        }
        $leads = GhlLeads::all()->toJson();
        return response()->json([
            'data' => $data,
        ], 200);
        
    }
    public function show($id){
        $api = Settings::where('type','ghl_location_api')->first();
        $key="";
        if($api){
            $key=$api->value;
        }
        $client = new Client();
        $headers = [
        'Authorization' => 'Bearer '.$key
        ];
        $request = new Psr7Request('GET', 'https://rest.gohighlevel.com/v1/contacts/'.$id, $headers);
        $res = $client->sendAsync($request)->wait();
        $data = json_decode($res->getBody(), true);
        GhlLeads::where('c_id',$id)->delete();
        return response()->json([
            'data' => $data,
        ], 200);
        
    }
    public function destroy($id){
        $api = Settings::where('type','ghl_location_api')->first();
        $key="";
        if($api){
            $key=$api->value;
        }
        $client = new Client();
        $headers = [
        'Authorization' => 'Bearer '.$key
        ];
        $request = new Psr7Request('DELETE', 'https://rest.gohighlevel.com/v1/contacts/'.$id, $headers);
        $res = $client->sendAsync($request)->wait();
        $data = json_decode($res->getBody(), true);
        return response()->json([
            'data' => $data,
        ], 200);
        
    }
    public function saveApi(Request $request){
        $api = Settings::where('type','ghl_location_api')->first();
        if(! $api){
            $api = new Settings();
            $api->type = 'ghl_location_api';
        }
        $api->value = $request->value;
        $api->save();
        return response()->json([
            'message' => 'Api saved',
        ], 200);
    }    
    public function store(Request $request){        
        $client = new Client();
        $api = Settings::where('type','ghl_location_api')->first();
        $key="";
        if($api){
            $key=$api->value;
        }
        $headers = [
        'Authorization' => 'Bearer '.$key
        ];
        $body = '{
            "email": '.$request->email.',
            "phone": '.$request->phone.',
            "firstName": '.$request->firstName.',
            "lastName": '.$request->lastName.',
            "name": '.$request->name.',
            "dateOfBirth": '.$request->dateOfBirth.',
            "address1": '.$request->address1.',
            "city": '.$request->city.',
            "state": '.$request->state.',
            "country": '.$request->country.',
            "postalCode": '.$request->postalCode.',
            "companyName": '.$request->companyName.',
            "website": '.$request->website.',
            "tags": '. $request->tags.',
            "source":'.$request->source.',
            "customField":'.$request->customField.',
        }';
        $request_n = new Psr7Request('POST', 'https://rest.gohighlevel.com/v1/contacts/', $headers, $body);
        $res = $client->sendAsync($request_n)->wait();
        GhlLeads::create($request->all());
        return response()->json([
            'message' => 'Lead saved',
        ], 200);
    }
    public function update($id, Request $request){        
        $client = new Client();
        $api = Settings::where('type','ghl_location_api')->first();
        $key="";
        if($api){
            $key=$api->value;
        }
        $headers = [
        'Authorization' => 'Bearer '.$key
        ];
        $body = '{
            "email": '.$request->email.',
            "phone": '.$request->phone.',
            "firstName": '.$request->firstName.',
            "lastName": '.$request->lastName.',
            "name": '.$request->name.',
            "dateOfBirth": '.$request->dateOfBirth.',
            "address1": '.$request->address1.',
            "city": '.$request->city.',
            "state": '.$request->state.',
            "country": '.$request->country.',
            "postalCode": '.$request->postalCode.',
            "companyName": '.$request->companyName.',
            "website": '.$request->website.',
            "tags": '. $request->tags.',
            "source":'.$request->source.',
            "customField":'.$request->customField.',
        }';
        $request_n = new Psr7Request('PUT', 'https://rest.gohighlevel.com/v1/contacts/'.$id, $headers, $body);
        $res = $client->sendAsync($request_n)->wait();
        GhlLeads::where('c_id',$id)->delete();
        GhlLeads::create($request->all());
        return response()->json([
            'message' => 'Lead updated',
        ], 200);
    }
    public function getApi(){
        $api = Settings::where('type','ghl_location_api')->first();
        if($api){
            return response()->json([
                'data' => $api->value,
             ], 200);
        }
        return response()->json([
            'message' => 'Api not found',
         ], 401);
    }
}
