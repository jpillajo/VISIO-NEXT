//CONSTANTES
let xhr = new XMLHttpRequest();

//FUNCIONES
function actualizarGrafico() {
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
        backgroundColor: ["rgb(0,128,255)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
        borderWidth: 1,
        datalabels: {
          color: "white",
          labels: {
            title: {
              font: {
                weight: "bold",
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
        },
      },
    },
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
  let texto = "";
  for (var i = 0; i < consultaCantonesSAI.provincia.length; i++) {
    texto += `
        <tr>
        <td>${consultaCantonesSAI.provincia[i]}</td>
        <td>${consultaCantonesSAI.canton[i]}</td>
        <td>${consultaCantonesSAI.sum_sai[i]}</td>
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
    success: function (r) {
      $("#lblProvincias").html(r);
    },
  });
}
