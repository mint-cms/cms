<?php

function action_index ($fragments) {
    $url = $fragments[0];
    
    layout('blog/post', array(
        'title' => 'Один топик',
        'post'  => db_select(
            'SELECT * FROM posts WHERE url = ?', 
            array($url), true
        )
    ));
}