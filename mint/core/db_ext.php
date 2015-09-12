<?php

/**
 * Find a record 
 * 
 * @param string $table
 * @param int $id
 * @param string $fields
 * @return array
 */
function db_find ($table, $id, $fields = '*') {
    return db_select("
        SELECT $fields FROM $table WHERE id = ?", 
        array($id), true
    );
}

/**
 * Find all records
 * 
 * @param string $table
 * @param string $fields
 * @return array
 */
function db_find_all ($table, $fields = '*') {
    return db_select("SELECT $fields FROM $table");
}

/**
 * Find all records specified by range
 * 
 * @param string $table
 * @param int $limit
 * @param int $offset
 * @param string $fields
 * @return array
 */
function db_find_range ($table, $limit, $offset = 0, $fields = '*') {
    return db_select("
        SELECT $fields FROM $table 
        LIMIT ? 
        OFFSET ?", 
        array($limit, $offset)
    );
}