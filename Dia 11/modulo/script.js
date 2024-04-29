class AplicacionPokemon {
  constructor() {
    // Busca los elementos del DOM
    this.elementos = {
      nombrePokemon: document.querySelector('.nombre-pokemon'), 
      numeroPokemon: document.querySelector('.numero-pokemon'),
      imagenPokemon: document.querySelector('.poke-imagen'), 
      formulario: document.querySelector('.form'), 
      entrada: document.querySelector('.buscador'), 
      botonAnterior: document.querySelector('.boton-prev'), 
      botonSiguiente: document.querySelector('.boton-next') 
    };
    this.busquedaPokemon = 1; // inicializa el pokemoncito

    // para el manejo del formulario y los botones
    this.elementos.formulario.addEventListener('submit', this.enviarFormulario.bind(this));
    this.elementos.botonAnterior.addEventListener('click', () => this.cambiarPokemon(-1));
    this.elementos.botonSiguiente.addEventListener('click', () => this.cambiarPokemon(1));

    // metodo para registrar
    this.registerEventListeners();
    
    // primer pokemon al cargar pagina
    this.mostrarPokemon(this.busquedaPokemon);
  }

  // Método para registrar los event listeners
  registerEventListeners() {
    this.elementos.formulario.addEventListener('submit', event => {
      event.preventDefault();
      this.mostrarPokemon(this.elementos.entrada.value.toLowerCase());
    });

    this.elementos.botonAnterior.addEventListener('click', () => {
      if (this.busquedaPokemon > 1) {
        this.cambiarPokemon(-1);
      }
    });

    this.elementos.botonSiguiente.addEventListener('click', () => {
      this.cambiarPokemon(1);
    });
  }

  // saca los datos del pokemoncito de la api
  async obtenerPokemon(pokemon) {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (respuesta.ok) return await respuesta.json(); // devolver datos de manera good
    else return null; // devolver null si no sirve
  }

  // muestra los datos en la interfaz
  async mostrarPokemon(pokemon) {
    const datos = await this.obtenerPokemon(pokemon);
    if (datos) {
      // Muestra los datos si están en la API
      this.elementos.nombrePokemon.textContent = datos.name;
      this.elementos.numeroPokemon.textContent = datos.id;
  
      // Verificar si la propiedad 'sprites' está presente en los datos
      if (datos.sprites) {
        // Verificar si la propiedad 'other' y 'showdown' están presentes en los datos
        if (datos.sprites.other && datos.sprites.other.showdown && datos.sprites.other.showdown.front_default) {
          // Asignar la imagen al src del elemento img
          this.elementos.imagenPokemon.src = datos.sprites.other.showdown.front_default;
        } else if (datos.sprites.front_default) {
          // Si no se encuentra la imagen 'other' y 'showdown', usar la imagen por defecto
          this.elementos.imagenPokemon.src = datos.sprites.front_default;
        }
      } else {
        // Si no se encuentran sprites, mostrar un mensaje de error
        this.elementos.imagenPokemon.src = ''; // Limpiar la imagen
        this.elementos.imagenPokemon.alt = 'Image not found';
      }
  
      // Actualiza el número de búsqueda del Pokémon actual
      this.busquedaPokemon = datos.id;
    } else {
      // Muestra error si el Pokémon no está
      this.elementos.nombrePokemon.textContent = 'No encontrado :c';
      this.elementos.numeroPokemon.textContent = '';
      this.elementos.imagenPokemon.style.display = 'none';
    }
  }
  
  

  enviarFormulario(evento) {
    evento.preventDefault(); // Evitar recargar la página
    this.mostrarPokemon(this.elementos.entrada.value.toLowerCase()); // muestra el pokemon que pone el usuario
  }

  // permite cambiar entre el anterior y siguiente poke
  cambiarPokemon(incremento) {
    this.busquedaPokemon += incremento; // pone un numero o lo quita
    if (this.busquedaPokemon < 1) this.busquedaPokemon = 1; // prohibe ingresar numeros negativos
    this.mostrarPokemon(this.busquedaPokemon); // muestra el dato del poke actualizado
  }
}

const aplicacion = new AplicacionPokemon(); // se forma la instancia de la clase
