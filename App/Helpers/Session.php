<?php 

namespace App\Helpers;

class Session {
    private static $instances = [];
    private $signedIn = false;
    public $userId;
    public $message;


    protected function __construct()
    {
        session_start();
        $this->checkLogin();
        $this->checkMessage();
    }

    protected function __clone()
    {
        
    }

    public static function getInstance() : Session {
        $class = static::class;
        if(!isset($instances[$class])) {
            self::$instances[$class] = new static();
        }

        return self::$instances[$class];
    }

    public function isSignedIn() {
        return $this->signedIn;
    }


    public function checkLogin()
    {
        if (isset($_SESSION['userId'])) {
            $this->userId = $_SESSION['userId'];
            $this->signedIn = true;
        } else {
            unset($this->userId);
            $this->signedIn = false;
        }
    }

    public function login($user)
    {
        if ($user) {
            $this->userId = $user->id;
            $_SESSION['userId'] = $user->id;
            $this->signedIn = true;
        }
    }

    public function logout()
    {
        unset($_SESSION['userId']);
        unset($this->userId);
        $this->signedIn = false;
    }

    public function message($msg = "")
    {
        if (!empty($msg)) {
            $this->message = $_SESSION['message'] = $msg;
        } else {
            return $this->message;
        }
    }

    public function checkMessage()
    {
        if (isset($_SESSION['message'])) {
            $this->message = $_SESSION['message'];
            unset($_SESSION['message']);
        } else {
            $this->message = "";
        }
    }
}
?>