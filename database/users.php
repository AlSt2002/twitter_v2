<?php

require "../vendor/autoload.php";
require "../Bootstrap.php";

use Illuminate\Database\Capsule\Manager as Capsule;

Capsule::schema()->create('users', function ($table) {
    $table->id();
    $table->string('username', 50)->unique();
    $table->string('email', 100)->unique();
    $table->string('password', 255);
    $table->string('profileImage', 255)->nullable();
    $table->string('firstname', 255)->nullable();
    $table->string('lastname', 255)->nullable();
    $table->timestamps();

});






?>