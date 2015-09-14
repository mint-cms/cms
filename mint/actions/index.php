<?php

/**
 * Show the recent posts
 */
function action_index () {
    layout('blog/posts', array(
        'title' => 'Топики',
        'posts' => db_select('SELECT * FROM posts ORDER BY date DESC')
    ));
}