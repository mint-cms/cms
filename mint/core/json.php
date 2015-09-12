<?php

/**
 * json_encode alias
 * 
 * @param array $data
 * @return string
 */
function json (array $data) {
    return json_encode($data, JSON_UNESCAPED_UNICODE);
}

/**
 * Output JSON result
 * 
 * @param bool $condition
 * @param array $data
 * @param string $message
 */
function json_result ($condition, $data = array(), $message = '') {
    $data['status']  = $condition ? 'ok' : 'error';
    $data['message'] = $message;
    
    echo json($data);
}