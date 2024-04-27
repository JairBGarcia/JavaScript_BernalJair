class AplicacionPokemon {
    constructor() {
      this.elementos = {
        nombrePokemon: document.querySelector('.nombre-pokemon'),
        numeroPokemon: document.querySelector('.numero-pokemon'),
        imagenPokemon: document.querySelector('.poke-imagen'),
        formulario: document.querySelector('.form'),
        entrada: document.querySelector('.buscador'),
        botonAnterior: document.querySelector('.boton-prev'),
        botonSiguiente: document.querySelector('.boton-next')
      };
      this.busquedaPokemon = 1;
  
      this.elementos.formulario.addEventListener('submit', this.enviarFormulario.bind(this));
      this.elementos.botonAnterior.addEventListener('click', () => this.cambiarPokemon(-1));
      this.elementos.botonSiguiente.addEventListener('click', () => this.cambiarPokemon(1));
  
      this.mostrarPokemon(this.busquedaPokemon);
    }
  
    async obtenerPokemon(pokemon) {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      if (respuesta.ok) return await respuesta.json();
      else return null;
    }
  
    async mostrarPokemon(pokemon) {
      const datos = await this.obtenerPokemon(pokemon);
      if (datos) {
        this.elementos.nombrePokemon.textContent = datos.name;
        this.elementos.numeroPokemon.textContent = datos.id;
        this.elementos.imagenPokemon.src = datos.sprites.versions['generation-v']['black-white'].animated.front_default;
      } else {
        this.elementos.nombrePokemon.textContent = 'No encontrado :c';
        this.elementos.numeroPokemon.textContent = '';
        this.elementos.imagenPokemon.style.display = 'none';
      }
    }
  
    enviarFormulario(evento) {
      evento.preventDefault();
      this.mostrarPokemon(this.elementos.entrada.value.toLowerCase());
    }
  
    cambiarPokemon(incremento) {
      this.busquedaPokemon += incremento;
      if (this.busquedaPokemon < 1) this.busquedaPokemon = 1;
      this.mostrarPokemon(this.busquedaPokemon);
    }
  }
  
  const aplicacion = new AplicacionPokemon();
  