<?php
    include 'C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/consultas.php';

    $flag = $_POST['flag'];

    // if ($flag == 'barrasProvinciasSAI') {
    //     $respuesta = array();
    //     $respuesta = cargarProvinciaSAI();
    //     echo json_encode($respuesta);
    // }
    if ($flag == 'barrasProvinciasSAI') {
        $respuesta = array();
        $respuesta = cargarProvinciaSAI($_POST['id_mes'],$_POST['id_anio']);
        echo json_encode($respuesta);
    }

    if ($flag == 'doughnutProvinciasSMA') {
        $respuesta = array();
        $respuesta = cargarProvinciaSMA($_POST['id_provincia']);
        echo json_encode($respuesta);
    }
    
    if ($flag == 'doughnutParroquiasSMA') {
        $respuesta = array();
        $respuesta = cargarParroquiasSMA();
        echo json_encode($respuesta);
    }

    // if ($flag == 'barrasCantonesSAI') {
    //     $respuesta = array();
    //     $respuesta = cargarCantonSAI($_POST['id_provincia']);
    //     echo json_encode($respuesta);
    // }
    if ($flag == 'barrasCantonesSAI') {
        $respuesta = array();
        $respuesta = cargarCantonSAI($_POST['id_provincia'],$_POST['id_mes'],$_POST['id_anio']);
        echo json_encode($respuesta);
    }

    if ($flag == 'barrasParroquiasSAI') {
        $respuesta = array();
        $respuesta = cargarParroquiaEspecificaSAI($_POST['id_provincia'],$_POST['id_canton'],$_POST['id_parroquia'],$_POST['id_anio']);
        //$respuesta = cargarParroquiaSAI();
        echo json_encode($respuesta);
    }
    /* CARGAR SELECT */
    // if ($flag == 'obtenerCantones') {
    //     $respuesta = array();
    //     $respuesta = cargarCantonSAI($_POST['id_provincia']);
    //     //$respuesta = cargarCantonSAI();
    //     echo json_encode($respuesta);
    // }
    // // if ($flag == 'obtenerParroquias') {
    // //     $respuesta = array();
    // //     $respuesta = cargarParroquiasSAI($_POST['id_provincia'],$_POST['id_canton']);
    // //     //$respuesta = cargarCantonSAI();
    // //     echo json_encode($respuesta);
    // // }
    if ($flag == 'obtenerParroquias') {
        $respuesta = array();
        $respuesta = cargarParroquiasSAI($_POST['id_provincia'],$_POST['id_canton'],$_POST['categoria_parroquia'],$_POST['id_mes'],$_POST['id_anio']);
        echo json_encode($respuesta);
    }
    if ($flag == 'getMesSAI') {
        $respuesta = array();
        $respuesta = cargarMesSAI();
        echo json_encode($respuesta);
    }
    if ($flag == 'getAnioSAI') {
        $respuesta = array();
        $respuesta = cargarAnioSAI();
        echo json_encode($respuesta);
    }
?>