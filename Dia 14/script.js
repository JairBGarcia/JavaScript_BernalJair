
    let Heroes = [];
    let nextId = 1; // Variable para llevar el conteo de los IDs

    document.getElementById("btn_safe").addEventListener("click", function(){
        const HeroesData = {
            Id: nextId, // Asignar el siguiente ID único
            Name: document.getElementById("inputName").value,
            Actor: document.getElementById("inputActor").value,
            Address: document.getElementById("inputAddress").value,
            Ubicacion: document.getElementById("inputUbicacion").value,
            Poster: document.getElementById("inputPoster").value,
            Date: document.getElementById("dateAppears").value,
            Productora: document.getElementById("category").value,
            traje: document.getElementById("formGroupExampleInput").value,
        };

        Heroes.push(HeroesData);
        nextId++; // Incrementar el contador de IDs para el próximo héroe

        mostrarHeroes(); 
    });

    function mostrarHeroes() {
        let heroesContainer = document.getElementById("heroesContainer");
        heroesContainer.innerHTML = "";
    
        Heroes.forEach(function(hero) {
            let heroDiv = document.createElement("div");
            heroDiv.classList.add("card", "mb-3");
            heroDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">ID: ${hero.Id}</h5>
                    <h5 class="card-title">${hero.Name}</h5>
                    <p class="card-text">Actor: ${hero.Actor}</p>
                    <p class="card-text">Edad Actor: ${hero.Address}</p>
                    <p class="card-text">Ubicación: ${hero.Ubicacion}</p>
                    <p class="card-text">Fecha: ${hero.Date}</p>
                    <p class="card-text">Productora: ${hero.Productora === "1" ? "Marvel" : "Dcomics"}</p>
                    <p class="card-text">Poster: ${hero.Poster}</p>
                    <p class="card-text">Traje: ${hero.traje}</p>
                    <button type="button" class="btn btn-primary" onclick="cargarHeroe(${hero.Id})">Editar</button>
                </div>
            `;
            heroesContainer.appendChild(heroDiv);
        });
    }
    // Deshabilitar los campos de entrada al cargar la página
    window.onload = function() {
        document.querySelectorAll('input, select').forEach(function(el) {
            el.disabled = true;
        });
        document.getElementById("grpSuites").style.display = "none";
    };

    // Mostrar los campos de entrada después de hacer clic en el botón "Nuevo héroe"
    document.getElementById("btn_new").addEventListener("click", function() {
        document.querySelectorAll('input, select').forEach(function(el) {
            el.disabled = false;
        });
        document.getElementById("grpSuites").style.display = "block";
    });

    // Funcion para que cuando se le de click a boton de + me proyecte la informacion de los nombres de lo trajes 
    document.getElementById("btnMostrarFuncion").addEventListener("click", function() {
        var trajesContainer = document.getElementById("trajesContainer");
        var nuevoTraje = document.createElement("div");
        nuevoTraje.classList.add("traje");
        nuevoTraje.innerHTML =`
            <div class="row align-items-center">
                <div>
                    <label for="formGroupExampleInput" class="text-primary">Nombre del traje</label>
                </div>
                <div class="col-8">
                    <input type="text" class="form-control" id="formGroupExampleInput">
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-danger circle-btn btnEliminarTraje">-</button>
                </div>
            </div>`
        ;
        trajesContainer.appendChild(nuevoTraje);
        nuevoTraje.style.display = "block"; 
        var btnEliminarTraje = nuevoTraje.querySelector(".btnEliminarTraje");
        btnEliminarTraje.addEventListener("click", function() {
            trajesContainer.removeChild(nuevoTraje);
        });
    });

    function cargarHeroe(id) {
        const heroe = Heroes.find(h => h.Id === id);
        if (heroe) {
            document.getElementById("inputName").value = heroe.Name;
            document.getElementById("inputActor").value = heroe.Actor;
            document.getElementById("inputAddress").value = heroe.Address;
            document.getElementById("inputUbicacion").value = heroe.Ubicacion;
            document.getElementById("inputPoster").value = heroe.Poster;
            document.getElementById("dateAppears").value = heroe.Date;
            document.getElementById("category").value = heroe.Productora;
    
            document.getElementById("hiddenId").value = heroe.Id;
        }
    }
    
    function cargarHeroe(id) {
        const heroe = Heroes.find(h => h.Id === id);
        if (heroe) {
            document.getElementById("inputName").value = heroe.Name;
            document.getElementById("inputActor").value = heroe.Actor;
            document.getElementById("inputAddress").value = heroe.Address;
            document.getElementById("inputUbicacion").value = heroe.Ubicacion;
            document.getElementById("inputPoster").value = heroe.Poster;
            document.getElementById("dateAppears").value = heroe.Date;
            document.getElementById("category").value = heroe.Productora;
    

            document.getElementById("hiddenId").value = heroe.Id;
        }
    }

    function actualizarHeroe() {
        const id = document.getElementById("hiddenId").value;
        const heroe = Heroes.find(h => h.Id == id);
        if (heroe) {
            heroe.Name = document.getElementById("inputName").value;
            heroe.Actor = document.getElementById("inputActor").value;
            heroe.Address = document.getElementById("inputAddress").value;
            heroe.Ubicacion = document.getElementById("inputUbicacion").value;
            heroe.Poster = document.getElementById("inputPoster").value;
            heroe.Date = document.getElementById("dateAppears").value;
            heroe.Productora = document.getElementById("category").value;
    
            mostrarHeroes();
        }
    }
    function eliminarHeroe() {
        const id = document.getElementById("hiddenId").value; // Obtiene el ID desde un campo oculto
        const index = Heroes.findIndex(h => h.Id == id); // Encuentra el índice del héroe en el arreglo
        if (index !== -1) {
            Heroes.splice(index, 1); // Elimina el héroe del arreglo
            mostrarHeroes(); // Actualiza la lista de héroes mostrada
        } else {
            alert("Heroe no encontrado");
        }
    }

    function cancelarEdicion() {
        document.getElementById("inputName").value = "";
        document.getElementById("inputActor").value = "";
        document.getElementById("inputAddress").value = "";
        document.getElementById("inputUbicacion").value = "";
        document.getElementById("inputPoster").value = "";
        document.getElementById("dateAppears").value = "";
        document.getElementById("category").value = "1"; 
        document.getElementById("hiddenId").value = ""; 
    
        document.getElementById("registroTrajes").style.display = "none";
    
        document.querySelectorAll('input, select').forEach(function(el) {
            el.disabled = true;
        });
    }
