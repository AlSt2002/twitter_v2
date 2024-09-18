<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model {

    public function tweets() {
        return $this->hasMany(Tweet::class);
    }

    public function retweets() {
        return $this->hasMany(Retweet::class);
    }

    
    public function likes() {
        return $this->hasMany(Like::class);
    }


    public function follows() {
        return $this->hasMany(Follow::class);
    }


    public function notifications() {
        return $this->hasMany(Notification::class);
    }
}