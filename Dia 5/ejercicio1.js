function generadorTablero() {
    const N = parseInt(prompt('Ingrese el tamaño del tablero:'), 10); //Pedir el tamaño
    if (isNaN(N) || N <= 0) {
        console.log('Por favor, ingrese un numero valido.');
        return;
    }

    const tablero = Array.from({ length: N }, () => Array(N).fill('O')); // Inicializarlo desde 0

    //Con esta funcion comprobamos si una reina puede estar donde otra
    function sinRiesgo(fila, columna) {
        // Verificamos las filas y columnas del tablero
        for (let i = 0; i < N; i++) {
            if (tablero[fila][i] === 'R' || tablero[i][columna] === 'R') {
                return false;
            }
        }

        // Con esta comprobamos las verticales del tablero
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

    // Con esta funcion colocamos las reinas
    function reinasPosicion(fila) {
        if (fila === N) {
            // Todas las reinas han sido colocadas
            console.log('Salida:');
            tablero.forEach(fila => console.log(fila.join(' ')));
            console.log('');
            return true; // Si encuentra la solucion se detendra
        }

        for (let columna = 0; columna < N; columna++) {
            if (sinRiesgo(fila, columna)) {
                tablero[fila][columna] = 'R'; // Colocar una reina
                if (reinasPosicion(fila + 1)) {
                    return true; // Si encuentra una solucion
                }
                tablero[fila][columna] = 'O'; // Retroceder (backtrack)
            }
        }
        return false; // Si no se encuentra una solucion en esta fila
    }

    reinasPosicion(0); // Comenzar desde la primera fila
}

generadorTablero(); 
