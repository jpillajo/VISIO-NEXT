//CONSTANTES
let xhr =  new XMLHttpRequest();

//FUNCIONES
function actualizarGrafico() {
    xhr.open('POST', 'INCLUDES/FUNCIONES/logica_data.php', true);
    xhr.onload = function(){
        if(this.status==200){
            LoadConsultaParroquiasSMA(JSON.parse(xhr.responseText));
        }
    }
    let opcion = new FormData();
    opcion.append('flag', 'doughnutParroquiasSMA');
    xhr.send(opcion);

    //document.getElementById("myChart").remove(); //canvas
    //div = document.querySelector("#contenedorChart"); //canvas parent element
    //div.insertAdjacentHTML("afterbegin", '<canvas class="my-4 w-100" id="myChart" width="900" height="300"></canvas>'); //adding the canvas again
}

function LoadConsultaParroquiasSMA(datos){
    const consultaParroquiasSMA = {
        //provincia: [],
        con_sma: [],
        sin_sma: []
    }
    console.table(datos);
    datos.forEach(element => {
        consultaParroquiasSMA.con_sma.push(element.sin_sma);
        consultaParroquiasSMA.sin_sma.push(element.con_sma);
    });

    const data = {
        labels: ['Parroquias sin SMA','Parroquias con SMA'],
        datasets: [{
            label: ['Parroquias sin SMA','Parroquias con SMA'],
            data: [consultaParroquiasSMA.sin_sma,consultaParroquiasSMA.con_sma],
            backgroundColor: [
                'rgb(0,128,255)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 4,
            borderWidth: 1,
            datalabels: {
                color: 'white',
                labels: {
                    title: {
                      font: {
                        weight: 'bold'
                      }
                    // },
                    // value: {
                    //   color: 'red'
                    }
                }
                //anchor: 'center',
                //align: 'top',
                //offset: 5
            }
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
        plugins: [ChartDataLabels],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Servicio Móvil Avanzado'
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

//EVENTOS
$(document).ready(function(){
    recargarProvincias();
});
function recargarProvincias() {
    $.ajax({
        type: "POST",
        url: "provincias.php",
        //data: "provincia=" + $('#lblProvincias').val(),
        success: function(r) {
            $('#lblProvincias').html(r);
        }
    });
}