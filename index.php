<?php

require 'mint/bootstrap.php';

$url = get_url();

route($url ? $url : 'index', array(
    array('/api/settings', 'mint/actions/api/settings.php'),
    array('/api/posts'   , 'mint/actions/api/posts.php'),
    array('/api/auth'    , 'mint/actions/api/auth.php'),
    array('/index'       , 'mint/actions/index.php'),
    array('/blog'        , 'mint/actions/post.php')
));