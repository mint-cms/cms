<?php 

require '../mint/bootstrap.php';

$route = array_get($_GET, 'route', '');

if ($route) {
    $fragments = explode('/', $route);
    
    require $fragments[0];
    
    call_user_func_array("action_{$fragments[1]}", array_slice($fragments, 2));
}