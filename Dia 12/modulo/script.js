document.addEventListener('DOMContentLoaded', () => {
    const pedirCartaBtn = document.getElementById('pedir-carta');
    const plantarseBtn = document.getElementById('plantarse');
    const volverAJugarBtn = document.getElementById('volver-a-jugar');
    const playerHand = document.querySelector('.player-hand');
    const dealerHand = document.querySelector('.dealer-hand');
    const mensajeResultante = document.getElementById('mensaje-resultante');
    const sumaCartas = document.getElementById('suma-cartas');

    let totalPlayerSum = 0;
    let totalDealerSum = 0;
    let gameOver = false;

    // Función para pedir una carta al mazo
    function pedirCarta(hand) {
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
            .then(response => response.json())
            .then(data => {
                const carta = data.cards[0];
                const imageUrl = carta.image;
                const cardImage = document.createElement('img');
                cardImage.src = imageUrl;
                hand.appendChild(cardImage);

                if (hand === playerHand) {
                    mensajeResultante.textContent = `Has recibido una carta: ${carta.value} de ${carta.suit}`;
                    totalPlayerSum += calcularValorCarta(carta.value);
                    sumaCartas.textContent = `Suma de tus cartas: ${totalPlayerSum}`;
                    if (totalPlayerSum > 21) {
                        gameOver = true;
                        mostrarResultado();
                    }
                } else {
                    totalDealerSum += calcularValorCarta(carta.value);
                }
            })
            .catch(error => {
                console.error('Hubo un problema al pedir la carta:', error);
            });
    }

    // Función para calcular el valor de una carta
    function calcularValorCarta(valorCarta) {
        let valorNumerico = parseInt(valorCarta);
        if (isNaN(valorNumerico)) {
            if (valorCarta === 'ACE') {
                valorNumerico = 11; // Suponemos que el as vale 11 por defecto
            } else {
                valorNumerico = 10; // Suponemos que las cartas de figura valen 10
            }
        }
        return valorNumerico;
    }

    // Función para iniciar un nuevo juego
    function nuevoJuego() {
        playerHand.innerHTML = '';
        dealerHand.innerHTML = '';
        mensajeResultante.textContent = '';
        sumaCartas.textContent = 'Suma de tus cartas: 0';
        totalPlayerSum = 0;
        totalDealerSum = 0;
        gameOver = false;
        pedirCartaBtn.disabled = false;
        plantarseBtn.disabled = false;
        pedirCarta(playerHand);
        pedirCarta(playerHand);
        pedirCarta(dealerHand);
        pedirCarta(dealerHand);
    }

    // Función para mostrar el resultado del juego
    function mostrarResultado() {
        // Muestra la primera carta del crupier
        dealerHand.children[0].style.visibility = 'visible';

        while (totalDealerSum < 17) {
            pedirCarta(dealerHand);
        }

        if (totalPlayerSum > 21 || (totalPlayerSum < totalDealerSum && totalDealerSum <= 21)) {
            mensajeResultante.textContent = "¡Has perdido!";
        } else if (totalPlayerSum > totalDealerSum || totalDealerSum > 21) {
            mensajeResultante.textContent = "¡Has ganado!";
        } else {
            mensajeResultante.textContent = "¡Es un empate!";
        }
        gameOver = true;
        pedirCartaBtn.disabled = true;
        plantarseBtn.disabled = true;
    }

    // Llamar a la función iniciarJuego al cargar la página
    nuevoJuego();

    // Event listener para el botón "Pedir carta"
    pedirCartaBtn.addEventListener('click', () => {
        if (!gameOver) {
            pedirCarta(playerHand);
        }
    });

    // Event listener para el botón "Plantarse"
    plantarseBtn.addEventListener('click', () => {
        if (!gameOver) {
            mostrarResultado();
        }
    });

    // Event listener para el botón "Volver a jugar"
    volverAJugarBtn.addEventListener('click', nuevoJuego);
});
