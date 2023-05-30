//VARIABLES
const tabla_provinciaSAI = {
  encabezado: ["PROVINCIA", "SAI TOTAL"],
};

//FUNCIONES
function cargarTablaProvinciasSAI() {
  for (var i = 0; i < tabla_provinciaSAI.encabezado.length; i++) {
    document.getElementById(
      "tabla_provinciaSAI"
    ).innerHTML += `<th scope="col">${tabla_provinciaSAI.encabezado[i]}</th>`;
  }
}

//EVENTO
cargarTablaProvinciasSAI();
