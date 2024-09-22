<?php




$router = new Core\Router();


$router->add('/', ['controller' => 'HomeController', 'action' => 'index']);
$router->add('/login', ['controller' => 'LandingController', 'action' => 'index']);
$router->add('/sign-in', ['controller' => 'AuthController', 'action' => 'logIn']);


// User routes

$router->add('/getId', ['controller' => 'SessionController', 'action' => 'userId']);
$router->add('/user-create', ['controller' => 'UserController' , 'action' => 'create']);


// tweet routes
$router->add('/add-tweet' ,['controller' => 'TweetController' , 'action' => 'create']);
$router->add('/get-tweets', ['controller' => 'TweetController', 'action' => 'index']);

// like routes
$router->add('/tweet/{id}', ['controller' => 'LikeController', 'action' => 'like']);
$router->add('/api/tweet/{id}', ['controller' => 'LikeController', 'action' => 'isLiked']);



$router->dispatch($_SERVER['REQUEST_URI']);

?>