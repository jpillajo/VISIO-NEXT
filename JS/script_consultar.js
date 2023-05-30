$(document).ready(function () {
  recargarCantones();
  $("#lblProvincias").change(function () {
    recargarCantones();
  });
});

function recargarCantones() {
  $.ajax({
    type: "POST",
    url: "../cantones.php",
    data: "provincia=" + $("#lblProvincias").val(),
    success: function (r) {
      $("#lblCantones").html(r);
    },
  });
}

function recargarParroquias() {
  $.ajax({
    type: "POST",
    url: "../parroquias.php",
    data: "canton=" + $("#lblCantones").val(),
    success: function (r) {
      $("#lblParroquias").html(r);
    },
  });
}
