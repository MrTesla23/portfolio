let menuVisible = false;

const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");

// Almacenar los textos y atributos originales al cargar la página
const originalTexts = {};
textsToChange.forEach((textToChange) => {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;
    
    // Guardar el texto y atributos en un objeto
    originalTexts[`${section}-${value}`] = {
        text: textToChange.innerHTML,
        attributes: {
            class: textToChange.getAttribute('class'),
            style: textToChange.getAttribute('style'),
            // Agrega aquí otros atributos que desees guardar
        }
    };
});

const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        // Actualizar el contenido HTML
        textToChange.innerHTML = texts[section][value];
    }
};

// Evento para el cambio del checkbox
flagsElement.addEventListener('change', (e) => {
    const language = e.target.parentElement.querySelector('.flags_items').dataset.language;

    if (e.target.checked) {
        changeLanguage(language); // Cambiar idioma
    } else {
        // Restaurar los textos y atributos originales
        textsToChange.forEach((textToChange) => {
            const section = textToChange.dataset.section;
            const value = textToChange.dataset.value;
            const original = originalTexts[`${section}-${value}`];

            // Restaurar texto
            textToChange.innerHTML = original.text;

            // Restaurar atributos
            if (original.attributes.class) {
                textToChange.setAttribute('class', original.attributes.class);
            } else {
                textToChange.removeAttribute('class'); // Eliminar clase si no existe
            }

            if (original.attributes.style) {
                textToChange.setAttribute('style', original.attributes.style);
            } else {
                textToChange.removeAttribute('style'); // Eliminar estilo si no existe
            }

            // Aquí puedes restaurar otros atributos que hayas guardado
        });
    }
});


function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById('nav').classList='';
        menuVisible = false;
    }else{
        document.getElementById('nav').classList ='responsive';
        menuVisible = true;
    }
}
function seleccionar(){
    document.getElementById('nav').classList = '';
    menuVisible = false;
}

//funcion que aplica las animaciones de las habilidades 
function efectoHabilidades(){
    var skills = document.getElementById('skills');
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName('progress');
        habilidades[0].classList.add('javascript');
        habilidades[1].classList.add('htmlcss');
        habilidades[2].classList.add('exceladvancedandvba');
        habilidades[3].classList.add('microsoftoffice');
        habilidades[4].classList.add('comunication');
        habilidades[5].classList.add('teamwork');
        habilidades[6].classList.add('creavity'); 
        habilidades[7].classList.add('dedication');
        habilidades[8].classList.add('projectmanagement');
    }
}
//detecta el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
}