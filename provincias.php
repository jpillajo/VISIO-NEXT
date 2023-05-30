<?php
require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
$input = $_POST['provincia'];
$query = $input;
// $query = "SELECT tbl_provincia.id_provincia AS provincia_id, nombre_provincia, SUM(sai_total) AS sai 
//             FROM public.tbl_sai, public.tbl_parroquia,
//             public.tbl_canton, public.tbl_provincia
//             WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
//             AND tbl_canton.id_canton = tbl_parroquia.id_canton
//             AND tbl_provincia.id_provincia = tbl_canton.id_provincia
//             GROUP BY provincia_id, nombre_provincia
//             ORDER BY provincia_id, nombre_provincia ASC;";
$result = pg_query($conn, $query);
echo '<option disabled selected hidden>Ej. Pichincha</option>';
while ($provincia = pg_fetch_assoc($result)) {
    echo '<option value="'.$provincia['provincia_id'].'">'.$provincia['nombre_provincia'].'</option>';
}
pg_close($conn);
?>