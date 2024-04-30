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
    let dealerTurn = false;
    let dinero = 1000; // Dinero inicial del usuario

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
                } else if (hand === dealerHand) {
                    totalDealerSum += calcularValorCarta(carta.value);
                    if (totalDealerSum < totalPlayerSum && totalDealerSum <= 21) {
                        pedirCarta(dealerHand);
                    } else {
                        mostrarResultado();
                    }
                }
            })
            .catch(error => {
                console.error('Hubo un problema al pedir la carta:', error);
            });
    }

    function calcularValorCarta(valorCarta) {
        let valorNumerico = parseInt(valorCarta);
        if (isNaN(valorNumerico)) {
            if (valorCarta === 'ACE') {
                valorNumerico = 11; 
            } else {
                valorNumerico = 10; 
            }
        }
        return valorNumerico;
    }

    function iniciarJuego() {
        pedirCarta(playerHand);
        pedirCarta(playerHand);
    }

    function mostrarResultado() {
        if (totalDealerSum <= 21) {
            mensajeResultante.textContent = `El crupier tiene ${totalDealerSum} puntos.`;
        } else {
            mensajeResultante.textContent = 'El crupier se ha pasado de 21.';
        }

        if (totalPlayerSum > 21 || (totalPlayerSum < totalDealerSum && totalDealerSum <= 21)) {
            mensajeResultante.textContent += "\n¡Has perdido!";
            dinero -= parseInt(document.getElementById('apuesta').value);
        } else if (totalPlayerSum > totalDealerSum || totalDealerSum > 21) {
            mensajeResultante.textContent += "\n¡Has ganado!";
            dinero += parseInt(document.getElementById('apuesta').value);
        } else {
            mensajeResultante.textContent += "\n¡Es un empate!";
        }
        document.getElementById('money').textContent = dinero;
        gameOver = true;
        pedirCartaBtn.disabled = true;
        plantarseBtn.disabled = true;
    }

    function nuevoJuego() {
        playerHand.innerHTML = '';
        dealerHand.innerHTML = '';
        mensajeResultante.textContent = '';
        sumaCartas.textContent = 'Suma de tus cartas: 0';
        totalPlayerSum = 0;
        totalDealerSum = 0;
        gameOver = false;
        dealerTurn = false;
        pedirCartaBtn.disabled = false;
        plantarseBtn.disabled = false;
        iniciarJuego();
    }

    iniciarJuego();

    pedirCartaBtn.addEventListener('click', () => {
        if (!gameOver && !dealerTurn) {
            pedirCarta(playerHand);
        }
    });

    plantarseBtn.addEventListener('click', () => {
        if (!gameOver && !dealerTurn) {
            dealerTurn = true;
            pedirCarta(dealerHand);
        }
    });

    volverAJugarBtn.addEventListener('click', nuevoJuego);
});
