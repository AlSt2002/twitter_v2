<?php 

namespace App\Controllers;

use App\Helpers\Session;
use App\Models\User;
use Core\Controller;
use Core\View;


class AuthController extends Controller {


    public function checkIflogged() {
        
    }

    public function logIn() {
        if(isset($_POST['sign-in'])) {

            $email = $_POST['email'];
            $password = $_POST['password'];
            $user = User::where('email' , $email)->where('password', $password)->latest()->first();
            $session = Session::getInstance();
            if($user) {
                $session->login($user);
                header('Location: /');

            
            }

        }
    }


    public function logout() {

    }


}








?>