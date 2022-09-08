<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Iklan;
use Iklans;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IklanControl extends Controller
{
    public function addiklan(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'caption' => 'required|max:191',
            'image' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'error' => $validator->getMessageBag()
            ]);
        } else {
            $iklan = new Iklan;
            $iklan->caption = $request->input('caption');
            if ($request->hasFile('image')) {

                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('iklans/', $filename);
                $iklan->image = 'iklans/' . $filename;
            }
            $iklan->save();
            return response()->json([
                'status' => 200,
                'message' => 'Success Add Iklan'
            ]);
        }
    }
    public function viewiklan()
    {
        $iklan = Iklan::all();
        return response()->json([
            'status' => 200,
            'iklan' => $iklan
        ]);
    }
    public function deleteiklan($id)
    {
        $iklan = Iklan::find($id);
        if ($iklan) {
            $iklan->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Success Delete'
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Iklan not found'
            ]);
        }
    }
}
