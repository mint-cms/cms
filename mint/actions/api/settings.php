<?php

function action_index ($fragments) {
    if (!is_ajax()) {
        return;
    }
    
    route_action($fragments);
}

/**
 * Save settings group to database
 * 
 * @param string $group
 */
function action_save ($group = 'default') {
    $input = $_POST;
    $settings = settings_get($group);
    
    foreach ($input as $key => $value) {
        $input[$key] = array(
            'exist' => isset($settings[$key]),
            'value' => strip_tags($value)
        );
        
        if (isset($settings[$key]) && $value === $settings[$key]) {
            unset($input[$key]);
        }
    }
    
    json_result(settings_save($group, $input));
}

/**
 * Get settings group from database
 * 
 * @param string $group
 */
function action_get ($group = 'default') {
    $settings = settings_get($group);
    $settings['id'] = $group;
    
    json_result($settings, compact('settings'));
}