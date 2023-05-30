<!doctype html>
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Dashboard | MXAC</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <!-- Custom styles for this template -->
      <link rel="stylesheet" href="./CSS/styles.css">
      <link href="./CSS/dashboard.css" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script>
  </head>
  <?php
    //require_once(__DIR__. '\INCLUDES\FUNCIONES\consultas.php');
    require_once('C:/xampp/htdocs/MXAC_DASHBOARD/INCLUDES/FUNCIONES/consultas.php');
  ?>
  <body> 
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">DPTAP</a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"> -->
      <!-- <div class="navbar-nav">
        <div class="nav-item text-nowrap">
          <a class="nav-link px-3" href="#">Cerrar sesión</a>
        </div>
      </div> -->
    </header>

    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-2 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="./index.php">
                  <span data-feather="map-pin"></span>
                  Provincia
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./cantonSAI.php">
                  <span data-feather="map-pin"></span>
                  Canton
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./parroquiaSAI.php">
                  <span data-feather="map-pin"></span>
                  Parroquia
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./parroquiaEspecificaSAI.php">
                  <span data-feather="map-pin"></span>
                  Parroquia Específica
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./estadisticaSMA.php">
                  <span data-feather="bar-chart-2"></span>
                  SMA
                </a>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="bar-chart-2"></span>
                  Reportes
                </a>
              </li> -->
            </ul>
          </div>
        </nav>

        <main class="col-md-10 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="row m-auto">
                <div class="col">
                  <label for="lblMes" class="form-label">Seleccione el mes:</label>
                  <select class="form-select" id="lblMes" onchange="obtenerMes(this)">
                  </select>
                </div>
                <div class="col">
                  <label for="lblYear" class="form-label">Seleccione el año:</label>
                  <select class="form-select" id="lblAnio" onchange="obtenerAnio(this)">
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-primary" onclick="obtenerConsultaProvinciasSAI()">Consultar</button>
            </div>
          </div>
          
          <div id="contenedorChart">
            <canvas class="my-4 w-100" id="myChart" width="900" height="300"></canvas>
          </div>
          <!-- <h2>SAI por Provincia</h2>
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr id="tabla_provinciaSAI"></tr>
              </thead>
              <tbody>
                <?php
                  //$provinciasSAI = cargarProvinciaSAI();
                  //foreach ($provinciasSAI as $provincia) {
                    //echo '<tr>';
                    //foreach ($provincia as $columna) {
                        //echo '<td>' . $columna . '</td>';
                    //}
                    //echo '</tr>';
                  //}
                ?>
              </tbody>
            </table>
          </div> -->
        </main>
      </div>
    </div>
  </body>
  <script>
    (function () {
      'use strict'

      feather.replace({ 'aria-hidden': 'true' })
    })()
  </script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
  <!-- <script src="./JS/script_provinciaSAI.js" type="text/javascript"></script> -->
  <script src="./JS/script_barrasProvinciaSAI.js" type="text/javascript"></script>
</html>