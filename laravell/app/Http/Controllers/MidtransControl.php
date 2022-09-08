<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MidtransControl extends Controller
{
    public function index(Request $request)
    {
        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = 'SB-Mid-server-02vqV4gfRPU8R8_iEUQwZ0By';
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;
        $params = array(
            'transaction_details' => array(
                'order_id' => rand(),
                'gross_amount' => 18000,
            ),
            'item_details' => array(
                [
                    'id' => 'a1',
                    'price' => '10000',
                    'quantity' => 1,
                    'name' => 'Apel'
                ], [
                    'id' => 'b1',
                    'price' => '8000',
                    'quantity' => 1,
                    'name' => 'Jeruk'
                ]
            ),
            'customer_details' => array(
                'first_name' => $request->input('namalengkap'),
                'email' =>  $request->input('email'),
                'phone' =>  $request->input('nohp'),
            ),
        );
        $snapToken = \Midtrans\Snap::getSnapToken($params);

        return response()->json([
            'snaptoken' => $snapToken
        ]);
    }
}
