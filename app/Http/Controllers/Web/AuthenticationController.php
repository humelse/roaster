<?php
/**
 * Created by PhpStorm.
 * User: zhangjunmei
 * Date: 2019-08-28
 * Time: 15:53
 */

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use App\User;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    //

    public function getSocialRedirect($social)
    {
        try {
            Log::alert('redirect to Github:'.$social);
            return Socialite::with($social)->redirect();
        } catch (\InvalidArgumentException $e) {
            Log::alert('redirect error:');
            return redirect('/login');
        }
    }

    public function getSocialCallback($account)
    {
        // 从第三方 OAuth 回调中获取用户信息
        Log::alert('callback from auth:'.$account);
        $socialUser = Socialite::with($account)->user();

        //var_dump($socialUser);
        //sleep(120);

        // 在本地 users 表中查询该用户来判断是否已存在
        $user = User::where( 'provider_id', '=', $socialUser->id )
            ->where( 'provider', '=', $account )
            ->first();
        if ($user == null) {
            // 如果该用户不存在则将其保存到 users 表
            $newUser = new User();

            $newUser->name        = $socialUser->getLogin();
            $newUser->email       = $socialUser->getEmail() == '' ? '' : $socialUser->getEmail();
            $newUser->avatar      = $socialUser->getAvatar();
            $newUser->password    = '';
            $newUser->provider    = $account;
            $newUser->provider_id = $socialUser->getId();

            $newUser->save();
            $user = $newUser;
        }

        // 手动登录该用户
        Auth::login( $user );
        //Auth::guard('api')->login($user);

        if(Auth::check()){
            //dd($user);
            //return redirect()->route('dashboard');
            return redirect('/#/cafes');

        }else{
            echo 'user not logged in ';
            Log::alert('user not logged in');
        }
    }
}