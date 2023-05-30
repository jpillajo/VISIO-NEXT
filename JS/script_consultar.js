$(document).ready(function(){
    recargarCantones();
    $('#lblProvincias').change(function() {
        recargarCantones();
        
    });
});
/*function recargarLista() {
    $.ajax({
        type: "POST",
        url: "cantones.php",
        data: "provincia=" + $('#lblProvincias').val(),
        success: function(r) {
            $('#lblCantones').html(r);
        }
    });
}*/
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
/*function cargarCantones(val) {
    //$('#lblCantones').html
    $.ajax({
        type: "POST",
        url: "cantones.php",
        data: "canton="+val,
        success: function (resp) {
            $("#lblCantones").html(resp);
            $("#respuesta").html("");
        }
    });
};*/
/*function mostrarProvincias(str) {
    var xmlhttp;
    if (str == "") {
        document.getElementById("txtHint").innerHTML = "";
        return;
    }
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState ==4 && XMLHttpRequest.status ==20) {
            document.getElementById("lblCantones").innerHTML=xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","cantones.php?canton="+str,true);
	xmlhttp.send();
}*/
/*$(document).ready(function(){
    var cantones = $('#lblCantones');
    var canton_seleccionado = $('#canton_sel');

    $('#lblProvincias').change(function(){
        var provincia_id = $(this).val();

        if (provincia_id !== '') {
            $.ajax({
                data: {provincia_id: provincia_id},
                dataType: 'html',
                type: 'POST',
                url: 'consultas.php'
            }).done(function(data){
                cantones.html(data);
                cantones.prop('disabled',false);
            });
        }
    });

    $('#lblCantones').change(function(){
        $('#canton_sel').html($(this).val()+' - '+$('#lblCantones option:selected').text());
    });
});*/