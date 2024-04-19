function generadorTablero() {
    const N = parseInt(prompt('Ingrese el tamaño del tablero:'), 10);
    if (isNaN(N) || N <= 0) {
        console.log('Por favor, ingrese un número válido.');
        return;
    }

    const tablero = Array.from({ length: N }, () => Array(N).fill('O'));

    function sinRiesgo(fila, columna) {
        for (let i = 0; i < N; i++) {
            if (tablero[fila][i] === 'R' || tablero[i][columna] === 'R') {
                return false;
            }
        }

        for (let i = fila, j = columna; i >= 0 && j >= 0; i--, j--) {
            if (tablero[i][j] === 'R') {
                return false;
            }
        }
        for (let i = fila, j = columna; i >= 0 && j < N; i--, j++) {
            if (tablero[i][j] === 'R') {
                return false;
            }
        }

        return true;
    }

    function reinasPosicion(fila) {
        if (fila === N) {
            console.log('Una solución encontrada:');
            tablero.forEach(fila => console.log(fila.join(' ')));
            console.log('');
            return; 
        }

        for (let columna = 0; columna < N; columna++) {
            if (sinRiesgo(fila, columna)) {
                tablero[fila][columna] = 'R';
                reinasPosicion(fila + 1); // Continuar buscando más soluciones
                tablero[fila][columna] = 'O'; 
            }
        }
    }

    reinasPosicion(0);
}

generadorTablero();
