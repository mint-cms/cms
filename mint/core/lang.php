<?php

/**
 * Language container
 * 
 * @param mixed $key
 * @param mixed $value
 * @return mixed
 */
function lang ($key = null, $value = null) {
    static $repo;
    
    $repo or $repo = repo();
    
    return $repo($key, $value);
}

/**
 * Load language file
 * 
 * @param string $lang
 * @param string $section
 */
function load_lang ($lang, $section = 'index') {
    $path = "mint/lang/$lang/$section.php";
    
    lang(require basepath($path));
}