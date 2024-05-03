document.addEventListener("DOMContentLoaded", function() {
    var formulario = document.getElementById("formulario");
    var container = document.getElementById("container");
    var datosGuardados = [];

    formulario.addEventListener("submit", function(event) {
        event.preventDefault(); 

        var nombre = document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;

        var nuevoDato = {
            nombre: nombre,
            edad: edad
        };

        datosGuardados.push(nuevoDato);

        renderizarDatos();
    });

    function renderizarDatos() {
        container.innerHTML = "";

        datosGuardados.forEach(function(item) {
            var elemento = document.createElement("p");
            elemento.textContent = "Nombre: " + item.nombre + ", Edad: " + item.edad;
            container.appendChild(elemento);
        });
    }
});
