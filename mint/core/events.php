<?php

/**
 * Events functions
 * 
 * @package mini_framework
 * @require storage
 */

/**
 * Events storage
 * 
 * @param string $event
 * @param callable $callback
 */
function events ($event, $callback = null) {
    static $stack = null;
    $stack or $stack = stack();
    
    return $stack($event, $callback);
}

/**
 * Bind an event
 * 
 * @param string $event
 * @param callable $callback
 */
function bind ($event, $callback) {
    events($event, $callback);
}

/**
 * Emit an event
 * 
 * @param string $event
 * @return array
 */
function emit ($event) {
    $event = events($event);
    
    if (empty($event)) {
        return false;
    }
    
    $result = array();
    $args   = array_slice(func_get_args(), 1);
    
    foreach ($event as $callback) {
        if ($value = call_user_func_array($callback, $args)) {
            $result[] = $value;
        }
    }
    
    return $result;
}