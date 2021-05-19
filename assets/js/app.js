// Catálogo de nuevos eventos

var eventos = {
    0: {
        titulo: "Evento 1",
        descripcion: "Descripción del evento 1",
        imagenUrl: "../img/cine.jpg",
        precio: 80
    },
    1: {
        titulo: "Evento 2",
        descripcion: "Descripción del evento 2",
        imagenUrl: "../img/teatro.jpg",
        precio: 100
    },
    2: {
        titulo: "Evento 3",
        descripcion: "Descripción del evento 3",
        imagenUrl: "../img/ted.jpg",
        precio: 200
    }
}

window.onload = () => {

    // Ocultamos el inicio de sesión y el cuadro de entradas
    $("#iniciaSesion").hide();
    $("#entradas").hide();
    $("#compraExitosa").hide();
    $("#compraRechazada").hide();
    $("#notificacion").hide();

    // Cargamos el header con un Fade In
    $("#header").hide();
    $("#nuevosEventos").hide();
    setTimeout(() => {
        $("#header").fadeIn("fast");
    }, 500);
    setTimeout(() => {
        $("#nuevosEventos").fadeIn("fast");
    }, 1000);

    // Agregar tarjetas de eventos
    var espacioTarjetas = document.getElementById("tarjetasEventos");
    var tarjetas = ``;
    for (const evento in eventos) {
        tarjetas += `
                    <div class="tarjetaEvento">
                        <img src="assets/img/${eventos[evento].imagenUrl}" class="imagenEventos">
                        <div class="datosEvento">
                            <h3 class="tituloEventos">${eventos[evento].titulo}</h3>
                            <p class="descripcionEventos">${eventos[evento].descripcion}</p>
                            <p class="descripcionEventos">Precio: $${eventos[evento].precio}</p>
                            <button class="btnMorado btnCompraBoletos" onClick="comprar('${eventos[evento].titulo}', '${eventos[evento].precio}')">Comprar boletos</button>
                        </div>
                    </div>
                `;
        espacioTarjetas.innerHTML = tarjetas;
    }

    // Mostrar iniciar sesión
    $("#btnIniciarSesion").click(() => {
        $("#nuevosEventos").hide();
        $("#header").addClass("desenfocado");
        $("#iniciaSesion").fadeIn();
    });

    // Ocultar inicio de sesión
    $("#btnCerrar").click(() => {
        $("#iniciaSesion").fadeOut();
        $("#header").removeClass("desenfocado");
        $("#nuevosEventos").fadeIn();
    });
}

// Acción del botón comprar

// Verificar campos
var estadoTitular = false;
var estadoNumero = false;
var estadoCodigo = false;
var estadoFecha = false;
var estadoCantidad = false;
var cantidadEntradas = 0;


function comprar(titulo, precio) {

    var precioEntradas = Number(precio);

    // Mostrar caja de compra
    $("#titleEvent").text(titulo);
    $("#nuevosEventos").hide();
    $("#header").addClass("desenfocado");
    $("#entradas").fadeIn();
    $("#btnPagar").removeAttr('disabled');

    // Ocultar caja de compra
    $("#btnCerrar2").click(() => {
        $("#entradas").fadeOut();
        $("#header").removeClass("desenfocado");
        $("#nuevosEventos").fadeIn();
        $("#compraExitosa").fadeOut();
        $("#compraRechazada").fadeOut();

        resetForm();
    });



    // Titular de la tarjeta
    $("#titularTarjeta").blur(() => {
        var estado = checkName();
        if (estado) {
            $("#titularTarjeta").removeClass("border-invalid");
            $("#titularTarjeta").addClass("border-valid");
            estadoTitular = true;
        } else {
            $("#titularTarjeta").removeClass("border-valid");
            $("#titularTarjeta").addClass("border-invalid");
            estadoTitular = false;
        }
    });

    // Número de la tarjeta - no pueden ser más de 16
    $("#numeroTarjeta").blur(() => {
        var estado = checkNumber();
        if (estado) {
            $("#numeroTarjeta").removeClass("border-invalid");
            $("#numeroTarjeta").addClass("border-valid");
            estadoNumero = true;
        } else {
            $("#numeroTarjeta").removeClass("border-valid");
            $("#numeroTarjeta").addClass("border-invalid");
            estadoNumero = false;
        }
    });

    // Código de seguridad - no pueden ser más de 3
    $("#codigoTarjeta").blur(() => {
        var estado = checkCode();
        if (estado) {
            $("#codigoTarjeta").removeClass("border-invalid");
            $("#codigoTarjeta").addClass("border-valid");
            estadoCodigo = true;
        } else {
            $("#codigoTarjeta").removeClass("border-valid");
            $("#codigoTarjeta").addClass("border-invalid");
            estadoCodigo = false;
        }
    });

    // Fecha - Que no este vacia
    $("#fechaTarjeta").blur(() => {
        var estado = checkDate();
        if (estado) {
            $("#fechaTarjeta").removeClass("border-invalid");
            $("#fechaTarjeta").addClass("border-valid");
            estadoFecha = true;
        } else {
            $("#fechaTarjeta").removeClass("border-valid");
            $("#fechaTarjeta").addClass("border-invalid");
            estadoFecha = false;
        }
    });

    // Cantidad de entradas
    $("#cantidadEntradas").change(() => {
        cantidadEntradas = Number($("#cantidadEntradas").val());
        console.log(cantidadEntradas);

        if (cantidadEntradas > 0) {
            estadoCantidad = true;
            var precioTotal = cantidadEntradas * precioEntradas;
            console.log(precioTotal)
            $("#totalPagar").text(" $" + precioTotal);
        } else {
            estadoCantidad = false;
        }
    });


}


// Verificaciones en el inicio de sesión

$("#email").blur(() => {
    var estado = checkEmail();
    console.log(estado);
    if (estado) {
        $("#email").removeClass("border-invalid");
        $("#email").addClass("border-valid");
        emailCorrect = true;
    } else {
        $("#email").removeClass("border-valid");
        $("#email").addClass("border-invalid");
        emailCorrect = false;
    }
});

// Funciones para verificar campos

function checkName() {
    var pattern = /^[a-zA-Z ]*$/;
    var inputName = $("#titularTarjeta").val();
    var estado = true;

    if (pattern.test(inputName) && inputName !== "") {
        console.log("Nombre válido");
        estado = true;
    } else {
        console.log("Nombre inválido");
        estado = false;
    }

    return estado;
}

function checkEmail() {
    var pattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    var inputEmail = $("#email").val();
    var estado = true;

    if (pattern.test(inputEmail) && inputEmail !== "") {
        console.log("Email válido");
        estado = true;
    } else {
        console.log("Email inválido");
        estado = false;
    }

    return estado;
}

function checkNumber() {
    var inputNumber = $("#numeroTarjeta").val();
    if (inputNumber.length == 16) {
        estado = true;
    } else {
        estado = false;
    }

    return estado;
}

function checkCode() {
    var inputNumber = $("#codigoTarjeta").val();
    if (inputNumber.length == 3) {
        estado = true;
    } else {
        estado = false;
    }

    return estado;
}

function checkDate() {
    var inputDate = $("#fechaTarjeta").val();
    console.log(inputDate);
    if (inputDate.length > 0) {
        estado = true;
    } else {
        estado = false;
    }
    return estado;
}

// Botón de pagar
$("#btnPagar").click((event) => {
    event.preventDefault();
    var cantidadEntradas = $("#cantidadEntradas").val();
    console.log(cantidadEntradas);
    if (estadoTitular == true && estadoNumero == true && estadoCodigo == true && estadoFecha == true && cantidadEntradas > 0) {

        // Por motivos de práctica, será un 50/50
        var random = Math.random() * (100 - 0) + 0;
        random = Math.floor(random);
        console.log(random);
        if (random >= 0 && random <= 50) {
            $("#compraRechazada").hide();
            $("#compraExitosa").fadeIn();
        } else {
            $("#compraExitosa").hide();
            $("#compraRechazada").fadeIn();
        }

        $("#btnPagar").attr('disabled', 'disabled');


    } else {
        $("#notificacion").text("Revisa los campos");
        $("#notificacion").fadeIn();
        setTimeout(() => {
            $("#notificacion").fadeOut();
        }, 2000);
    }
});

function resetForm() {
    $("#formComprarBoletos select").each(function() {
        this.selectedIndex = 0;
    });
    $("#formComprarBoletos input[type=text], input[type=number], input[type=date]").each(function() {
        this.value = '';
    });
    $("#titularTarjeta").removeClass("border-valid");
    $("#numeroTarjeta").removeClass("border-valid");
    $("#codigoTarjeta").removeClass("border-valid");
    $("#fechaTarjeta").removeClass("border-valid");
    $("#totalPagar").text('');

}