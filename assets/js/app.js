// Catálogo de nuevos eventos

var eventos = {
    0: {
        titulo: "Evento 1",
        descripcion: "Descripción del evento 1",
        imagenUrl: "../img/cine.jpg",
    },
    1: {
        titulo: "Evento 2",
        descripcion: "Descripción del evento 2",
        imagenUrl: "../img/teatro.jpg",
    },
    2: {
        titulo: "Evento 3",
        descripcion: "Descripción del evento 3",
        imagenUrl: "../img/ted.jpg",
    }
}

window.onload = () => {

    // Ocultamos el inicio de sesión
    $("#iniciaSesion").hide();

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
                            <button class="btnMorado">Comprar boletos</button>
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