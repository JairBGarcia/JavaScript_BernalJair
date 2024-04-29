document.addEventListener("DOMContentLoaded", async function() {
    const nuevaBaraja = await obtenerNuevaBaraja();
    const barajaId = nuevaBaraja.deck_id;

    const contenedorJugador = document.querySelector(".player-hand");
    const contenedorDealer = document.querySelector(".dealer-hand");

    mostrarManoInicial(barajaId, contenedorJugador, contenedorDealer);
});

async function mostrarManoInicial(barajaId, contenedorJugador, contenedorDealer) {
    const cartasJugador = await extraerCartas(barajaId, 2);
    const cartasDealer = await extraerCartas(barajaId, 2);

    cartasJugador.forEach(carta => mostrarCarta(carta, contenedorJugador));
    cartasDealer.forEach((carta, index) => {
        if (index === 0) {
            mostrarCarta(carta, contenedorDealer);
        } else {
            ocultarCarta(contenedorDealer);
        }
    });
}

async function extraerCartas(barajaId, cantidad) {
    const response = await fetch(`https://deckofcardsapi.com/api/deck/${barajaId}/draw/?count=${cantidad}`);
    const data = await response.json();
    return data.cards;
}

function mostrarCarta(carta, contenedor) {
    const imagenCarta = document.createElement("img");
    imagenCarta.src = carta.image;
    contenedor.appendChild(imagenCarta);
}

function ocultarCarta(contenedor) {
    const imagenCartaOculta = document.createElement("img");
    imagenCartaOculta.src = "./imagen/atras.png";
    imagenCartaOculta.classList.add("carta-boca-abajo");
    contenedor.appendChild(imagenCartaOculta);
}

document.getElementById("pedir-carta").addEventListener("click", async function() {
    const barajaId = document.getElementById("baraja-id").value;

    const cartaJugador = await extraerCartas(barajaId, 1);

    const contenedorJugador = document.querySelector(".player-hand");
    mostrarCarta(cartaJugador[0], contenedorJugador);
});

async function obtenerNuevaBaraja() {
    const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data = await response.json();
    return data;
}
