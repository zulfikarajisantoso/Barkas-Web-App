<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class Cobacon extends Controller
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
        $category = Category::all();
        return response()-> json([
            'status'=> 200,
            'categoryy'=> $category
        ]);
        
    }

}
