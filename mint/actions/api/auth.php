<?php

function action_index ($fragments) {
    route_action($fragments);
}

/** Log in */
function action_login () {
    if (!is_ajax()) {
        return;
    }
    
    $user     = require basepath('mint/config/user.php');
    $password = array_get($_POST, 'password', '');
    
    if (md5($password) !== md5($user['password'])) {
        return json_result(false, array(), 'Неверный пароль');
    }
    
    session('user_id', 1);
    json_result(true);
}

/** Log out */
function action_logout () {
    if (is_admin()) {
        session_destroy();
    }
    
    redirect();
}