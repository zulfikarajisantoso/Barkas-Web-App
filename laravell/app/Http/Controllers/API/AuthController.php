<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8|confirmed'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->getMessageBag(),

            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_as' => $request->role_as,

            ]);
            $token = $user->createToken($user->email . '_Token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'Registered Successfull',


            ]);
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|max:191",
            "password" => "required"
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->getMessageBag(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Password or Email False '
                ]);
            } else {
                if ($user->role_as == 1) // 1 = ADMIN
                {
                    $role = 'admin';
                    $token = $user->createToken($user->email . '_AdminToken', ['server:admin'])->plainTextToken;
                } else {
                    $role = '';
                    $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
                }
                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'token' => $token,
                    'message' => 'Login Successfull',
                    'role' => $role,

                ]);
            }
        }
    }
    public function userlogin()
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $datauser = User::find($user_id);
            return response()->json([
                'status' => 200,
                'user' => $datauser
            ]);
        }
    }
    public function edituser(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [

            'name' => 'required|max:191',
            'email' => 'required|max:180',
            'image' => 'required',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->getMessageBag(),
            ]);
        } else {
            $product = User::find($id);
            if ($product) {

                $product->name = $request->input('name');
                $product->email = $request->input('email');


                if ($request->hasFile('image')) {
                    $path = $product->image;
                    if (File::exists($path)) {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extension;
                    $file->move('user/', $filename);
                    $product->image = 'user/' . $filename;
                }

                $product->role_as = $request->input('role_as') == true ? '1' : '0';

                $product->update();

                return response()->json([
                    'status' => 200,
                    'message' => 'User Update Success',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User Not Found',
                ]);
            }
        }
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logout succes',
        ]);
    }
}
