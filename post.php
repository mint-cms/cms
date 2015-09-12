<?php

require 'mint/bootstrap.php';

layout('blog/post', array(
    'title' => 'Один топик',
    'post'  => db_select(
        'SELECT * FROM posts WHERE url = ?', 
        array($_GET['url']), true
    )
));