<?php

/**
 * Users storage function
 * 
 * @param string $key
 * @param mixed $value
 * @return mixed
 */
function users ($key = null, $value = null) {
    static $repo = null;
    
    $repo or $repo = repo();
    
    return $repo($key, $value);
}

/**
 * Init users
 */
function users_init () {
    if (session('user_id')) {
        users('user', require basepath('mint/config/user.php'));
        users('authorized', true);
    }
    else {
        session('user_id', false);
    }
}

/**
 * Alias for users('authorized')
 * 
 * @return bool
 */
function is_admin () {
    return users('authorized');
}

/**
 * Get user by id
 * 
 * @param int $id
 * @return array|bool
 */
function user_by_id ($id) {
    return db_select('
        SELECT id, username, mail
        FROM users
        WHERE id = ?',
        array($id), true
    );
}

/**
 * Get user for authorization
 * 
 * @param string $username
 * @param string $password
 * @return array|bool
 */
function user_for_auth ($username, $password) {
    return db_select('
        SELECT id, username, password
        FROM users
        WHERE username = ? AND password = ?',
        array($username, $password), true
    );
}