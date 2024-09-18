<?php

require "../vendor/autoload.php";
require "../Bootstrap.php";

use Illuminate\Database\Capsule\Manager as Capsule;

Capsule::schema()->create('retweets', function ($table) {
    $table->id();
    $table->integer('user_id')->nullable();
    $table->integer('tweet_id')->nullable();
  


    
});

?>