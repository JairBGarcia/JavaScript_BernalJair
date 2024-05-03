let heroes = [];

function agregarHeroe() {
  const nombrePersonaje = document.getElementById('nombrePersonaje').value;
  const nombreActor = document.getElementById('nombreActor').value;
  const edadActor = document.getElementById('edadActor').value;
  const ubicacionActor = document.getElementById('ubicacionActor').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const productora = document.getElementById('productora').value;

  const nuevoHeroe = {
    nombrePersonaje: nombrePersonaje,
    nombreActor: nombreActor,
    edadActor: edadActor,
    ubicacionActor: ubicacionActor,
    ubicacion: ubicacion,
    productora: productora
  };

  heroes.push(nuevoHeroe);
}

function guardarHeroe() {
}

function eliminarHeroe() {
}

function editarHeroe() {
}

document.getElementById('nuevoHeroe').addEventListener('click', agregarHeroe);
document.getElementById('guardarHeroe').addEventListener('click', guardarHeroe);
document.getElementById('eliminarHeroe').addEventListener('click', eliminarHeroe);
document.getElementById('editarHeroe').addEventListener('click', editarHeroe);
document.getElementById('cancelar').addEventListener('click', cancelar);
