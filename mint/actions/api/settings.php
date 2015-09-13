<?php

function action_index ($fragments) {
    route_action($fragments);
}

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

function action_get ($group = 'default') {
    $settings = settings_get($group);
    $settings['id'] = $group;
    
    json_result($settings, compact('settings'));
}