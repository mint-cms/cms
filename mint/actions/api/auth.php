<?php

function action_index ($fragments) {
    route_action($fragments);
}

/** Log in */
function action_login () {
    if (!is_ajax()) {
        return;
    }
    
    $password = array_get($_POST, 'password', '');
    
    if (md5($password) !== md5('123456')) {
        return json_result(false, array(), 'Неверный пароль');
    }
    
    json_result(true);
    session('user_id', 1);
}

/** Log out */
function action_logout () {
    if (is_admin()) {
        session_destroy();
    }
    
    redirect();
}