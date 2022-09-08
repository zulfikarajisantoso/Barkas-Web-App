<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class Productcontrol extends Controller
{
    public function index()
    {
        $prod = Product::all();
        return response()->json([
            'status' => 200,
            'produ' => $prod,
        ]);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'brand' => 'required|max:180',
            'selling_price' => 'required',
            'qty' => 'required|max:10',
            'image' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->getMessageBag(),
            ]);
        } else {
            $product = new Product;
            $product->category_id = $request->input('category_id');
            $product->name = $request->input('name');
            $product->description = $request->input('description');

            if ($request->hasFile('image')) {

                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/', $filename);
                $product->image = 'uploads/' . $filename;
            }


            $product->qty = $request->input('qty');
            $product->brand = $request->input('brand');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');
            $product->newarrival = $request->input('newarrival')  == true ? '1' : '0';
            $product->popular = $request->input('popular')  == true ? '1' : '0';
            $product->diskon = $request->input('diskon');
            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product Add Success',
            ]);
        }
    }



    public function detail($id)
    {
        $product = Product::find($id);
        if ($product) {

            return response()->json([
                'status' => 200,
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Product Found'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'brand' => 'required|max:180',
            'selling_price' => 'required',
            'qty' => 'required|max:10',
            'image' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->getMessageBag(),
            ]);
        } else {
            $product = Product::find($id);
            if ($product) {
                $product->category_id = $request->input('category_id');
                $product->name = $request->input('name');
                $product->description = $request->input('description');


                if ($request->hasFile('image')) {
                    $path = $product->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('uploads/', $filename);
                    $product->image = 'uploads/' . $filename;
                }

                $product->qty = $request->input('qty');
                $product->brand = $request->input('brand');
                $product->selling_price = $request->input('selling_price');
                $product->original_price = $request->input('original_price');
                $product->newarrival = $request->input('newarrival') == true ? '1' : '0';
                $product->popular = $request->input('popular')  == true ? '1' : '0';
                $product->diskon = $request->input('diskon');
                $product->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'Product Update Success',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not Found',
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Success Delete'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Category Found'
            ]);
        }
    }
}
