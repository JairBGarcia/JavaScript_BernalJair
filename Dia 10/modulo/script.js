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

    dataInfo += '<p><strong>height:</strong> ' + data.height + '</p>';
    dataInfo += '<p><strong>mass:</strong> ' + data.mass + '</p>'
    dataInfo += '<p><strong>hair color:</strong> ' + data.hair_color + '</p>'
    dataInfo += '<p><strong>skin color:</strong> ' + data.skin_color + '</p>'
    dataInfo += '<p><strong>eye color:</strong> ' + data.eye_color + '</p>'
    dataInfo += '<p><strong>birth year:</strong> ' + data.birth_year + '</p>'
    dataInfo += '<p><strong>gender:</strong> ' + data.gender + '</p>'
    dataInfo += '<p><strong>created:</strong> ' + data.created + '</p>'
    dataInfo += '<p><strong>homeworld:</strong>' + '</p>';
    fetch(data.homeworld)
       .then(response => response.json()) 
       .then(homeworldData => {
            dataInfo += `<p><strong>Name:</strong> ${homeworldData.name}</p>`;
            dataInfo += `<p><strong>Rotation Period:</strong> ${homeworldData.rotation_period}</p>`;
            dataInfo += `<p><strong>Orbital Period:</strong> ${homeworldData.orbital_period}</p>`;
            dataInfo += `<p><strong>Diameter:</strong> ${homeworldData.diameter}</p>`;
            dataInfo += `<p><strong>Climate:</strong> ${homeworldData.climate}</p>`;
            dataInfo += `<p><strong>Gravity:</strong> ${homeworldData.gravity}</p>`;
            dataInfo += `<p><strong>Terrain:</strong> ${homeworldData.terrain}</p>`;
            dataInfo += `<p><strong>Surface Water:</strong> ${homeworldData.surface_water}</p>`;
            dataInfo += `<p><strong>Population:</strong> ${homeworldData.population}</p>`;
            if (homeworldData.residents) {
                dataInfo += `<p><strong>Residents:</strong></p>`;
                homeworldData.residents.forEach(residents => {
                    dataInfo += `<p>${residents}</p>`;
                })
            }
            if (homeworldData.films.length) {
                dataInfo += `<p><strong>Films:</strong></p>`;
                homeworldData.films.forEach(film => {
                    dataInfo += `<p>${film}</p>`;
                });
            }
            dataInfo += `<p><strong>Created:</strong> ${homeworldData.created}</p>`;
            dataInfo += `<p><strong>Edited:</strong> ${homeworldData.edited}</p>`;
            dataInfo += `<p><strong>URL:</strong> ${homeworldData.url}</p>`;
            dataInfo += '<p><strong>films:</strong></p>';
            dataInfo += '<ul>';
            let filmPromises = data.films.map(filmLink => { 
                return fetch(filmLink) 
                   .then(response => response.json())
                   .then(filmData => {
                        dataInfo += '<li>' + filmData.title + ' (' + filmData.release_date + ')</li>';
                        dataInfo += `<p><strong>episode_id:</strong> ${filmData.episode_id}</p>`;
                        dataInfo += `<p><strong>opening_crawl:</strong> ${filmData.opening_crawl}</p>`;
                        dataInfo += `<p><strong>director:</strong> ${filmData.director}</p>`;
                        dataInfo += `<p><strong>producer:</strong> ${filmData.producer}</p>`;
                        if (filmData.characters) {
                            dataInfo += `<p><strong>characters:</strong></p>`;
                            filmData.characters.forEach(characters => {
                                dataInfo += `<p>${characters}</p>`;
                            })
                        }
                        if (filmData.planets) {
                            dataInfo += `<p><strong>planets:</strong></p>`;
                            filmData.planets.forEach(planets => {
                                dataInfo += `<p>${planets}</p>`;
                            })
                        }
                        dataInfo += `<p><strong>starships:</strong></p>`;
                        filmData.starships.forEach(starships => {
                            dataInfo += `<p>${starships}</p>`;
                        })
                        dataInfo += `<p><strong>vehicles:</strong></p>`;
                        filmData.vehicles.forEach(vehicles => {
                            dataInfo += `<p>${vehicles}</p>`;
                        })
                        dataInfo += `<p><strong>species:</strong></p>`;
                        filmData.species.forEach(species => {
                            dataInfo += `<p>${species}</p>`;
                        })
                        dataInfo += `<p><strong>created:</strong> ${filmData.created}</p>`;
                        dataInfo += `<p><strong>edited:</strong> ${filmData.edited}</p>`;
                        dataInfo += `<p><strong>url:</strong> ${filmData.url}</p>`;
                   })
                   .catch(error => {
                        console.error('Error fetching film:', error);
                        dataInfo += '<li>Error fetching film</li>';
                   });
            });

            Promise.all(filmPromises) // espera a que todas las promesas se resuelvan
                .then(() => { 
                    dataInfo += '</ul>';
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
        

})}