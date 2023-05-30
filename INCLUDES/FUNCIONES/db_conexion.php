<?php
//ini_set('include_path',ini_get('include_path').':../includes:');
//define(dirname('<C:>://xampp//htdocs//MXAC_DASHBOARD'),__DIR__);
$host = 'localhost';
$port = '5432';
//$db = 'bdd_geovisor';
//$db = 'bdd_dashboard';
$db = 'bdd_estadisticos';
$user = 'postgres';
$password = 'admin'; // change to your password
//$dbconn = pg_connect("dbname=bdd_geovisor");
//connect to a database named "bdd_geovisor"

//$dsn = "pgsql:host=$host;port=$port;dbname=$db;";
//$conn = new PDO($dsn, $user, $password);

$conn = pg_connect("host=$host dbname=$db user=$user password=$password");
// connect to a database named "bdd_geovisor" on "localhost" at port "5432"

//$dbconn3 = pg_connect("host=sheep port=5432 dbname=bdd_geovisor user=lamb password=foo");
//connect to a database named "bdd_geovisor" on the host "sheep" with a username and password

//$conn_string = "host=sheep port=5432 dbname=test user=lamb password=bar";
//$dbconn4 = pg_connect($conn_string);
//connect to a database named "test" on the host "sheep" with a username and password
?>