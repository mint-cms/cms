<?php

/**
 * Isolation function from view's function context
 * 
 * @param string $__view__
 * @param array $__data__
 */
function render ($__view__, array $__data__) {
    extract($__data__);
    
    require($__view__);
}

/**
 * View layout
 * 
 * @param string $view
 * @param array $data
 * @param string $layout
 */
function layout ($view, array $data, $layout = 'layouts/default') {
    $data['view'] = $view;
    
    view($layout, $data);
}

/**
 * View template
 * 
 * @param string $view
 * @param array $data
 */
function view ($view, $data) {
    render(view_path($view), $data);
}

/**
 * Get view path
 * 
 * @param string $view
 * @return string
 */
function view_path ($view) {
    if (starts_with($view, '/')) {
        return "$view.php";
    }
    
    return MINT_BASEPATH . "/themes/freshness/html/$view.php";
}

/**
 * Convert markdown into HTML and return it (via Parsedown)
 * 
 * @param string $text
 * @return string
 */
function markdown ($text) {
    static $parsedown;
    
    $parsedown or $parsedown = new Parsedown;
    
    return $parsedown->text($text);
}