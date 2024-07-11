<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    public function store(Request $request) {

        $request->validate([
            'email' => ['required', 'string' , 'email'],
            'password' => ['required','string']
        ]);

        if(!Auth::attempt($request->only('email','password'))){
            return response()->json([
                'message' => 'Bad Credential'
            ],401);


        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Logged in successfully',
            'token'=>$token,
            'user' => $user
        ]);
    }
}
