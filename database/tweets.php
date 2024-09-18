<?php

require "../vendor/autoload.php";
require "../Bootstrap.php";

use Illuminate\Database\Capsule\Manager as Capsule;

Capsule::schema()->create('tweets', function ($table) {
    $table->id();
    $table->integer('user_id')->nullable();
    $table->text('tweetText');
    $table->string('tweetImageUrl', 255)->nullable();
    $table->timestamps();

    
});



?>