function starwars() {
    let xhr = new XMLHttpRequest()
    let starid = document.getElementById('starid').value
    let url = `https://swapi.py4e.com/api/people/${starid}`
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText)
            console.log(response)
            oneforall(response)
        } else if (this.readyState === 4) {
            console.log('Error:', this.statusText)
            document.getElementById('personstar').innerHTML = 'Error fetching:' + this.statusText
        }
    }
    xhr.send() 
}

//con esta funcion mostramos los datos del personaje
function oneforall(data) {
    let dataInfo = '<h2>' + data.name + '</h2>';
    dataInfo += '<table>';
    dataInfo += '<tr><td><strong>height:</strong></td><td>' + data.height + '</td></tr>';
    dataInfo += '<tr><td><strong>mass:</strong></td><td>' + data.mass + '</td></tr>';
    dataInfo += '<tr><td><strong>hair color:</strong></td><td>' + data.hair_color + '</td></tr>';
    dataInfo += '<tr><td><strong>skin color:</strong></td><td>' + data.skin_color + '</td></tr>';
    dataInfo += '<tr><td><strong>eye color:</strong></td><td>' + data.eye_color + '</td></tr>';
    dataInfo += '<tr><td><strong>birth year:</strong></td><td>' + data.birth_year + '</td></tr>';
    dataInfo += '<tr><td><strong>gender:</strong></td><td>' + data.gender + '</td></tr>';
    dataInfo += '<tr><td><strong>created:</strong></td><td>' + data.created + '</td></tr>';
    dataInfo += '<tr><td><strong>homeworld:</strong></td><td>' + '</td></tr>';
    fetch(data.homeworld)
       .then(response => response.json()) 
       .then(homeworldData => {
            dataInfo += `<tr><td><strong>Name:</strong></td><td>${homeworldData.name}</td></tr>`;
            dataInfo += `<tr><td><strong>Rotation Period:</strong></td><td>${homeworldData.rotation_period}</td></tr>`;
            dataInfo += `<tr><td><strong>Orbital Period:</strong></td><td>${homeworldData.orbital_period}</td></tr>`;
            dataInfo += `<tr><td><strong>Diameter:</strong></td><td>${homeworldData.diameter}</td></tr>`;
            dataInfo += `<tr><td><strong>Climate:</strong></td><td>${homeworldData.climate}</td></tr>`;
            dataInfo += `<tr><td><strong>Gravity:</strong></td><td>${homeworldData.gravity}</td></tr>`;
            dataInfo += `<tr><td><strong>Terrain:</strong></td><td>${homeworldData.terrain}</td></tr>`;
            dataInfo += `<tr><td><strong>Surface Water:</strong></td><td>${homeworldData.surface_water}</td></tr>`;
            dataInfo += `<tr><td><strong>Population:</strong></td><td>${homeworldData.population}</td></tr>`;
            if (homeworldData.residents) {
                dataInfo += `<tr><td><strong>Residents:</strong></td><td></td></tr>`;
                homeworldData.residents.forEach(residents => {
                    dataInfo += `<tr><td></td><td>${residents}</td></tr>`;
                })
            }
            if (homeworldData.films.length) {
                dataInfo += `<tr><td><strong>Films:</strong></td><td></td></tr>`;
                homeworldData.films.forEach(film => {
                    dataInfo += `<tr><td></td><td>${film}</td></tr>`;
                });
            }
            dataInfo += `<tr><td><strong>Created:</strong></td><td>${homeworldData.created}</td></tr>`;
            dataInfo += `<tr><td><strong>Edited:</strong></td><td>${homeworldData.edited}</td></tr>`;
            dataInfo += `<tr><td><strong>URL:</strong></td><td>${homeworldData.url}</td></tr>`;
            dataInfo += '<tr><td><strong>films:</strong></td><td></td></tr>';
            let filmPromises = data.films.map(filmLink => { 
                return fetch(filmLink) 
                   .then(response => response.json())
                   .then(filmData => {
                        dataInfo += '<tr><td></td><td>' + filmData.title + ' (' + filmData.release_date + ')</td></tr>';
                        dataInfo += `<tr><td><strong>episode_id:</strong></td><td>${filmData.episode_id}</td></tr>`;
                        dataInfo += `<tr><td><strong>opening_crawl:</strong></td><td>${filmData.opening_crawl}</td></tr>`;
                        dataInfo += `<tr><td><strong>director:</strong></td><td>${filmData.director}</td></tr>`;
                        dataInfo += `<tr><td><strong>producer:</strong></td><td>${filmData.producer}</td></tr>`;
                        if (filmData.characters) {
                            dataInfo += `<tr><td><strong>characters:</strong></td><td></td></tr>`;
                            filmData.characters.forEach(characters => {
                                dataInfo += `<tr><td></td><td>${characters}</td></tr>`;
                            })
                        }
                        if (filmData.planets) {
                            dataInfo += `<tr><td><strong>planets:</strong></td><td></td></tr>`;
                            filmData.planets.forEach(planets => {
                                dataInfo += `<tr><td></td><td>${planets}</td></tr>`;
                            })
                        }
                        dataInfo += `<tr><td><strong>starships:</strong></td><td></td></tr>`;
                        filmData.starships.forEach(starships => {
                            dataInfo += `<tr><td></td><td>${starships}</td></tr>`;
                        })
                        dataInfo += `<tr><td><strong>vehicles:</strong></td><td></td></tr>`;
                        filmData.vehicles.forEach(vehicles => {
                            dataInfo += `<tr><td></td><td>${vehicles}</td></tr>`;
                        })
                        dataInfo += `<tr><td><strong>species:</strong></td><td></td></tr>`;
                        filmData.species.forEach(species => {
                            dataInfo += `<tr><td></td><td>${species}</td></tr>`;
                        })
                        dataInfo += `<tr><td><strong>created:</strong></td><td>${filmData.created}</td></tr>`;
                        dataInfo += `<tr><td><strong>edited:</strong></td><td>${filmData.edited}</td></tr>`;
                        dataInfo += `<tr><td><strong>url:</strong></td><td>${filmData.url}</td></tr>`;
                   })
                   .catch(error => {
                        console.error('Error fetching film:', error);
                        dataInfo += '<tr><td></td><td>Error fetching film</td></tr>';
                   });
            });


            Promise.all(filmPromises) // Espera a que todas las promesas se resuelvan
                .then(() => { 
                    dataInfo += '</table>';
                    dataInfo += '<p><strong>species:</strong>' + '</p>';
                    fetch(data.species)
                    .then(response => response.json())
                    .then(speciesData => {
                         // código para manejar la respuesta exitosa
                         dataInfo += `<p><strong>Name:</strong> ${speciesData.name}</p>`;
                         dataInfo += `<p><strong>classification:</strong> ${speciesData.classification}</p>`;
                         dataInfo += `<p><strong>designation:</strong> ${speciesData.designation}</p>`;
                         dataInfo += `<p><strong>average height:</strong> ${speciesData.average_height}</p>`;
                         dataInfo += `<p><strong>skin colors:</strong> ${speciesData.skin_colors}</p>`;
                         dataInfo += `<p><strong>hair colors:</strong> ${speciesData.hair_colors}</p>`;
                         dataInfo += `<p><strong>eye colors:</strong> ${speciesData.eye_colors}</p>`;
                         dataInfo += `<p><strong>average lifespan:</strong> ${speciesData.average_lifespan}</p>`;
                         dataInfo += `<p><strong>homeworld:</strong> ${speciesData.homeworld}</p>`;
                         dataInfo += `<p><strong>language:</strong> ${speciesData.language}</p>`;
                 
                         if (speciesData.people) {
                             dataInfo += `<p><strong>Residents:</strong></p>`;
                             speciesData.people.forEach(people => {
                                 dataInfo += `<p>${people}</p>`;
                             })
                         }
                         if (speciesData.films.length) {
                             dataInfo += `<p><strong>Films:</strong></p>`;
                             speciesData.films.forEach(film => {
                                 dataInfo += `<p>${film}</p>`;
                             });
                         }
                 
                         dataInfo += `<p><strong>Created:</strong> ${speciesData.created}</p>`;
                         dataInfo += `<p><strong>Edited:</strong> ${speciesData.edited}</p>`;
                         dataInfo += `<p><strong>URL:</strong> ${speciesData.url}</p>`;
                         dataInfo += '<p><strong>created:</strong> ' + data.created + '</p>'
                         dataInfo += '<p><strong>edited:</strong> ' + data.edited + '</p>'
                         dataInfo += '<p><strong>url:</strong> ' + data.url + '</p>'
                         document.getElementById('personstar').innerHTML = dataInfo;
                     })
                    .catch(error => {
                         console.error('Error fetching species:', error);
                         dataInfo += '<p><strong>species:</strong> Error fetching species</p>';
                         document.getElementById('personstar').innerHTML = dataInfo;
                     });
        })
        .catch(error => {
            console.error('Error fetching homeworld:', error);
            dataInfo += '<p><strong>homeworld:</strong> Error fetching homeworld</p>';
            document.getElementById('personstar').innerHTML = dataInfo;
        });
    })
    .catch(error => {
        console.error('Error fetching homeworld:', error);
        dataInfo += '<p><strong>homeworld:</strong> Error fetching homeworld</p>';
        document.getElementById('personstar').innerHTML = dataInfo;
    });
}
