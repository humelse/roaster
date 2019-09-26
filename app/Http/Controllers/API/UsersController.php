<?php
/**
 * Created by PhpStorm.
 * User: zhangjunmei
 * Date: 2019-09-16
 * Time: 09:38
 */

namespace App\Http\Controllers\API;


use Illuminate\Support\Facades\Auth;
use App\Http\Requests\EditUserRequest;
use Illuminate\Support\Facades\Log;

class UsersController
{
    public function getUser()
    {
        if (Auth::guard('api')->user() == null){
            Log::alert('user guard  API Auth  is NULL');
        }

        if (Auth::user() == null){
            Log::alert('user Auth is NULL');
        }

        return Auth::guard('api')->user();
    }


    public function putUpdateUser(EditUserRequest $request)
    {
        $user = Auth::user();
        $favoriteCoffee = $request->input('favorite_coffee');
        $flavorNotes = $request->input('flavor_notes');
        $profileVisibility = $request->input('profile_visibility');
        $city = $request->input('city');
        $state = $request->input('state');
        if ($favoriteCoffee) {
            $user->favorite_coffee = $favoriteCoffee;
        }
        if ($flavorNotes != null) {
            $user->flavor_notes = $flavorNotes;
        }
        if ($profileVisibility != null) {
            //这里之前是if ($profileVisibility),有个坑，如果值是0，就不会进入了。
            $user->profile_visibility = $profileVisibility;
        }

        if ($city != null) {
            $user->city = $city;
        }
        if ($state) {
            $user->state = $state;
        }
        $ret = $user->save();
        if (!$ret){
            Log::info('save return false!');
        } else {
            Log::info('save return true!');
        }

        return response()->json(['user_updated' => true], 201);
    }
}