<?php

namespace App\Controllers;

use App\Helpers\Response;
use App\Models\Retweet;
use App\Helpers\Session;
use App\Models\Tweet;
use Core\Controller;

class RetweetController extends Controller {


    public static function getRetweets() {

        $retweets = Retweet::all();

        $jsonretweets = [];

        foreach ($retweets as $retweet) {

            $retweet = Retweet::with('user')->findOrFail($retweet->id);
            $tweet = Tweet::with('user')->with('retweets')->with('likes')->findOrFail($retweet->tweet_id);
            $retweet->tweetwithuser = $tweet;
            $jsonretweets[] = $retweet; 
        }

        return $jsonretweets;
    }

    public function isRetweeted($id) {
        $session = Session::getInstance();
        $userId = $session->userId;

        $retweet = Retweet::where('user_id', $userId)
                            ->where('tweet_id', $id)
                            ->first();

        if ($retweet) {
            Response::json(['result' => 'true']);
        }
        else {
            Response::json(['result' => 'false']);
        }
    }


    public function retweet($id) {
        $session = Session::getInstance();
        $userId = $session->userId;

        $retweet = Retweet::where('user_id', $userId)
        ->where('tweet_id', $id)
        ->first();

        if ($retweet) {
            $retweet->delete();
            Response::json(['result' => 'deleted']);
        } 
        else {
            $retweet = new Retweet();
            $retweet->user_id = $userId;
            $retweet->tweet_id = $id;
            $tweet = Tweet::findOrFail($retweet->tweet_id);
            if ($tweet->user_id == $retweet->user_id) {
                Response::json(['result' => 'You can not retweet your tweet']);
            }
            else{
                
                $retweet->save();
                Response::json(['result' => 'retweeted']);
            }
            
           
        }
    }


    public function getTweet($id) {
        $retweet = Retweet::where('id', $id)->first();
        $tweetId = $retweet->tweet_id;
 
        Response::json(['result' => $tweetId ]);
        
    }


}