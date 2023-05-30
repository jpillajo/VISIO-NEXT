<?php
$host = 'localhost';
$port = '5432';
$db = 'bdd_estadisticos';
$user = 'postgres';
$password = 'admin';

$conn = pg_connect("host=$host dbname=$db user=$user password=$password");
?>
