
const boton = document.querySelector('#boton');
const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const cumpleaños = document.querySelector('#cumpleaños');
const telefono = document.querySelector('#telefono');
const foto = document.querySelector('#foto');
const direccion = document.querySelector('#direccion');
const contraseña = document.querySelector('#contraseña');

const generarUsuario = async () => {

    const url = 'https://randomuser.me/api/';
    const respuesta = await fetch(url);
    const { results } = await respuesta.json();
    const datos = results[0];

    foto.src = datos.picture.medium;
    nombre.textContent = datos.name.first;
    correo.textContent = datos.email;
    telefono.textContent = datos.phone;
    contraseña.textContent = datos.login.password;
    direccion.textContent = `${datos.location.street.number} , ${datos.location.city}`;
    cumpleaños.textContent = datos.dob.date;
}


document.addEventListener('DOMContentLoaded', generarUsuario);
boton.addEventListener('click', generarUsuario);


document.addEventListener('DOMContentLoaded', function () {
    let figure = document.getElementById('photo');
    let directions = document.getElementById('directions');
  
    directions.addEventListener('change', function () {
      figure.setAttribute('tooltip-dir', this.value);
    });
  });