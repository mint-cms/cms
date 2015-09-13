<?php

/**
 * Route an url to given array of routes
 * 
 * @param string $url
 * @param array $routes
 */
function route ($url, array $routes) {
    $url = trim($url, '/');
    $url = "/$url";
    
    foreach ($routes as $route) {
        list($slug, $file) = $route;
        
        if (strpos($url, $slug) === 0) {
            require $file;
            
            $url = trim(substr($url, strlen($slug)), '/');
            
            return action_index(explode('/', $url));
        }
    }
}

/**
 * Route an action
 * 
 * @param array $fragments
 */
function route_action (array $fragments) {
    call_user_func_array("action_$fragments[0]", array_slice($fragments, 1));
}

function baseurl () {
    $base   = trim(MINT_BASEPATH, '/');
    $root   = trim($_SERVER['DOCUMENT_ROOT'], '/');
    $lenght = strlen($root);

    return $base === $root ? '' : trim(substr($base, $lenght), '/');
}

function url ($file = '') {
    static $baseurl = null;
    
    $baseurl or $baseurl = baseurl();
    
    return deduplicate("/$baseurl/$file", '/');
}