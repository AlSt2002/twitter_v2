<?php

namespace App\Controllers;

use App\Helpers\Response;
use App\Helpers\Session;
use App\Models\Retweet;
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

    public function getPosts() {
        $tweets = TweetController::getTweets();
        $retweets = RetweetController::getRetweets();

        $array = array_merge($tweets, $retweets);

        Response::json($array);
    }
   

}