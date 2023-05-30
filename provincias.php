<?php
require('C:/xampp/htdocs/VISIO-NEXT/INCLUDES/FUNCIONES/db_conexion.php');
$input = $_POST['provincia'];
$query = $input;
$result = pg_query($conn, $query);
echo '<option disabled selected hidden>Ej. Pichincha</option>';
while ($provincia = pg_fetch_assoc($result)) {
    echo '<option value="'.$provincia['provincia_id'].'">'.$provincia['nombre_provincia'].'</option>';
}
pg_close($conn);
?>
