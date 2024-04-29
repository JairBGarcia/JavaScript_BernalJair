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
      // Obtiene la imagen animada del Pokémon si está disponible
      const animatedImage = datos.sprites.versions['generation-v']['black-white'].animated.front_default;
      if (animatedImage) {
        this.elementos.imagenPokemon.src = animatedImage; // Fotico animado del poke
      } else {
        // Si no hay imagen animada, muestra la imagen estática
        const staticImage = datos.sprites.other['official-artwork'].front_default;
        if (staticImage) {
          this.elementos.imagenPokemon.src = staticImage; // Fotico estático del poke
        } else {
          // Si no hay ninguna imagen disponible, oculta la imagen
          this.elementos.imagenPokemon.style.display = 'none';
        }
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
