<?php 

namespace App\Controllers;

use App\Config;
use App\Helpers\Response;
use App\Helpers\Session;
use Core\Controller;

class SessionController extends Controller {


    public function userId()  {
        $session = Session::getInstance();

        Response::json(['u_id' => $session->userId]);
    }
}