<?php

namespace App\Controllers;

use App\Helpers\Session;
use App\Models\User;
use Core\Controller;
use Core\View;

class HomeController extends Controller {

    

    public function index() {
        
        $session = Session::getInstance();
        if($session->isSignedIn()) {
            $user = User::findOrFail($session->userId);
           
        }
        View::renderTemplate('Home/index.html' , ['user' => $user]);
        
    }


   

}