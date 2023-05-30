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
let respObtenerCanton;
let respObtenerParroquia;
let respObtenerParroquiaUoR;

function obtenerMes(id_mes) {
    console.log(id_mes.options[id_mes.selectedIndex].text)
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
function obtenerCantones(id_canton) {
    respObtenerCanton = id_canton.value;
    return respObtenerCanton;
}
function obtenerParroquia(id_parroquia) {
    respObtenerParroquia = id_parroquia.value;
    return respObtenerParroquia;
}
// function obtenerParroquiaUoR(id_parroquia_UoR) {
//     respObtenerParroquiaUoR = id_parroquia_UoR.value;
//     return respObtenerParroquiaUoR;
// }

//FUNCIONES
// function actualizarGrafico(id_parroquia) {
//     console.log(respObtenerProvincia);
//     console.log(respObtenerCanton);
//     console.log(id_parroquia.value)
//     const datos_fe=new FormData();
//     datos_fe.append('flag', 'barrasParroquiasSAI');
//     datos_fe.append('id_provincia', respObtenerProvincia);
//     datos_fe.append('id_canton', respObtenerCanton);
//     datos_fe.append('id_parroquia', id_parroquia.value);

//     xhr.open('POST', 'INCLUDES/FUNCIONES/logica_data.php', true);
//     xhr.onload = function(){
//         if(this.status==200){
//             LoadConsultaParroquiasSAI(JSON.parse(xhr.responseText));
//         }
//     }
//     xhr.send(datos_fe);
//     document.getElementById("myChart").remove(); //canvas
//     div = document.querySelector("#contenedorChart"); //canvas parent element
//     div.insertAdjacentHTML("afterbegin", '<canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>'); //adding the canvas again
// }
// function actualizarGrafico(id_parroquia) {
//     console.log(respObtenerProvincia);
//     console.log(id_parroquia.value)
//     const datos_fe=new FormData();
//     datos_fe.append('flag', 'obtenerParroquias');
//     datos_fe.append('id_provincia', respObtenerProvincia);
//     datos_fe.append('id_canton', id_parroquia.value);

//     xhr.open('POST', 'INCLUDES/FUNCIONES/logica_data.php', true);
//     xhr.onload = function(){
//         if(this.status==200){
//             LoadConsultaParroquiasSAI(JSON.parse(xhr.responseText));
//         }
//     }
//     xhr.send(datos_fe);
//     document.getElementById("myChart").remove(); //canvas
//     div = document.querySelector("#contenedorChart"); //canvas parent element
//     div.insertAdjacentHTML("afterbegin", '<canvas class="my-4 w-100" id="myChart" width="900" height="300"></canvas>'); //adding the canvas again
// }
// function actualizarGrafico(id_parroquia) {
//     console.log(respObtenerProvincia);
//     console.log(respObtenerCanton);
//     console.log(id_parroquia.value);
//     const datos_fe=new FormData();
//     datos_fe.append('flag', 'obtenerParroquias');
//     datos_fe.append('id_provincia', respObtenerProvincia);
//     datos_fe.append('id_canton', respObtenerCanton);
//     datos_fe.append('categoria_parroquia', id_parroquia.value);

//     xhr.open('POST', 'INCLUDES/FUNCIONES/logica_data.php', true);
//     xhr.onload = function(){
//         if(this.status==200){
//             LoadConsultaParroquiasSAI(JSON.parse(xhr.responseText));
//         }
//     }
//     xhr.send(datos_fe);
//     document.getElementById("myChart").remove(); //canvas
//     div = document.querySelector("#contenedorChart"); //canvas parent element
//     div.insertAdjacentHTML("afterbegin", '<canvas class="my-4 w-100" id="myChart" width="900" height="300"></canvas>'); //adding the canvas again
// }
function actualizarGrafico() {
    const datos_fe=new FormData();
    datos_fe.append('flag', 'barrasParroquiasSAI');
    datos_fe.append('id_provincia', respObtenerProvincia);
    datos_fe.append('id_canton', respObtenerCanton);
    datos_fe.append('id_parroquia', respObtenerParroquia);
    datos_fe.append('id_anio', respObtenerAnio);

    xhr.open('POST', 'INCLUDES/FUNCIONES/logica_data.php', true);
    xhr.onload = function(){
        if(this.status==200){
            LoadConsultaParroquiasSAI(JSON.parse(xhr.responseText));
        }
    }
    xhr.send(datos_fe);
    document.getElementById("myChart").remove(); //canvas
    div = document.querySelector("#contenedorChart"); //canvas parent element
    div.insertAdjacentHTML("afterbegin", '<canvas class="my-4 w-100" id="myChart" width="900" height="300"></canvas>'); //adding the canvas again
}
function LoadConsultaParroquiasSAI(datos){
    const consultaParroquiasSAI = {
        provincia: [],
        canton: [],
        parroquia: [],
        categoria: [],
        mes_sai: [],
        sum_sai: []
    }
    console.table(datos);
    datos.forEach(element => {
        consultaParroquiasSAI.provincia.push(element.nombre_provincia);
        consultaParroquiasSAI.canton.push(element.nombre_canton);
        consultaParroquiasSAI.parroquia.push(element.nombre_parroquia);
        if (element.categoria == "U") {
            cat = "URBANA"
        } else {
            cat = "RURAL"
        }
        consultaParroquiasSAI.categoria.push(cat);
        consultaParroquiasSAI.mes_sai.push(element.nombre_mes);
        consultaParroquiasSAI.sum_sai.push(element.sai);
    });
    console.table(consultaParroquiasSAI);
    const data = {
        labels: consultaParroquiasSAI.mes_sai,
        datasets: [{
            label: 'SAI-POBLACIÓN',
            data: consultaParroquiasSAI.sum_sai,
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
                        text: 'PARROQUIA '+consultaParroquiasSAI.categoria[0],
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
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: consultaParroquiasSAI.parroquia[0],
                    font: {
                        weight: 'bold',
                        size: 20
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
    for(var i=0; i< consultaParroquiasSAI.provincia.length; i++){
        texto+=  `
        <tr>
        <td>${consultaParroquiasSAI.provincia[i]}</td>
        <td>${consultaParroquiasSAI.canton[i]}</td>
        <td>${consultaParroquiasSAI.parroquia[i]}</td>
        <td>${consultaParroquiasSAI.sum_sai[i]}</td>
        </tr>
        `;
    };
    //document.getElementById("contenido_tablaParroquiaSAI").innerHTML=texto;
};
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
    datos.forEach(element => {
        consultaMesesSAI.id_mes.push(element.id_mes);
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
    recargarCantones();
    recargarParroquias();
    obtenerAnioSAI();
    $('#lblProvincias').change(function() {
        recargarCantones();
        recargarParroquias();
    });
    $('#lblCantones').change(function() {
        recargarParroquias();
    });
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
function recargarCantones() {
    $.ajax({
        type: "POST",
        url: "cantones.php",
        data: "provincia=" + $('#lblProvincias').val(),
        success: function(r) {
            $('#lblCantones').html(r);
        }
    });
}
function recargarParroquias() {
    $.ajax({
        type: "POST",
        url: "parroquias.php",
        data: "canton=" + $('#lblCantones').val(),
        success: function(r) {
            $('#lblParroquias').html(r);
        }
    });
}