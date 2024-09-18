<?php

namespace App\Controllers;

use App\Helpers\Response;
use App\Helpers\Session;
use App\Models\Tweet;
use Core\Controller;


class TweetController extends Controller {

    public function index() {
        $tweets = Tweet::all();

        $jsontweets = [];

        if($tweets) {
           foreach ($tweets as $tweet) {
                $tweet = Tweet::with('user')->findOrFail($tweet->id);
                $jsontweets[] = $tweet;
           }
        }

        Response::json($jsontweets);

    }

    public function create()  {
        $session = Session::getInstance();

       if(isset($_POST['post'])) {
            $tweet = new Tweet();
            $tweet->user_id = $session->userId;
            $tweet->tweetText = $_POST['tweetText'];
            if($tweet->save()) {
               $tweet = Tweet::with('user')->findOrFail($tweet->id);
                Response::json($tweet);
            }

        
       }
    }


}