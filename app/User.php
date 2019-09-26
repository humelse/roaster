<?php

namespace App;

use App\Models\Cafe;
use App\Models\CafePhoto;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    const ROLE_GENERAL_USER = 0;  // 普通用户
    const ROLE_SHOP_OWNER = 1;    // 商家用户
    const ROLE_ADMIN = 2;         // 管理员
    const ROLE_SUPER_ADMIN = 3;   // 超级管理员


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','provider', 'provider_id'
    ];

    public function likes()
    {
        return $this->belongsToMany(Cafe::class, 'users_cafes_likes', 'user_id', 'cafe_id');
    }

    public function cafePhotos(){
        return $this->hasMany(CafePhoto::class, 'id', 'uploaded_by');
    }

}
