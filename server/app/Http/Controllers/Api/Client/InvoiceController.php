<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\InvoiceItem;
use App\Invoice;
use App\User;
use Auth;
use DB;

class InvoiceController extends Controller
{

    public function index(Request $request)
    {
    	$invoices = Invoice::where('client_id', auth::user()->id)->get();
    	foreach ($invoices as $key => $val)
    	{
            $items = InvoiceItem::where(['invoice_id' => $val->id])->get();
    		$client = User::where(['id' => $val->client_id])->first();
            $invoices[$key]->client = $client;
    		$invoices[$key]->items = $items;
    	}
		return response()->json([
		   'status' => 200,
		   'invoices' => $invoices,
		], 200);
    }
    public function single(Request $request, $id)
    {
    	$invoice = Invoice::find($id);
        $items = InvoiceItem::where('invoice_id', $invoice->id)->get();
        $client = User::find($invoice->client_id);

        $inv = [
            'data' => $invoice,
            'items' => $items,
            'client' => $client
        ];

        return response()->json([
            'status' => 200,
            'invoice' => $inv,
        ], 200);

    }
    
}
