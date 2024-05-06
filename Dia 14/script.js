document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('frmDataHero');
    const guardarHeroeBtn = document.querySelector('button.btn-primary');
    const verDatosGuardadosBtn = document.getElementById('verDatosGuardados');
    const editarDatosGuardadosBtn = document.getElementById('editarDatosGuardados');
    const eliminarDatosGuardadosBtn = document.getElementById('eliminarDatosGuardados');
    const selectDatosGuardados = document.getElementById('selectDatosGuardados'); // Nuevo elemento para seleccionar los datos

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const characterName = document.getElementById('characterName').value;
        const actorName = document.getElementById('actorName').value;
        const age = document.getElementById('age').value;
        const cityName = document.getElementById('cityName').value;
        const poster = document.getElementById('poster').value;
        const dateAppears = document.getElementById('dateAppears').value;
        const producer = document.getElementById('producer').value;

        const heroData = {
            characterName: characterName,
            actorName: actorName,
            age: age,
            cityName: cityName,
            poster: poster,
            dateAppears: dateAppears,
            producer: producer
        };

        localStorage.setItem('heroData', JSON.stringify(heroData));
        alert('Datos guardados localmente.');
    });

    guardarHeroeBtn.addEventListener('click', function () {
        form.dispatchEvent(new Event('submit'));
    });

    verDatosGuardadosBtn.addEventListener('click', function () {
        const storedData = localStorage.getItem('heroData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            alert(`Datos guardados:\n${JSON.stringify(parsedData, null, 2)}`);
        } else {
            alert('No hay datos guardados.');
        }
    });

    editarDatosGuardadosBtn.addEventListener('click', function () {
        const storedData = localStorage.getItem('heroData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            document.getElementById('characterName').value = parsedData.characterName;
            document.getElementById('actorName').value = parsedData.actorName;
            document.getElementById('age').value = parsedData.age;
            document.getElementById('cityName').value = parsedData.cityName;
            document.getElementById('poster').value = parsedData.poster;
            document.getElementById('dateAppears').value = parsedData.dateAppears;
            document.getElementById('producer').value = parsedData.producer;
        } else {
            alert('No hay datos guardados para editar.');
        }
    });

    eliminarDatosGuardadosBtn.addEventListener('click', function () {
        const selectedData = selectDatosGuardados.value; 
        if (selectedData) {
            localStorage.removeItem(selectedData);
            alert('Datos guardados eliminados.');
        } else {
            alert('Por favor selecciona un dato para eliminar.');
        }
    });
});

