<?php

namespace App\Http\Controllers\Api\Admin;

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
    	$invoices = Invoice::get();
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
   	

   	public function store(Request $request)
    {
        //dd($request->all());
        $invoice = New Invoice();

        $invoice->client_id = $request->client_id;
        $invoice->issue_date = $request->issue_date;
        $invoice->salesperson_name = $request->salesperson_name;
        $invoice->payment_instructions = $request->payment_instructions;
        $invoice->payment_links = $request->payment_links;
        $invoice->subtotal = $request->subtotal;
        $invoice->discount = $request->discount;
        $invoice->tax = $request->tax;
        $invoice->total = $request->total;
        $invoice->status = $request->status;
        $invoice->note = $request->note;
        if ($request->hasFile('signature')){
            $file1 = 'invoice-'.time().'.'.$request->signature->extension();
            $request->signature->storeAs('/invoice/signature/', $file1, 'my_files');
            $invoice->signature = URL::to('').'/assets/invoice/signature/'.$file1;
        }
        $invoice->save();
        
        $invoice_id = DB::getPdo()->lastInsertId();


	    foreach ($request['name'] as $key => $value) {
            $item = new InvoiceItem();
            $item->invoice_id = $invoice_id;
            $item->name = $value;
            $item->description = $request['description'][$key];
            $item->cost = $request['cost'][$key];
            $item->qty = $request['qty'][$key];
            $item->price = $request['price'][$key];
            $item->save();
	    }

	    return response()->json([
	        'status' => 200,
	        'message' => 'Invoice Create Successfully...',
	    ], 200);
            
        
    	
    }

  

    public function delete($id)
    {
    	error_reporting(0);
		$items = InvoiceItem::where('invoice_id', $id)->delete();
    	Invoice::find($id)->delete();
		return response()->json([
		   'status' => 200,
		   'message' => 'Invoice Delete Successfuly...',
		], 200);
    }
    
}
