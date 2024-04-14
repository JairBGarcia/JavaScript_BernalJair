let listEstudiantes = [];
const objEstudiante = {
    id:'',
    nombre: '',
    correo: '',
    direccion: '',
    telefono: ''
};
let editando = false;

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();
    const nombreValue = nombre.value.trim();
    const correoValue = correo.value.trim();
    const direccionValue = direccion.value.trim();
    const telefonoValue = telefono.value.trim();

    if (nombreValue === '' || correoValue === '' || direccionValue === '' || telefonoValue === '') {
        alert('Todos los campos son obligatorios');
    } else {
        if (editando) {
            editarEstudiante();
        } else {
            const nuevoEstudiante = {
                id: Date.now(),
                nombre: nombreValue,
                correo: correoValue,
                direccion: direccionValue,
                telefono: telefonoValue
            };
            agregarEstudiante(nuevoEstudiante);
        }
    }
}

function agregarEstudiante(estudiante) {
    listEstudiantes.push(estudiante);
    mostrarEstudiantes();
    localStorage.setItem('listEstudiantes', JSON.stringify(listEstudiantes));
}

function mostrarEstudiantes() {
    limpiarHTML();
    const divEstudiante = document.querySelector('.div-estudiante');
    listEstudiantes.forEach(estudiante => {
        const { id, nombre, correo, direccion, telefono } = estudiante;
        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${correo} - ${direccion} - ${telefono} - `;
        const editarBoton = document.createElement('button');
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        editarBoton.addEventListener('click', () => cargarEstudiante(estudiante));
        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        eliminarBoton.addEventListener('click', () => eliminarEstudiante(id));
        parrafo.appendChild(editarBoton);
        parrafo.appendChild(eliminarBoton);
        divEstudiante.appendChild(parrafo);
    });
}

function cargarEstudiante(estudiante) {
    const { id, nombre, correo, direccion, telefono } = estudiante;
    nombre.value = nombre;
    direccion.value = direccion;
    telefono.value = telefono;
    correo.value = correo;
    objEstudiante.id = id;
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function editarEstudiante() {
    objEstudiante.nombre = nombre.value;
    objEstudiante.direccion = direccion.value;
    objEstudiante.telefono = telefono.value;
    objEstudiante.correo = correo.value;
    listEstudiantes = listEstudiantes.map(estudiante => {
        if (estudiante.id === objEstudiante.id) {
            return objEstudiante;
        } else {
            return estudiante;
        }
    });
    limpiarHTML();
    mostrarEstudiantes();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false;
}

function eliminarEstudiante(id) {
    listEstudiantes = listEstudiantes.filter(estudiante => estudiante.id !== id);
    limpiarHTML();
    mostrarEstudiantes();
    localStorage.setItem('listEstudiantes', JSON.stringify(listEstudiantes));
}

function limpiarHTML() {
    const divEstudiante = document.querySelector('.div-estudiante');
    divEstudiante.innerHTML = '';
}
