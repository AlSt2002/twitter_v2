<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tweet extends Model {

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function retweets() {
        return $this->hasMany(Retweet::class);
    }

    public function likes() {
        return $this->hasMany(Like::class);
    }

    public function notifications() {
        return $this->hasMany(Notification::class);
    }

}