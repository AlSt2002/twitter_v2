<?php


namespace App\Controllers;

use Core\Controller;
use Core\View;

class LandingController extends Controller{

    public function index() {
        View::renderTemplate('landing.html');
    }


}

?>

