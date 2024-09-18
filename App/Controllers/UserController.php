<?php

namespace App\Controllers;

use App\Models\User;
use Core\Controller;

class UserController extends Controller {


    public function index() {

    }

    public function create() {
        if(isset($_POST['register'])) {
            $user = new User();
            $user->firstname = $_POST['firstname'];
            $user->lastname = $_POST['lastname'];
            $user->email = $_POST['email'];
            $user->username = $_POST['username'];
            $user->password = $_POST['password'];
            $user->save();
            header('Location: /login');
        }
    }




}