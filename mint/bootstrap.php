<?php

require 'core/db.php';
require 'core/lang.php';
require 'core/view.php';
require 'core/json.php';
require 'core/input.php';
require 'core/array.php';
require 'core/db_ext.php';
require 'core/string.php';
require 'core/events.php';
require 'core/storage.php';
require 'core/routing.php';
require 'core/snippets.php';

require 'vendor/autoload.php';

require 'models/settings.php';
require 'models/users.php';

session_start();
ob_start();
date_default_timezone_set('America/Los_Angeles');

db_connect(require 'config/db.php');
settings_init();
users_init();
load_lang('en_US');

set_error_handler(function ($type, $message, $file, $line) {
    throw new Exception("PHP error: '$message' in '$file' at $line");
});