function nuevoHeroe() {
  }

  function guardarHeroe() {
    const nombrePersonaje = document.getElementById('validationDefault01').value;
    const nombreActor = document.getElementById('validationDefault02').value;
    const edadActor = document.getElementById('validationDefaultUsername').value;
    const ubicacion = document.getElementById('validationDefault03').value;
    const poster = document.getElementById('poblacion').value;

    const heroe = {
      "nombrePersonaje": nombrePersonaje,
      "nombreActor": nombreActor,
      "edadActor": edadActor,
      "ubicacion": ubicacion,
      "poster": poster
    };

    const jsonHeroe = JSON.stringify(heroe);

    console.log(jsonHeroe);
  }

  function cancelar() {
  }
