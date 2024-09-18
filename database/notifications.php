<?php

require "../vendor/autoload.php";
require "../Bootstrap.php";

use Illuminate\Database\Capsule\Manager as Capsule;

Capsule::schema()->create('notifications', function ($table) {
    $table->id();
    $table->integer('user_id')->nullable();
    $table->integer('action_user_id')->nullable();
    $table->integer('tweet_id')->nullable();

    // add an enum('like', 'retweet', 'mention') called notfication_type
    // add a tinyint(1) is_read default 0;

  


    
});

?>