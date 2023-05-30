<?php
    function cargarMesSAI() {
        try {
            //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
            require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
            $query = "SELECT DISTINCT tbl_sai.id_mes AS id_mes, nombre_mes FROM tbl_sai, tbl_mes WHERE tbl_sai.id_mes = tbl_mes.id_mes ORDER BY tbl_sai.id_mes ASC;";
            $result = pg_query($conn, $query);
            pg_close($conn);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $mesesSAI = array();
        while ($mes = pg_fetch_assoc($result)) {
            $mesesSAI[] = $mes;
        }
        return $mesesSAI;
    }

    function cargarAnioSAI() {
        try {
            //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
            require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
            $query = "SELECT DISTINCT anio_sai FROM tbl_sai;";
            $result = pg_query($conn, $query);
            pg_close($conn);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $yearsSAI = array();
        while ($year = pg_fetch_assoc($result)) {
            $yearsSAI[] = $year;
        }
        return $yearsSAI;
    }

    function cargarProvinciaSAI($id_mes,$id_anio) {
        try {
            //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
            require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
            $query = "SELECT nombre_provincia, SUM(sai_total) AS sai 
            FROM public.tbl_sai, public.tbl_parroquia,
            public.tbl_canton, public.tbl_provincia
            WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
            AND tbl_canton.id_canton = tbl_parroquia.id_canton
            AND tbl_provincia.id_provincia = tbl_canton.id_provincia
            AND id_mes = ".$id_mes." AND anio_sai = ".$id_anio."
            GROUP BY nombre_provincia ORDER BY nombre_provincia ASC;";
            $result = pg_query($conn, $query);
            pg_close($conn);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $provinciasSAI = array();
        while ($provincia = pg_fetch_assoc($result)) {
            $provinciasSAI[] = $provincia;
        }
        return $provinciasSAI;
    };

    function cargarCantonSAI($id_provincia,$id_mes,$id_anio){
        try {
            require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
            $query = "SELECT nombre_provincia, nombre_canton, SUM(sai_total) AS sai
            FROM public.tbl_sai, public.tbl_parroquia,
            public.tbl_canton, public.tbl_provincia
            WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
            AND tbl_canton.id_canton = tbl_parroquia.id_canton
            AND tbl_provincia.id_provincia = tbl_canton.id_provincia
            AND tbl_provincia.id_provincia = '".$id_provincia."'
            AND id_mes = '".$id_mes."' AND anio_sai = ".$id_anio."
            GROUP BY nombre_provincia, nombre_canton
            ORDER BY nombre_provincia, nombre_canton ASC;";
            $result = pg_query($conn, $query);
            pg_close($conn);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $cantonesSAI = array();
        while ($canton = pg_fetch_assoc($result)) {
            $cantonesSAI[] = $canton;
        }
        return $cantonesSAI;
    };

    // function cargarParroquiasSAI($id_provincia,$id_canton) {
    //     try {
    //         //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
    //         require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
    //         $query = "SELECT nombre_provincia, nombre_canton, nombre_parroquia, sai_total AS sai 
    //         FROM public.tbl_sai, public.tbl_parroquia,
    //         public.tbl_canton, public.tbl_provincia
    //         WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
    //         AND tbl_canton.id_canton = tbl_parroquia.id_canton
    //         AND tbl_provincia.id_provincia = tbl_canton.id_provincia
    //         AND tbl_provincia.id_provincia = ".$id_provincia."
    //         AND tbl_canton.id_canton = ".$id_canton."
    //         AND mes_sai = 'Diciembre' AND anio_sai = 2021
    //         GROUP BY nombre_provincia, nombre_canton, nombre_parroquia, sai_total
    //         ORDER BY nombre_provincia, nombre_canton, nombre_parroquia ASC;";
    //         $result = pg_query($conn, $query);
    //         pg_close($conn);
    //     } catch (Exception $e) {
    //         echo $e->getMessage();
    //     }
    //     $parroquiaSAI = array();
    //     while ($parroquia = pg_fetch_assoc($result)) {
    //         $parroquiaSAI[] = $parroquia;
    //     }
    //     return $parroquiaSAI;
    //     //$result = null;
    // };
    // function cargarParroquiasSAI($id_provincia,$id_canton,$categoria_parroquia) {
    //     try {
    //         //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
    //         require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
    //         $query = "SELECT nombre_provincia, nombre_canton, nombre_parroquia, sai_total AS sai 
    //         FROM public.tbl_sai, public.tbl_parroquia,
    //         public.tbl_canton, public.tbl_provincia
    //         WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
    //         AND tbl_canton.id_canton = tbl_parroquia.id_canton
    //         AND tbl_provincia.id_provincia = tbl_canton.id_provincia
    //         AND tbl_provincia.id_provincia = ".$id_provincia."
    //         AND tbl_canton.id_canton = ".$id_canton."
	// 		AND tbl_parroquia.categoria = '".$categoria_parroquia."'
    //         AND mes_sai = 'Diciembre' AND anio_sai = 2021
    //         GROUP BY nombre_provincia, nombre_canton, nombre_parroquia, sai_total
    //         ORDER BY nombre_provincia, nombre_canton, nombre_parroquia ASC;";

    //         // $query = "SELECT nombre_provincia, nombre_canton, nombre_parroquia, sai_total AS sai 
    //         // FROM public.tbl_sai, public.tbl_parroquia,
    //         // public.tbl_canton, public.tbl_provincia
    //         // WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
    //         // AND tbl_canton.id_canton = tbl_parroquia.id_canton
    //         // AND tbl_provincia.id_provincia = tbl_canton.id_provincia
    //         // AND tbl_provincia.id_provincia = ".$id_provincia."
    //         // AND tbl_canton.id_canton = ".$id_canton."
    //         // AND mes_sai = 'Diciembre' AND anio_sai = 2021
    //         // GROUP BY nombre_provincia, nombre_canton, nombre_parroquia, sai_total
    //         // ORDER BY nombre_provincia, nombre_canton, nombre_parroquia ASC;";
    //         $result = pg_query($conn, $query);
    //         pg_close($conn);
    //     } catch (Exception $e) {
    //         echo $e->getMessage();
    //     }
    //     $parroquiaSAI = array();
    //     while ($parroquia = pg_fetch_assoc($result)) {
    //         $parroquiaSAI[] = $parroquia;
    //     }
    //     return $parroquiaSAI;
    //     //$result = null;
    // };
    function cargarParroquiasSAI($id_provincia,$id_canton,$categoria_parroquia,$id_mes,$id_anio) {
        try {
            //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
            require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
            $query = "SELECT nombre_provincia, nombre_canton, nombre_parroquia, sai_total AS sai 
            FROM public.tbl_sai, public.tbl_parroquia,
            public.tbl_canton, public.tbl_provincia
            WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
            AND tbl_canton.id_canton = tbl_parroquia.id_canton
            AND tbl_provincia.id_provincia = tbl_canton.id_provincia
            AND tbl_provincia.id_provincia = '".$id_provincia."'
            AND tbl_canton.id_canton = '".$id_canton."'
			AND tbl_parroquia.categoria = '".$categoria_parroquia."'
            AND id_mes = '".$id_mes."' AND anio_sai = ".$id_anio."
            GROUP BY nombre_provincia, nombre_canton, nombre_parroquia, sai_total
            ORDER BY nombre_provincia, nombre_canton, nombre_parroquia ASC;";
            $result = pg_query($conn, $query);
            pg_close($conn);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $parroquiaSAI = array();
        while ($parroquia = pg_fetch_assoc($result)) {
            $parroquiaSAI[] = $parroquia;
        }
        return $parroquiaSAI;
    };

    function cargarParroquiaEspecificaSAI($id_provincia,$id_canton,$id_parroquia, $id_anio) {
        try {
            //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
            require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
            $query = "SELECT nombre_provincia, nombre_canton, nombre_parroquia, categoria, tbl_sai.id_mes AS mes_id, nombre_mes, sai_total AS sai 
                    FROM public.tbl_sai, public.tbl_parroquia,
                    public.tbl_canton, public.tbl_provincia,
                    public.tbl_mes
                    WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
                    AND tbl_canton.id_canton = tbl_parroquia.id_canton
                    AND tbl_provincia.id_provincia = tbl_canton.id_provincia
                    AND tbl_mes.id_mes = tbl_sai.id_mes
                    AND tbl_provincia.id_provincia = '".$id_provincia."'
                    AND tbl_canton.id_canton = '".$id_canton."'
                    AND tbl_parroquia.id_parroquia = '".$id_parroquia."'
                    AND anio_sai = ".$id_anio."
                    GROUP BY nombre_provincia, nombre_canton, nombre_parroquia, categoria, mes_id, nombre_mes, sai_total
                    ORDER BY nombre_provincia, nombre_canton,nombre_parroquia ASC;";
            // $query = "SELECT nombre_provincia, nombre_canton, nombre_parroquia, categoria, mes_sai, sai_total AS sai 
            // FROM public.tbl_sai, public.tbl_parroquia,
            // public.tbl_canton, public.tbl_provincia
            // WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
            // AND tbl_canton.id_canton = tbl_parroquia.id_canton
            // AND tbl_provincia.id_provincia = tbl_canton.id_provincia
            // AND tbl_provincia.id_provincia = '".$id_provincia."'
            // AND tbl_canton.id_canton = '".$id_canton."'
            // AND tbl_parroquia.id_parroquia = '".$id_parroquia."'
            // AND anio_sai = ".$id_anio."
            // GROUP BY nombre_provincia, nombre_canton, nombre_parroquia, categoria, mes_sai, sai_total
            // ORDER BY nombre_provincia, nombre_canton,nombre_parroquia ASC;";
            $result = pg_query($conn, $query);
            pg_close($conn);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $parroquiaSAI = array();
        while ($parroquia = pg_fetch_assoc($result)) {
            $parroquiaSAI[] = $parroquia;
        }
        return $parroquiaSAI;
    };
    // function cargarParroquiaEspecificaSAI($id_provincia,$id_canton,$id_parroquia) {
    //     try {
    //         //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
    //         require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
    //         $query = "SELECT nombre_provincia, nombre_canton, nombre_parroquia, sai_total AS sai 
    //         FROM public.tbl_sai, public.tbl_parroquia,
    //         public.tbl_canton, public.tbl_provincia
    //         WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia
    //         AND tbl_canton.id_canton = tbl_parroquia.id_canton
    //         AND tbl_provincia.id_provincia = tbl_canton.id_provincia
    //         AND tbl_provincia.id_provincia = '".$id_provincia."'
    //         AND tbl_canton.id_canton = '".$id_canton."'
    //         AND tbl_parroquia.id_parroquia = '".$id_parroquia."'
    //         AND mes_sai = 'Diciembre' AND anio_sai = 2021
    //         GROUP BY nombre_provincia, nombre_canton, nombre_parroquia, sai_total
    //         ORDER BY nombre_provincia, nombre_canton,nombre_parroquia ASC;";
    //         $result = pg_query($conn, $query);
    //         pg_close($conn);
    //     } catch (Exception $e) {
    //         echo $e->getMessage();
    //     }
    //     $parroquiaSAI = array();
    //     while ($parroquia = pg_fetch_assoc($result)) {
    //         $parroquiaSAI[] = $parroquia;
    //     }
    //     return $parroquiaSAI;
    // };
    
    function cargarProvinciaSMA($id_provincia){
        try {
            //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
            require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
            $query = "SELECT nombre_provincia, ROUND(cobertura_2g_3g::numeric*100, 2) AS cobertura_2g_3g, ROUND(cobertura_4g::numeric*100, 2) AS cobertura_4g
            FROM tbl_sma_porcentaje, tbl_provincia
            WHERE tbl_provincia.id_provincia = tbl_sma_porcentaje.id_provincia
            AND tbl_provincia.id_provincia = '".$id_provincia."';";
            $result = pg_query($conn, $query);
            pg_close($conn);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $provinciasSMA = array();
        while ($provincia = pg_fetch_assoc($result)) {
            $provinciasSMA[] = $provincia;
        }
        return $provinciasSMA;
    };

    function cargarParroquiasSMA(){
        try {
            //require_once(dirname(__DIR__).'/INCLUDES/FUNCIONES/db_conexion.php');
            require('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/db_conexion.php');
            $query = "SELECT COUNT(*) AS sin_sma, 1046-COUNT(*) AS con_sma  FROM tbl_sma WHERE tbl_sma.sma = false;";
            $result = pg_query($conn, $query);
            pg_close($conn);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $parroquiasSMA = array();
        while ($parroquia = pg_fetch_assoc($result)) {
            $parroquiasSMA[] = $parroquia;
        }
        return $parroquiasSMA;
    };
?>