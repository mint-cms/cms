<?php

/**
 * Database functions
 * 
 * @package mini_framework
 */

/**
 * Database storage
 * 
 * @param string $key
 * @param mixed $value
 * @return mixed
 */
function db ($key = null, $value = null) {
    static $repo = null;
    
    $repo or $repo = repo();
    
    return $repo($key, $value);
}

/**
 * Connect to a database
 * 
 * @param array $config
 * @param string
 */
function db_connect (array $config) {
    if (db('active') || !$config) {
        return;
    }
    
    $db = db_create_connection($config);
    
    db('active', $db);
}

/**
 * Create PDO MySQL database connection
 * 
 * @param array $config
 * @return \PDO
 */
function db_create_connection ($config) {
    $db = new PDO(db_build_dsn($config), $config['user'], $config['password']);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    return $db;
}

/**
 * Build PDO DSN constructor string
 * 
 * @param array $config
 * @return string
 */
function db_build_dsn (array $config) {
    if ($dsn = array_get($config, 'dsn')) {
        return $dsn;
    }
    
    $config = array_exclude($config, array('driver', 'user', 'password'));
    
    foreach ($config as $key => $value) {
        $config[$key] = "$key=$value";
    }
    
    $config = implode(';', $config);
    $driver = array_get($config, 'driver', 'mysql');
    
    return "$driver:$config";
}

/**
 * Select information from 
 * 
 * @param string $query
 * @param array $data
 * @param bool $one
 * @return array
 */
function db_select ($query, array $data = array(), $one = false) {
    $statement = db_prepare($query, $data);
    
    $result = $one ? $statement->fetch() : $statement->fetchAll();
    
    return $result ? $result : array();
}

/**
 * Insert a row in database
 * 
 * @param string $table
 * @param array $data
 * @return int
 */
function db_insert ($table, array $data) {
    if (empty($data)) {
        return 0;
    }
    
    list($keys, $placeholders) = db_prepare_insert($data);
    
    $query = "INSERT INTO $table ($keys) VALUES ($placeholders)";
    $statement = db_prepare($query, array_values($data));
    
    return $statement->rowCount() 
        ? db('active')->lastInsertId() 
        : 0;
}

/**
 * Prepare insert data
 * 
 * @param array $data
 * @return array
 */
function db_prepare_insert (array $data) {
    $keys = implode(',', 
        array_map(function ($value) {           
            return "`$value`";
        }, array_keys($data))
    );
    
    $placeholders = chop(
        str_repeat('?,', count($data)), ','
    );
    
    return array($keys, $placeholders);
}

/**
 * Update row(s) in database
 * 
 * @param string $table
 * @param array $data
 * @param array $id
 * @return bool
 */
function db_update ($table, array $data, $id) {
    if (empty($data)) {
        return false;
    }
    
    $update = db_prepare_update($data);
    $query  = "UPDATE $table SET $update WHERE id = ?";
    
    $statement = db_prepare($query, array_merge(
        array_values($data), 
        array($id)
    ));
    
    return $statement->rowCount() > 0;
}

/**
 * Prepare update statement
 * 
 * @param array $data
 * @return string
 */
function db_prepare_update (array $data) {
    $update = array();
    
    foreach ($data as $key => $value) {
        $update[] = "`$key` = ?";
    }
    
    return implode(',', $update);
}

/**
 * Delete row(s) from database
 * 
 * @param string $table
 * @param 
 * @return bool
 */
function db_delete ($table, $id) {
    $query = "DELETE FROM `$table` WHERE `id` = ?";
    
    return db_prepare($query, array($id))->rowCount() > 0;
}

/**
 * Prepare a PDO statement
 * 
 * @param string $query
 * @param array $parameters
 * @return \PDOStatement
 */
function db_prepare ($query, array $parameters) {
    $statement = db('active')->prepare($query);
    $statement->execute($parameters); 
    
    return $statement;
}

/**
 * Execute a SQL query
 * 
 * @param string $query
 * @return int|bool
 */
function db_query ($query) {
    return db('active')->query($query);
}