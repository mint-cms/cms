<?php

/**
 * Route an url to given array of routes
 * 
 * @param string $url
 * @param array $routes
 */
function route ($url, array $routes) {
    $url = $url ? $url : 'index';
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

/**
 * Get base URL
 * 
 * @return string
 */
function baseurl () {
    $base   = trim(MINT_BASEPATH, '/');
    $root   = trim($_SERVER['DOCUMENT_ROOT'], '/');
    $lenght = strlen($root);

    return $base === $root ? '' : trim(substr($base, $lenght), '/');
}

/**
 * Get requested URL
 * 
 * @return string
 */
function get_url () {
    $root = baseurl();
    
    $url = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $url = trim($url, '/');
    
    if ($root && strpos($url, $root) === 0) {
        $url = substr($url, strlen($root));
        $url = trim($url, '/');
    }
    
    return $url;
}

/**
 * Construct URL
 * 
 * @param string $file
 * @return string
 */
function url ($url = '') {
    static $baseurl = null;
    
    $baseurl or $baseurl = baseurl();
    
    return deduplicate("/$baseurl/$url", '/');
}

/**
 * Redirect
 * 
 * @param string $url
 */
function redirect ($url = '') {
    $url = url($url);
    
    header("Location: $url") xor exit;
}