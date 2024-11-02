<?php




$router = new Core\Router();


$router->add('/', ['controller' => 'HomeController', 'action' => 'index']);

$router->add('/get-posts', ['controller' => 'HomeController', 'action' => 'getPosts']);
$router->add('/login', ['controller' => 'LandingController', 'action' => 'index']);
$router->add('/sign-in', ['controller' => 'AuthController', 'action' => 'logIn']);


// User routes

$router->add('/getId', ['controller' => 'SessionController', 'action' => 'userId']);
$router->add('/user-create', ['controller' => 'UserController' , 'action' => 'create']);


// tweet routes
$router->add('/add-tweet' ,['controller' => 'TweetController' , 'action' => 'create']);
$router->add('/get-tweets', ['controller' => 'TweetController', 'action' => 'index']);
$router->add('/api/getTweet/{id}', ['controller' => 'RetweetController', 'action' => 'getTweet']);

// like routes
$router->add('/tweet/{id}', ['controller' => 'LikeController', 'action' => 'like']);
$router->add('/api/tweet/{id}', ['controller' => 'LikeController', 'action' => 'isLiked']);


//retweet routes
$router->add('/retweet/{id}', ['controller' => 'RetweetController', 'action' => 'retweet']);
$router->add('/api/retweet/{id}', ['controller' => 'RetweetController', 'action' => 'isRetweeted']);



$router->dispatch($_SERVER['REQUEST_URI']);

?>