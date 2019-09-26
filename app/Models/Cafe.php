<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cafe extends Model
{
    //use SoftDeletes;
    //Cafe 模型类与 BrewMethod 模型类之间的多对多关联：
    public function brewMethods()
    {
        return $this->belongsToMany(BrewMethod::class, 'cafes_brew_methods', 'cafe_id', 'brew_method_id');
    }

    public function children(){
        return $this->hasMany(Cafe::class, 'parent', 'id');
    }

    public function parent(){
        return $this->hasOne(Cafe::class, 'id', 'parent');
    }

    public function likes(){
        return $this->belongsToMany(User::class, 'users_cafes_likes','cafe_id', 'user_id');
    }

    public function userLike(){
        return $this->belongsToMany(User::class, 'users_cafes_likes', 'cafe_id', 'user_id')->where('user_id', '=', auth('api')->id());
    }

    public function tags(){
        return $this->belongsToMany(Tag::class, 'cafes_users_tags', 'cafe_id', 'tag_id');
    }

    public function photos(){
        return $this->hasMany(CafePhoto::class, 'id', 'cafe_id');
    }
}
