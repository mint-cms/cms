<?php

define('MINT_BASEPATH', __DIR__);
define('MINT_VERSION',  '0.1.0');

require 'mint/bootstrap.php';

route(get_url(), array(
    array('/api/settings', 'mint/actions/api/settings.php'),
    array('/api/posts'   , 'mint/actions/api/posts.php'),
    array('/api/auth'    , 'mint/actions/api/auth.php'),
    array('/index'       , 'mint/actions/index.php'),
    array('/blog'        , 'mint/actions/post.php')
));