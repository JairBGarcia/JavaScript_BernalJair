const storedData = localStorage.getItem('listestudiantes');

const listestudiantes = storedData ? JSON.parse(storedData) : [];

const listaEstudiantesElement = document.getElementById('lista-estudiantes');

listaEstudiantesElement.innerHTML = '';

listestudiantes.forEach(estudiante => {
    const { id, nombre, correo, direccion, telefono } = estudiante;
    // Crear un elemento <p> para cada estudiante y agregarlo al elemento padre
    const estudianteElement = document.createElement('p');
    estudianteElement.textContent = `ID: ${id}, Nombre: ${nombre}, Correo: ${correo}, Dirección: ${direccion}, Teléfono: ${telefono}`;
    listaEstudiantesElement.appendChild(estudianteElement);
});
