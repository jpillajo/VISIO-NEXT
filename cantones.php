<?php
require('C:/xampp/htdocs/VISIO-NEXT/INCLUDES/FUNCIONES/db_conexion.php');
$input = $_POST['provincia'];
$query = "SELECT nombre_provincia, tbl_canton.id_canton AS canton_id, nombre_canton, SUM(sai_total) AS sai
            FROM public.tbl_sai, public.tbl_parroquia,
            public.tbl_canton, public.tbl_provincia
            WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
            AND tbl_canton.id_canton = tbl_parroquia.id_canton
            AND tbl_provincia.id_provincia = tbl_canton.id_provincia
            AND tbl_provincia.id_provincia = '".$input."'
            GROUP BY nombre_provincia, canton_id, nombre_canton
            ORDER BY nombre_provincia, canton_id, nombre_canton ASC;";
$result = pg_query($conn, $query);
echo '<option disabled selected hidden>Ej. Quito</option>';
while ($canton = pg_fetch_assoc($result)) {
    echo '<option value="'.$canton['canton_id'].'">'.$canton['nombre_canton'].'</option>';
}
pg_close($conn);
?>