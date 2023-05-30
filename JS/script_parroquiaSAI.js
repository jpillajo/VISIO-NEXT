//VARIABLES
const tabla_parroquiaSAI = {
    //encabezado: ['PROVINCIA','CANTÓN','SAI TOTAL']
    encabezado: ['PROVINCIA','CANTON','PARROQUIA','SAI TOTAL']
};

//FUNCIONES
function cargarTablaParroquiaSAI() {
    for (var i = 0; i < tabla_parroquiaSAI.encabezado.length; i++) {
        document.getElementById('tabla_parroquiaSAI').innerHTML+=`<th scope="col">${tabla_parroquiaSAI.encabezado[i]}</th>`
    }
};

//EVENTO
cargarTablaParroquiaSAI();