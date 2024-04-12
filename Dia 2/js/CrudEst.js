let listestudiantes = [];

const objestudiante = {
    id:'',
    nombre: '',
    correo: '',
    direccion: '',
    telefono: ''
}
let editando = false;

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    if (nombre.value == '' || correo.value == '' || direccion.value == '' || telefono.value == '') {
        alert('Todos los campos son obligatorios');
    } else {
        if (editando) {
            actualizarEstudiante();
        } else {
            objestudiante.id = Date.now(),
            objestudiante.nombre= nombre.value,
            objestudiante.correo = correo.value,
            objestudiante.direccion = direccion.value,
            objestudiante.telefono = telefono.value

            agregarEstudiante();
        }
    }
}

function agregarEstudiante() {
    listestudiantes.push(objestudiante);
    mostrarEstudiantes();
}

function mostrarEstudiantes() {
    const divEstudiante = document.querySelector('.div-estudiante');
    listestudiantes.forEach(estudiante => {
        const { id, nombre, correo, direccion, telefono } = estudiante;
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${correo} - ${direccion} - ${telefono} - `;
        parrafo.dataset.id = id;
        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEstudiante(estudiante);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);
        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEstudiante(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);
        const hr = document.createElement('hr');
        divEstudiante.appendChild(parrafo);
        divEstudiante.appendChild(hr);
    });
}

function cargarEstudiante(estudiante) {
    const {id, nombre, correo, direccion, telefono} = estudiante;

    nombreInput.value = nombre;
    direccionInput.value = direccion;
    telefonoInput.value = telefono;
    correoInput.value = correo;


    objestudiante.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEstudiante() {

    objestudiante.nombre = nombreInput.value;
    objestudiante.direccion = direccionInput.value;
    objestudiante.telefono = telefonoInput.value;
    objestudiante.correo = correoInput.value;


    listestudiantes.map(estudiante=> {

        if(estudiante.id === objestudiante.id) {
            estudiante.id = objestudiante.id;
            estudiante.nombre = objestudiante.nombre;
            estudiante.puesto = objestudiante.direccion;
            estudiante.telefono = objestudiante.telefono;
            estudiante.correo = objestudiante.correo;

        }

    });

    limpiarHTML();
    mostrarEstudiantes();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarEstudiante(id) {

    listestudiantes = listestudiantes.filter(estudiante => estudiante.id !== id);

    limpiarHTML();
    mostrarEstudiantes();
}

function limpiarHTML() {
    const divEstudiante = document.querySelector('.div-estudiante');
    while(divEstudiante.firstChild) {
        divEstudiante.removeChild(divEstudiante.firstChild);
    }
}