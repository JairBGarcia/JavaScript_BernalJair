function fetchSuperhero() {
    let xhr = new XMLHttpRequest();
    let heroid = document.getElementById('heroid').value;
    let apikey = "1208ec84e169943abe18ec51f1f709ee";
    let url = `https://superheroapi.com/api.php/${apikey}/${heroid}`;

    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let hero = JSON.parse(this.responseText);
                console.log(hero);
                if (hero) {
                    displayHero(hero);
                } else {
                    showError('Error: No se encontraron datos del héroe.');
                }
            } else {
                showError('Error: ' + this.statusText);
            }
        }
    };
    xhr.send();
}

function displayHero(hero) {
    let heroInfo = `<h2>${hero.name}</h2>`;
    heroInfo += `<img src="${hero.image.url}" alt="Image of ${hero.name}" style="width:100px;"><br><br>`;
    heroInfo += `<div id='categoryData'></div>`;
    document.getElementById('superheroInfo').innerHTML = heroInfo;

    const categories = ['powerstats', 'biography', 'appearance', 'work', 'connections'];
    categories.forEach(category => {
        let data = hero[category];
        if (data) {
            let button = document.createElement('button');
            button.textContent = capitalizeFirstLetter(category);
            button.onclick = function() {
                displayCategory(category, data);
            };
            document.getElementById('superheroInfo').appendChild(button);
        }
    });
}

function displayCategory(category, data) {
    let container = document.getElementById('categoryData');
    container.innerHTML = `<h3>${capitalizeFirstLetter(category)}</h3>`;

    if (data && typeof data === 'object' && !Array.isArray(data)) {
        Object.entries(data).forEach(([key, value]) => {
            let formattedValue = value;
            if (Array.isArray(value)) {
                formattedValue = value.join(' / '); 
            }
            container.innerHTML += `<p><strong>${capitalizeFirstLetter(key)}:</strong> ${formattedValue}</p>`;
        });
    } else {
        container.innerHTML += `<p>${data}</p>`;
    }
}

function showError(message) {
    document.getElementById('superheroInfo').innerHTML = message;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
    