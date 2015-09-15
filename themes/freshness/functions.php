<?php

function format_date ($date) {
    return date('m.d.Y', strtotime($date));
}