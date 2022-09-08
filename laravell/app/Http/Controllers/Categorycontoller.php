<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use Illuminate\Http\Request;

class Categorycontoller extends Controller
{

    public function index()
    {
        $category = Category::all();
        return response()->json([
            'status'=>200,
            'category'=>$category,
        ]);
    }
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            
            'slug' => 'required|max:191',
            'name' => 'required|max:191',

    ]);
    if($validator->fails())
    {
        return response()->json([
            'status' => 400,
            'errors' => $validator->getMessageBag()
        ]);
    }
    else {
        $category = Category::find($id);
        if($category)
        {       
            $category->slug = $request->input('slug');
            $category->name = $request->input('name');
            $category->desc = $request->input('desc');
          
            $category->save();
            return response()->json([
                'status' => 200,
                'message' => 'Succes Updatee'
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found'
            ]);
        }
  }    

    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
          
                'slug' => 'required|max:191',
                'name' => 'required|max:191',

        ]);
        if($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->getMessageBag()
            ]);
        }
        else {
            $category = new Category;
          
              
                $category->slug = $request->input('slug');
                $category->name = $request->input('name');
                $category->desc = $request->input('desc');        
                $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Succes Added'
        ]);
        }
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if($category)
        {
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Success Delete'
            ]);
        }
        else {
            return response()->json([
                'status' => 404,
                'message' => 'No Category Found'
            ]);
        }
    }

   
}
