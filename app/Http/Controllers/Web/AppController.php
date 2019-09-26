<?php
/**
 * Created by PhpStorm.
 * User: zhangjunmei
 * Date: 2019-08-28
 * Time: 14:59
 */

namespace app\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AppController extends Controller
{
    public function getApp()
    {
        return view('app');
    }

    public function getLogin()
    {
        return view('login');
    }

    public function getLogout()
    {
        Auth::logout();
        return redirect('/');
    }
}