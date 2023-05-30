//CONSTANTES
let xhr = new XMLHttpRequest();

//FUNCIONES
function actualizarGrafico(id_provincia) {
  const datos_fe = new FormData();
  datos_fe.append("flag", "doughnutProvinciasSMA");
  datos_fe.append("id_provincia", id_provincia.value);

  xhr.open("POST", "INCLUDES/FUNCIONES/logica_data.php", true);
  xhr.onload = function () {
    if (this.status == 200) {
      LoadConsultaProvinciasSMA(JSON.parse(xhr.responseText));
    }
  };
  xhr.send(datos_fe);
  document.getElementById("myChart").remove(); //canvas
  div = document.querySelector("#contenedorChart"); //canvas parent element
  div.insertAdjacentHTML(
    "afterbegin",
    '<canvas class="my-4 w-100 h-10" id="myChart"></canvas>'
  ); //adding the canvas again
}

function LoadConsultaProvinciasSMA(datos) {
  const consultaProvinciasSMA = {
    provincia: [],
    c_2g_3g: [],
    c_4g: [],
  };
  console.table(datos);
  datos.forEach((element) => {
    consultaProvinciasSMA.provincia.push(element.nombre_provincia);
    consultaProvinciasSMA.c_2g_3g.push(element.cobertura_2g_3g);
    consultaProvinciasSMA.c_4g.push(element.cobertura_4g);
  });

  const data = {
    labels: ["Cobertura 2G y 3G", "Cobertura 4G"],
    datasets: [
      {
        label: ["Cobertura 2G y 3G", "Cobertura 4G"],
        data: [consultaProvinciasSMA.c_2g_3g, consultaProvinciasSMA.c_4g],
        backgroundColor: ["rgb(255,195,0)", "rgb(255,87,51)"],
        hoverOffset: 4,
        borderWidth: 1,
        datalabels: {
          color: "white",
          formatter: function (value) {
            return value + "%";
          },
          labels: {
            title: {
              font: {
                weight: "bold",
                size: 16,
              },
            },
          },
        },
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    plugins: [ChartDataLabels],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: consultaProvinciasSMA.provincia,
          font: {
            weight: "bold",
            size: 20,
          },
        },
      },
    },
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
  let texto = "";
  for (var i = 0; i < consultaProvinciasSMA.provincia.length; i++) {
    texto += `
        <tr>
        <td>${consultaProvinciasSMA.provincia[i]}</td>
        <td>${consultaProvinciasSMA.c_2g_3g[i]}</td>
        <td>${consultaProvinciasSMA.c_4g[i]}</td>
        </tr>
        `;
  }
}

function obtenerConsultaParroquiasSMA() {
  xhr.open("POST", "INCLUDES/FUNCIONES/logica_data.php", true);
  xhr.onload = function () {
    if (this.status == 200) {
      LoadConsultaParroquiasSMA(JSON.parse(xhr.responseText));
    }
  };
  let opcion = new FormData();
  opcion.append("flag", "doughnutParroquiasSMA");
  xhr.send(opcion);
}

function LoadConsultaParroquiasSMA(datos) {
  const consultaParroquiasSMA = {
    con_sma: [],
    sin_sma: [],
  };
  console.table(datos);
  datos.forEach((element) => {
    consultaParroquiasSMA.con_sma.push(element.sin_sma);
    consultaParroquiasSMA.sin_sma.push(element.con_sma);
  });

  const data = {
    labels: ["Parroquias sin SMA", "Parroquias con SMA"],
    datasets: [
      {
        label: ["Parroquias sin SMA", "Parroquias con SMA"],
        data: [consultaParroquiasSMA.sin_sma, consultaParroquiasSMA.con_sma],
        backgroundColor: ["rgb(0,128,255)", "rgb(255, 99, 132)"],
        hoverOffset: 4,
        borderWidth: 1,
        datalabels: {
          color: "white",
          labels: {
            title: {
              font: {
                weight: "bold",
                size: 16,
              },
            },
          },
        },
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
    plugins: [ChartDataLabels],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Servicio Móvil Avanzado",
          font: {
            weight: "bold",
            size: 20,
          },
        },
      },
    },
  };
  const myChart = new Chart(document.getElementById("myChart2"), config);
  let texto = "";
  for (var i = 0; i < consultaParroquiasSMA.con_sma.length; i++) {
    texto += `
        <tr>
        <td>${consultaParroquiasSMA.con_sma[i]}</td>
        <td>${consultaParroquiasSMA.sin_sma[i]}</td>
        </tr>
        `;
  }
}

//EVENTOS
$(document).ready(function () {
  recargarProvincias();
});
function recargarProvincias() {
  $.ajax({
    type: "POST",
    url: "provincias.php",
    data:
      "provincia=" +
      "SELECT tbl_provincia.id_provincia AS provincia_id, nombre_provincia, ROUND(cobertura_2g_3g::numeric*100, 2) AS cobertura_2g_3g, ROUND(cobertura_4g::numeric*100, 2) AS cobertura_4g FROM tbl_sma_porcentaje, tbl_provincia WHERE tbl_provincia.id_provincia = tbl_sma_porcentaje.id_provincia;",
    success: function (r) {
      $("#lblProvincias").html(r);
    },
  });
}

//EVENTOS
obtenerConsultaParroquiasSMA();
