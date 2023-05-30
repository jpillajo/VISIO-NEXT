//CONSTANTES
let xhr = new XMLHttpRequest();
let xhr1 = new XMLHttpRequest();
let xhr2 = new XMLHttpRequest();

const consultaMesesSAI = {
  id_mes: [],
  mes: [],
};

const consultaAniosSAI = {
  anio: [],
};

let respObtenerMes;
let respObtenerAnio;

function obtenerMes(id_mes) {
  respObtenerMes = id_mes.value;
  return respObtenerMes;
}

function obtenerAnio(id_anio) {
  respObtenerAnio = id_anio.value;
  return respObtenerAnio;
}

function obtenerConsultaProvinciasSAI() {
  const datos_fe = new FormData();
  datos_fe.append("flag", "barrasProvinciasSAI");
  datos_fe.append("id_mes", respObtenerMes);
  datos_fe.append("id_anio", respObtenerAnio);

  xhr.open("POST", "INCLUDES/FUNCIONES/logica_data.php", true);
  xhr.onload = function () {
    if (this.status == 200) {
      LoadConsultaProvinciasSAI(JSON.parse(xhr.responseText)); //capturo los datos del back-end para el front-end
    }
  };
  xhr.send(datos_fe);
  document.getElementById("myChart").remove(); //canvas
  div = document.querySelector("#contenedorChart"); //canvas parent element
  div.insertAdjacentHTML(
    "afterbegin",
    '<canvas class="my-4 w-100" id="myChart" width="900" height="300"></canvas>'
  ); //adding the canvas again
}

function LoadConsultaProvinciasSAI(datos) {
  const consultaProvinciasSAI = {
    provincia: [],
    sum_sai: [],
  };
  datos.forEach((element) => {
    consultaProvinciasSAI.provincia.push(element.nombre_provincia);
    consultaProvinciasSAI.sum_sai.push(element.sai);
  });
  const data = {
    labels: consultaProvinciasSAI.provincia,
    datasets: [
      {
        label: "SAI-POBLACIÓN",
        data: consultaProvinciasSAI.sum_sai,
        backgroundColor: ["rgb(0,128,255)"],
        borderColor: ["rgb(54, 162, 235)"],
        borderWidth: 1,
        datalabels: {
          color: "black",
          font: {
            weight: "bold",
            size: 12,
          },
          anchor: "end",
          align: "top",
          offset: 5,
        },
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    plugins: [ChartDataLabels],
    options: {
      scales: {
        x: {
          title: {
            color: "black",
            display: true,
            text: "PROVINCIAS",
            font: {
              weight: "bold",
              size: 20,
            },
          },
        },
        y: {
          beginAtZero: true,
          title: {
            color: "black",
            display: true,
            text: "HABITANTES",
            font: {
              weight: "bold",
              size: 20,
            },
          },
        },
      },
    },
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
}

/* CARGAR MESES EN SELECT */
function obtenerMesSAI() {
  xhr1.open("POST", "INCLUDES/FUNCIONES/logica_data.php", true);
  xhr1.onload = function () {
    if (this.status == 200) {
      LoadConsultaMesSAI(JSON.parse(xhr1.responseText)); //capturo los datos del back-end para el front-end
    }
  };
  let opcion = new FormData();
  opcion.append("flag", "getMesSAI");
  xhr1.send(opcion);
}

function LoadConsultaMesSAI(datos) {
  datos.forEach((element) => {
    consultaMesesSAI.id_mes.push(element.id_mes);
    consultaMesesSAI.mes.push(element.nombre_mes);
  });
  document.getElementById("lblMes").innerHTML = cargarMeses();
}

function cargarMeses() {
  let texto = "<option disabled selected hidden>Ej. Enero</option>";
  for (var i = 0; i < consultaMesesSAI.mes.length; i++) {
    texto += `<option value="${consultaMesesSAI.id_mes[i]}">${consultaMesesSAI.mes[i]}</option>`;
  }
  return texto;
}

/* CARGAR AÑOS EN SELECT */
function obtenerAnioSAI() {
  xhr2.open("POST", "INCLUDES/FUNCIONES/logica_data.php", true);
  xhr2.onload = function () {
    if (this.status == 200) {
      LoadConsultaAnioSAI(JSON.parse(xhr2.responseText)); //capturo los datos del back-end para el front-end
    }
  };
  let opcion = new FormData();
  opcion.append("flag", "getAnioSAI");
  xhr2.send(opcion);
}

function LoadConsultaAnioSAI(datos) {
  datos.forEach((element) => {
    consultaAniosSAI.anio.push(element.anio_sai);
  });
  document.getElementById("lblAnio").innerHTML = cargarAnios();
}

function cargarAnios() {
  let texto = "<option disabled selected hidden>Ej. 2020</option>";
  for (var i = 0; i < consultaAniosSAI.anio.length; i++) {
    texto += `<option value="${consultaAniosSAI.anio[i]}">${consultaAniosSAI.anio[i]}</option>`;
  }
  return texto;
}

//EVENTOS
obtenerMesSAI();
obtenerAnioSAI();
