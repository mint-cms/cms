<?php

require 'mint/bootstrap.php';

route(array_get($_GET, 'route', 'index'), array(
    array('/api/settings', 'mint/actions/api/settings.php'),
    array('/api/posts'   , 'mint/actions/api/posts.php'),
    array('/index'       , 'mint/actions/index.php'),
    array('/blog'        , 'mint/actions/post.php')
));