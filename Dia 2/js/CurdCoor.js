// Recuperar los datos del localStorage
const storedData = localStorage.getItem('listestudiantes');

// Verificar si hay datos almacenados y convertirlos de nuevo a un array
const listestudiantes = storedData ? JSON.parse(storedData) : [];

// Obtener el elemento donde deseas mostrar la lista de estudiantes
const listaEstudiantesElement = document.getElementById('lista-estudiantes');

// Limpiar cualquier contenido existente en el elemento
listaEstudiantesElement.innerHTML = '';

// Iterar sobre los estudiantes y agregarlos al elemento
listestudiantes.forEach(estudiante => {
    const { id, nombre, correo, direccion, telefono } = estudiante;
    // Crear un elemento <p> para cada estudiante y agregarlo al elemento padre
    const estudianteElement = document.createElement('p');
    estudianteElement.textContent = `ID: ${id}, Nombre: ${nombre}, Correo: ${correo}, Dirección: ${direccion}, Teléfono: ${telefono}`;
    listaEstudiantesElement.appendChild(estudianteElement);
});
