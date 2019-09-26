<?php
/**
 * Created by PhpStorm.
 * User: zhangjunmei
 * Date: 2019-09-23
 * Time: 15:47
 */

namespace App\Utilities;
use App\Models\Tag;

class Tagger
{
    public static function tagCafe($cafe, $tags, $userId){
        foreach ($tags as $tag){
            $name = trim($tag);

            $newCafeTag = Tag::firstOrNew(array('name'=>$name));
            $newCafeTag->name = $name;
            $newCafeTag->save();

            $cafe->tags()->syncWithoutDetaching([$newCafeTag->id => ['user_id' => $userId]]);
        }
    }
}