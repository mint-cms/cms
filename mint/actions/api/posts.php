<?php

function action_index ($fragments) {
    if (!is_ajax()) {
        return;
    }
    
    route_action($fragments);
}

/**
 * Get a post by id
 * 
 * @param string $id
 */
function action_get ($id) {
    $item = db_find('posts', $id);
    
    json_result(true, compact('item'));
}

/**
 * Add a post
 */
function action_add () {
    $data = $_POST;
    $id   = db_insert('posts', $data);
    
    json_result($id, compact('id', 'data'));
}

/**
 * Edit a post
 * 
 * @param string $id
 */
function action_edit ($id) {
    $data = $_POST;
    $result = db_update('posts', $data, $id);
    
    json_result($id, compact('data'));
}

/**
 * Remove a post from database
 * 
 * @param string $id
 */
function action_remove ($id) {
    json_result(db_delete('posts', $id));
}

/**
 * Get post's template
 */
function action_template () {
    $data = array(
        'id'          => 0,
        'url'         => '',
        'date'        => date('Y-m-d H:i:s'),
        'text'        => '',
        'title'       => '',
        'category_id' => 0
    );
    
    $html = capture(function () use ($data) {
        snippet('blog/snippet', $data);
    });
    
    json_result(true, compact('html', 'data'));
}