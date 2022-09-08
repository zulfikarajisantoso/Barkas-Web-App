<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeorder(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'namalengkap' => 'required|max:191',
                'email' => 'required|max:191',
                'nohp' => 'required|max:191',
                'alamat' => 'required|max:191',
                'kodepos' => 'required|max:191',

            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'error' => $validator->getMessageBag()
                ]);
            } else {
                $user_id = auth('sanctum')->user()->id;
                $order = new Order;
                $order->user_id = $user_id;
                $order->namalengkap = $request->namalengkap;
                $order->nohp = $request->nohp;
                $order->email = $request->email;
                $order->alamat = $request->alamat;
                $order->kodepos = $request->kodepos;
                $order->totalbayar = $request->totalbayar;

                $order->save();

                $cart = Cart::where('user_id',  $user_id)->get();
                $orderitems = [];
                foreach ($cart as $item) {

                    $orderitems[] = [
                        'product_id' => $item->product_id,
                        'qty' => $item->product_qty,
                        'price' => $item->product->selling_price,
                    ];
                    $item->product->update([
                        'qty' => $item->product->qty - $item->product_qty,
                    ]);
                }
                $order->orderitems()->createMany($orderitems);

                Cart::destroy($cart);

                return response()->json([
                    'status' => 200,
                    'message' => $request->firstname
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue'
            ]);
        }
    }

    public function validateerror(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|max:191',
                'phone' => 'required|max:191',
                'email' => 'required|max:191',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191',

            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'error' => $validator->getMessageBag()
                ]);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'Form validate success'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue'
            ]);
        }
    }
}
