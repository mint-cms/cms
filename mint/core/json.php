<?php

/**
 * json_encode alias
 * 
 * @param mixed $data
 * @return mixed
 */
function json ($data) {
    if (is_array($data)) {
        return json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    else {
        return json_decode($data, true);
    }
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