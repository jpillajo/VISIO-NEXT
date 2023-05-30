//VARIABLES
const tabla_cantonSAI = {
  encabezado: ["PROVINCIA", "CANTON", "SAI TOTAL"],
};

//FUNCIONES
function cargarTablaCantonesSAI() {
  for (var i = 0; i < tabla_cantonSAI.encabezado.length; i++) {
    document.getElementById(
      "tabla_cantonSAI"
    ).innerHTML += `<th scope="col">${tabla_cantonSAI.encabezado[i]}</th>`;
  }
}

//EVENTO
cargarTablaCantonesSAI();
