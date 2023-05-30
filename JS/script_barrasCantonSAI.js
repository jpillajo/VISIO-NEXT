//CONSTANTES
let xhr =  new XMLHttpRequest();
let xhr1 =  new XMLHttpRequest();
let xhr2 =  new XMLHttpRequest();

const consultaMesesSAI = {
    id_mes: [],
    mes: []
}
const consultaAniosSAI = {
    anio: []
}
let respObtenerMes;
let respObtenerAnio;
let respObtenerProvincia;

function obtenerMes(id_mes) {
    respObtenerMes = id_mes.value;
    return respObtenerMes;
}
function obtenerAnio(id_anio) {
    respObtenerAnio = id_anio.value;
    return respObtenerAnio;
}
function obtenerProvincia(id_provincia) {
    respObtenerProvincia = id_provincia.value;
    return respObtenerProvincia;
}
//FUNCIONES
// function actualizarGrafico(id_provincia) {
//     //console.log(id_provincia.value);
//     const datos_fe=new FormData();
//     datos_fe.append('flag', 'barrasCantonesSAI');
//     datos_fe.append('id_provincia', id_provincia.value);

//     xhr.open('POST', 'INCLUDES/FUNCIONES/logica_data.php', true);
//     xhr.onload = function(){
//         if(this.status==200){
//             LoadConsultaCantonesSAI(JSON.parse(xhr.responseText));
//         }
//     }
//     xhr.send(datos_fe);
//     document.getElementById("myChart").remove(); //canvas
//     div = document.querySelector("#contenedorChart"); //canvas parent element
//     div.insertAdjacentHTML("afterbegin", '<canvas class="my-4 w-100" id="myChart" width="900" height="300"></canvas>'); //adding the canvas again
// }
function actualizarGrafico() {
    //console.log(id_provincia.value);
    const datos_fe=new FormData();
    datos_fe.append('flag', 'barrasCantonesSAI');
    datos_fe.append('id_provincia', respObtenerProvincia);
    datos_fe.append('id_mes', respObtenerMes);
    datos_fe.append('id_anio', respObtenerAnio);

    xhr.open('POST', 'INCLUDES/FUNCIONES/logica_data.php', true);
    xhr.onload = function(){
        if(this.status==200){
            LoadConsultaCantonesSAI(JSON.parse(xhr.responseText));
        }
    }
    xhr.send(datos_fe);
    document.getElementById("myChart").remove(); //canvas
    div = document.querySelector("#contenedorChart"); //canvas parent element
    div.insertAdjacentHTML("afterbegin", '<canvas class="my-4 w-100" id="myChart" width="900" height="300"></canvas>'); //adding the canvas again
}

function LoadConsultaCantonesSAI(datos){
    const consultaCantonesSAI = {
        provincia: [],
        canton: [],
        sum_sai: []
    }
    console.table(datos);
    datos.forEach(element => {
        consultaCantonesSAI.provincia.push(element.nombre_provincia);
        consultaCantonesSAI.canton.push(element.nombre_canton);
        consultaCantonesSAI.sum_sai.push(element.sai);
    });

    const data = {
        labels: consultaCantonesSAI.canton,
        datasets: [{
            label: 'SAI-POBLACIÓN',
            data: consultaCantonesSAI.sum_sai,
            backgroundColor: [
                'rgb(0,128,255)'
            ],
            borderColor: [
                'rgb(54, 162, 235)'
                //'rgb(88,130,250)'
            ],
            borderWidth: 1,
            datalabels: {
                color: 'black',
                // formatter: function (value) {
                //     return value + ' habitantes';
                // },
                font: {
                    weight: 'bold',
                    size: 12
                },
                anchor: 'end',
                align: 'top',
                offset: 5
            }
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        plugins: [ChartDataLabels],
        options: {
            scales: {
                x: {
                    title: {
                        color: 'black',
                        display: true,
                        text: 'CANTONES',
                        font: {
                            weight: 'bold',
                            size: 20
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        color: 'black',
                        display: true,
                        text: 'HABITANTES',
                        font: {
                            weight: 'bold',
                            size: 20
                        }
                    }
                }
            }
        }
    };
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    let texto="";
    for(var i=0; i< consultaCantonesSAI.provincia.length; i++){
        texto+=  `
        <tr>
        <td>${consultaCantonesSAI.provincia[i]}</td>
        <td>${consultaCantonesSAI.canton[i]}</td>
        <td>${consultaCantonesSAI.sum_sai[i]}</td>
        </tr>
        `;
    };
    //document.getElementById("contenido_tablaCantonSAI").innerHTML=texto;
}
/* CARGAR MESES EN SELECT */
function obtenerMesSAI() {
    xhr1.open('POST','INCLUDES/FUNCIONES/logica_data.php',true);
    xhr1.onload = function(){
        if(this.status==200){
            LoadConsultaMesSAI(JSON.parse(xhr1.responseText));//capturo los datos del back-end para el front-end
        }
    }
    let opcion = new FormData();
    opcion.append('flag', 'getMesSAI');
    xhr1.send(opcion);
}

function LoadConsultaMesSAI(datos){
    console.table(datos);
    datos.forEach(element => {
        consultaMesesSAI.id_mes.push(element.id_mes);
        consultaMesesSAI.mes.push(element.nombre_mes);
    });
    document.getElementById("lblMes").innerHTML = cargarMeses();
}
function cargarMeses() {
    let texto = "<option disabled selected hidden>Ej. Enero</option>";
    for (var i = 0; i < consultaMesesSAI.mes.length; i++) {
        texto +=`<option value="${consultaMesesSAI.id_mes[i]}">${consultaMesesSAI.mes[i]}</option>`;
    }
    return texto;
}
/* CARGAR AÑOS EN SELECT */
function obtenerAnioSAI() {
    xhr2.open('POST','INCLUDES/FUNCIONES/logica_data.php',true);
    xhr2.onload = function(){
        if(this.status==200){
            LoadConsultaAnioSAI(JSON.parse(xhr2.responseText));//capturo los datos del back-end para el front-end
        }
    }
    let opcion = new FormData();
    opcion.append('flag', 'getAnioSAI');
    xhr2.send(opcion);
}

function LoadConsultaAnioSAI(datos){
    console.table(datos);
    datos.forEach(element => {
        consultaAniosSAI.anio.push(element.anio_sai);
    });
    document.getElementById("lblAnio").innerHTML = cargarAnios();
}
function cargarAnios() {
    let texto = "<option disabled selected hidden>Ej. 2020</option>";
    for (var i = 0; i < consultaAniosSAI.anio.length; i++) {
        texto +=`<option value="${consultaAniosSAI.anio[i]}">${consultaAniosSAI.anio[i]}</option>`;
    }
    return texto;
}
//EVENTOS
$(document).ready(function(){
    recargarProvincias();
    obtenerMesSAI();
    obtenerAnioSAI();
});
function recargarProvincias() {
    $.ajax({
        type: "POST",
        url: "provincias.php",
        data: "provincia=" + "SELECT tbl_provincia.id_provincia AS provincia_id, nombre_provincia, SUM(sai_total) AS sai FROM public.tbl_sai, public.tbl_parroquia, public.tbl_canton, public.tbl_provincia WHERE tbl_parroquia.id_parroquia = tbl_sai.id_parroquia AND tbl_canton.id_canton = tbl_parroquia.id_canton AND tbl_provincia.id_provincia = tbl_canton.id_provincia GROUP BY provincia_id, nombre_provincia ORDER BY provincia_id, nombre_provincia ASC;",
        success: function(r) {
            $('#lblProvincias').html(r);
        }
    });
}