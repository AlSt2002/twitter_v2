<?php

namespace App\Controllers;

use App\Helpers\Response;
use App\Helpers\Session;
use App\Models\Like;
use Core\Controller;

class LikeController extends Controller {


    function isLiked($id) {
        $session = Session::getInstance();
        $userId = $session->userId;

        $like = Like::where('user_id', $userId)
        ->where('tweet_id', $id)
        ->first();

        if($like) {
            Response::json(['result' => 'true']);
        }
        else {
            Response::json(['result' => 'false']);
        }
    }

   

    public function like($id) {
        
        $session = Session::getInstance();
        $userId = $session->userId;

        $like = Like::where('user_id', $userId)
        ->where('tweet_id', $id)
        ->first();

        if($like) {
            $like->delete();
            Response::json(['result' => 'deleted']);
        }
        else {

            $like = new Like();
            $like->user_id = $userId;
            $like->tweet_id = $id;
            $like->save();
            Response::json(['result' => 'liked']);
        }
    
     

    }
}