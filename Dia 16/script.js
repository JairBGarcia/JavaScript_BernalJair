const cargarUsuarioAleatorio = async () => {
    try {
        const respuesta = await fetch('https://randomuser.me/api/?results=1');
        const { results } = await respuesta.json();
        const usuario = results[0];
        mostrarUsuario(usuario);
    } catch (error) {
        console.error('Error:', error);
    }
};

const mostrarUsuario = (usuario) => {
    const { name, email, dob, location, phone, login, picture } = usuario;
    const formattedBirthday = formatDate(dob.date);

    document.getElementById('perfil').src = picture.large;

    const defaultInfo = `<p id="texto1">Hi, my name is</p>
                        <p>${name.first} ${name.last}</p>`;
    document.getElementById('Cosota').innerHTML = defaultInfo;

    const updateInfo = (elementId, info) => {
        document.getElementById(elementId).addEventListener('mouseover', () => {
            document.getElementById('Cosota').innerHTML = info;
        });
    };

    updateInfo('nombre', `<p id="texto1">Hi, my name is</p>
                          <p>${name.first} ${name.last}</p>`);
    updateInfo('email', `<p id="texto1">My email address is</p>
                         <p>${email}</p>`);
    updateInfo('cumple', `<p id="texto1">My birthday is</p>
                            <p>${formattedBirthday}</p>`);
    updateInfo('ubi', `<p id="texto1">My address is</p>
                            <p>${location.postcode} ${location.country}</p>`);
    updateInfo('cel', `<p id="texto1">My phone number is</p>
                         <p>${phone}</p>`);
    updateInfo('contra', `<p id="texto1">My password is</p>
                           <p>${login.password}</p>`);
};

const formatDate = (dateString) => {
    const birthday = new Date(dateString);
    const day = birthday.getDate();
    const month = birthday.getMonth() + 1;
    const year = birthday.getFullYear();
    return `${day}/${month}/${year}`;
};

    
window.onload = cargarUsuarioAleatorio;
