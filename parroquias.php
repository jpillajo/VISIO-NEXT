<?php
require('C:/xampp/htdocs/VISIO-NEXT/INCLUDES/FUNCIONES/db_conexion.php');
$input = $_POST['canton'];
$query = "SELECT nombre_parroquia, tbl_parroquia.id_parroquia AS parroquia_id
		FROM public.tbl_sai, public.tbl_parroquia,
		public.tbl_canton, public.tbl_provincia
		WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
		AND tbl_canton.id_canton = tbl_parroquia.id_canton
		AND tbl_provincia.id_provincia = tbl_canton.id_provincia
		AND tbl_canton.id_canton = '" . $input . "'
		GROUP BY parroquia_id, nombre_parroquia
		ORDER BY parroquia_id, nombre_parroquia ASC;";
$result = pg_query($conn, $query);
echo '<option disabled selected hidden>Ej. Tumbaco</option>';
while ($parroquia = pg_fetch_assoc($result)) {
	echo '<option value="' . $parroquia['parroquia_id'] . '">' . $parroquia['nombre_parroquia'] . '</option>';
}
pg_close($conn);
?>
