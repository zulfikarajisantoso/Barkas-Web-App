<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;


class Frontcontroller extends Controller
{
    public function product()
    {
        $product = Product::all();
        return response()-> json([
            'status'=> 200,
            'product'=> $product
        ]);
       
    }
    public function category()
    {
        $category = Product::all();
        return response()-> json([
            'status'=> 200,
            'category'=> $category
        ]);
        
    }


    public function detailproduct($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)->wherE('status', '0')->first();
        if($category)
        {
            $product = Product::where('category_id', $category->id)
                                ->where('slug', $product_slug)
                                ->where('status', '0')->first();
            if($product)
            {   
                return response()->json([
                    'status' => 200,
                    'product'=> $product,

                ]);
            }
            else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No Product Available'
                ]);
            }

        }else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'No such Category Found'
            ]);
        }
    }
    public function popular()
    { 
        $popular = Product::all();
        return response()-> json([
            'status'=> 200,
            'popular'=> $popular
        ]);
    }
}
