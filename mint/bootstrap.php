<?php

define('MINT_BASEPATH', dirname(__DIR__));
define('MINT_VERSION',  '0.1.0');

require 'core/array.php';
require 'core/string.php';
require 'core/storage.php';
require 'core/events.php';
require 'core/view.php';
require 'core/snippets.php';
require 'core/db.php';
require 'core/db_ext.php';
require 'core/json.php';
require 'vendor/autoload.php';

require 'models/settings.php';

db_connect(require 'config/db.php');
settings_init();

ob_start();
date_default_timezone_set('America/Los_Angeles');

set_error_handler(function ($type, $message, $file, $line) {
    throw new Exception("PHP error: '$message' in '$file' at $line");
});