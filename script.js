const musica = document.getElementById('musica-fondo');
const cajaDialogo = document.querySelector('.dialogo');
const sonidoSeleccion = document.getElementById('sonido-seleccion');

const btnTactilIzq = document.getElementById('btn-tactil-izq');
const btnTactilDer = document.getElementById("btn-tactil-der");
const btnTactilZ = document.getElementById("btn-tactil-z");
const btnTactilS = document.getElementById("btn-tactil-s");

function simularTeclaFisica(nombreTecla) {
    const eventoArtifical = new KeyboardEvent('keydown', { key: nombreTecla, code: nombreTecla});
    window.dispatchEvent(eventoArtifical); 
}

btnTactilZ.addEventListener("click", (e) => {
    e.stopPropagation();
    simularTeclaFisica("z");
});

btnTactilS.addEventListener("click", (e) => {
    e.stopPropagation();
    simularTeclaFisica("s");
});

btnTactilIzq.addEventListener("click", (e) => {
    e.stopPropagation();
    simularTeclaFisica("ArrowLeft");
});

btnTactilDer.addEventListener("click", (e) => {
    e.stopPropagation();
    simularTeclaFisica("ArrowRight");
});

let indiceActual = 0;

const playlist = [
    "music/Acid Tunnel of Love.mp3",
    "music/Ferris Wheel.mp3",
    "music/Ichinichi no Hajimari.mp3",
    "music/707Goshitsu.mp3",
    "music/Yachin ga Hanbun!_.mp3",
    "music/Koisuru Hachi.mp3",
    "music/Aitaiyo.mp3",
    "music/You Can Always Come Home.mp3",
    "music/Hotel.mp3",
    "music/Lancer.mp3",
    "music/Friendship.mp3",
    "music/Dating Start!.mp3",
    "music/Last Goodbye.mp3",
    "music/THE WORLD REVOLVING.mp3",
    "music/WELCOME TO THE CITY.mp3",
    "music/Hip Shop.mp3",
    "music/Shop.mp3",
    "music/Home.mp3",
    "music/Can You Really Call This A Hotel, I Didn't Receive A Mint On My Pillow Or Anything.mp3"
]

const mensajitos = [
    ["holaa mi ladyy, t molesto otra vez jij..", "pero si t qdas un ratito por aca t deje unos mensajitos q t saldran..", "asiq no t vayas tan rapido;)", "o sal si quieres ns XD"],
    ["oyee cielitoo, sabias q al presionar S puedes saltar a la siguiente cancion?", "por si quieres jij"],
    ["algunos meteoritos se ven raros no", "no programe bn je",],
    ["esta bonita la noche, no?", "y hay luna llena, justo para ti mi lobita;)", "auuuu"],
    ["y q taal mi princesita?, t gusta la vista?...", "es tan hermosa cm tu;)"],
    ["niñachay mira, una estrella q se cae🗣️", "pide un deseo🗣️🗣️", "los emojis salen raros no XDDd"],
    ["oye sbs q estuve pensando...", "si el cometa se llama switf-tuttle y en tu cumple se ve..", "entons eres una swiftie? owo", "ya si"],
    ["oyee y cm esta rumi?..", "aun m acuerdo d la fto q m mandaste d cm ella estaba durmiendo contigo ufuff", "envidia", "(y si, si m he imaginado q era yo el q estaba durmiendo en tu hombro je)", "(algun dia..)", "(ojala pronto owo)"],
    ["holam, texto d pruebita:v", "jojoj, a ver si sale este", "lady eres hermosa, qn es emma stone a tu lado, quiero besarte y hacer mas cositas, ñamñam", "si salio XDDDD", "...", "m dio flojera borrar las pruebitas q hice jej", "y emma si es bonita ya"],
    ["(imagina q estamos juntos sentados viendo el cielo...)", "(m acerco lentamente a ti, te tomo la mano...)", "(t acomodo el pelo atras d la oreja y t miro fijamente..)", "(y acercandome lenta y suavemente a tu oido, t digo...)", "...", "mi amor...", "t acuerdas cuando t gane 16-10 en plato?...", "JOJOJOJO, NUNCA M OLVIDARE🗣️🗣️", "(lo d los bolos no importa ya)"],
    ["sigues aqui..?", "...", "te amo;)"]
]

let listadialogos = [];

dialogoActual = 0;

const contenedorTexto = document.getElementById('texto');
const sonidoLetra = document.getElementById('sonido-letra');

let letraActual = 0;
const velocidadEscritura = 100;

const contenedorOpciones = document.getElementById('contenedor-opciones');
let mostrandoOpciones = false;
let opcionSeleccionada = 0;

const contenedorInicio = document.getElementById('inicio');
let pantallaInicio = true;
let textoInicio = "";
let letraInicioActual = 0;
let indicemensajito = 0;
let escribiendo = false;
let salto = false;
let ini = true;
let exp = false;
let diag2 = false;
let msg = false;
let temp;

const esCelular= ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);;

if (esCelular) {
    textoInicio = "presiona para iniciar;)";
    listadialogos = [
        "ladyy, holaam (presiona z para el siguiente jij)",
        "t hice esta paginita por tu cumplee (ya sbs soy d chistemas), espero t guste uwu..",
        "entons empiezoxd",
        "por cierto, si quieres poner en pantalla completa solo echa tu cel:b",
        "yyy nda, queria desearte un feliz cumplee, espero q t gustee esta paginitaa, lo hice con amor solo para ti;)",
        "y t queria hacer una pregunta...",
        "sbs q sucede hoy? (aparte d tu cumple aja)...",
    ]
}
else {
    textoInicio = "haz click para iniciar;)";
    listadialogos = [
        "ladyy, holaam (presiona z para el siguiente jij)",
        "t hice esta paginita por tu cumplee (ya sbs soy d chistemas), espero t guste uwu..",
        "entons empiezoxd",
        "por cierto, si quieres poner en pantalla completa presiona f11;)",
        "yyy nda, queria desearte un feliz cumplee, espero q t gustee esta paginitaa, lo hice con amor solo para ti;)",
        "y t queria hacer una pregunta...",
        "sbs q sucede hoy? (aparte d tu cumple aja)...",
    ]
}

function dialogos2() {
    diag2 = true;
    listadialogos.length = 0;
    listadialogos.push(
        "uhh ok, entons nos saltamos la explicacion je..",
        "t dejo para q disfrutes d la lluviaa..",
        "disfruta mi vida ;)"
    )
}

function explicacion() {
    exp = true;
    listadialogos.length = 0;
    listadialogos.push(
        "no? JO JO JO",
        "entoons t explicoo..", 
        "ns si sabias pero cada año entre julio y agosto maso..",
        "hay una lluvia de meteoritos q se llama perseidas...",
        "se da debido a q la tierra pasa por los fragmentos o algo asi d un cometa llamado swift-tuttle...",
        "y t hice esta paginita para simular esa lluvia:b",
        "oye y sbss..",
        "el dia dnd se puede observar mas meteoritos es justo el 12 de agosto, osea tu cumplee:b (mi dia fav;) )...",
        "osea caen bastantes solo para alumbrar tu noche;)",
        "y sbs, vi una fotazo q se tomo justo el dia q naciste dnd habian un monton d meteoritos",
        "y obvio q caerian varios, si ese dia nacio una estrella uwu..",
        "ufufufff",
        "y sbs...",
        "para mi q tmb los meteoritos del cometa se acercan a la tierra justo en tu cumple para poder verte uwu...",
        "y los entiendo sbs...", 
        "si fuera un meteorito, tmb vendria para poder verte...",
        "pq d vrd eres lo q mas amo, y m haces sentir demasiadas cosas q ufff...",
        "y por eso cda dia, y en especial hoy, deseo tmb poder hacer lo mismo para tii...",
        "y pq?...",
        "pq t amo mucho..:b",
        "y por eso t hice esta pagina, espero algun dia poder ir y ver la lluvia juntitos...",
        "y dsps dormirnos abrazaditos uwu (es mi sueño dormir juntos algun dia jej)..",
        "aunq seguro t termine botando d la cama, ya q m muevo un monton dormido XDDD",
        "ya si",
        "creo q desde algunas zonas en provincia se puede ver, ya sbs, el cielo esta mas despejado por alla y asi...",
        "pero por mientras queria q las pudieras ver al menos por aca:b..",
        "tmb puse algunas canciones ns si t gusten jij (si quieres q ponga otras m avisas:D)...",
        "espero q tmb t sirva para relajarte un pco sbs, si un dia t sientes mal o desanimada...",
        "espero q puedas entrar aqui y relajarte un pco...",
        "por mientras t dejo para q disfrutes d la lluviaa..",
        "disfruta mi amor;)"
    )
}

function inicio() {
    if (letraInicioActual < textoInicio.length) {
        contenedorInicio.textContent += textoInicio.charAt(letraInicioActual);
        letraInicioActual++;
        setTimeout(inicio, 50);
    }
}

inicio();

function escribirTexto() {
    const dialogoTexto = listadialogos[dialogoActual];
    if (letraActual < dialogoTexto.length) {
        contenedorTexto.textContent += dialogoTexto.charAt(letraActual);
        sonidoLetra.currentTime = 0;
        sonidoLetra.play();
        letraActual++;
        escribiendo = true;
        salto = false;
        if (dialogoTexto === "aunq seguro t termine botando d la cama, ya q m muevo un monton dormido XDDD" || dialogoTexto === "o sal si quieres ns XD" || dialogoTexto === "los emojis salen raros siono XDDd" || dialogoTexto === "(y si, si m he imaginado q era yo el q estaba durmiendo en tu hombro je)" || dialogoTexto === "lady eres hermosa, qn es emma stone a tu lado, quiero besarte y hacer mas cositas, ñamñam" || dialogoTexto === "y emma si es bonita ya" || dialogoTexto === "JOJOJOJO, NUNCA M OLVIDARE🗣️🗣️" || dialogoTexto === "(lo d los bolos no importa ya)") {
            setTimeout(escribirTexto, velocidadEscritura/2)
        }
        else {
            setTimeout(escribirTexto, velocidadEscritura);
        }
    }
    else {
        sonidoLetra.pause();
        escribiendo = false;
        if (ini === true && dialogoActual === 6) {
            ini = false;
            btnTactilIzq.classList.remove('oculto');
            btnTactilDer.classList.remove('oculto'); 
            mostrandoOpciones = true;
            contenedorOpciones.classList.remove('oculto');
        }
        if (msg === true && esCelular === true && dialogoTexto === "por si quieres jij") {
            btnTactilS.classList.remove('oculto');
        }
    }
}

function actualizarOpciones() {
    const opcionesHTML = document.querySelectorAll('.opcion');
    opcionesHTML.forEach((opcion, index) => {
        if (index === opcionSeleccionada) {
            opcion.classList.add('activa');
        }
        else {
            opcion.classList.remove('activa');
        }
        sonidoSeleccion.pause();
        sonidoSeleccion.currentTime = 0;
        sonidoSeleccion.play();
    });
}

function lanzarmensajito() {
    console.log('msg true')
    msg = true;
    const mensajeElegido = mensajitos[indicemensajito];
    listadialogos.length = 0;
    listadialogos.push (...mensajeElegido);
    letraActual = 0;
    dialogoActual = 0;
    contenedorTexto.textContent = '';
    console.log('limpiando..')
    cajaDialogo.classList.remove('oculto');
    escribirTexto(mensajeElegido);
}

window.addEventListener('keydown', (evento) => {
    if (mostrandoOpciones) {
        const opcionesHTML = document.querySelectorAll('.opcion');
        if (evento.key === 'ArrowRight') {
            if (opcionSeleccionada < opcionesHTML.length - 1) {
                opcionSeleccionada++;
                actualizarOpciones();
            }
        }
        if (evento.key === 'ArrowLeft') {
            if (opcionSeleccionada > 0) {
                opcionSeleccionada--;
                actualizarOpciones();
            }
        }
        if (evento.key === 'z' || evento.code === 'Z') {
            contenedorTexto.textContent = '';
            const valorElegido = opcionesHTML[opcionSeleccionada].getAttribute('data-valor');
            mostrandoOpciones = false;
            btnTactilIzq.classList.add('oculto');
            btnTactilDer.classList.add('oculto'); 
            contenedorOpciones.classList.add('oculto');
            letraActual = 0;
            if (valorElegido === 'si') {
                listadialogos.length = 0;
                dialogos2();
            }
            else {
                listadialogos.length = 0;
                explicacion();
            }
            letraActual = 0;
            dialogoActual = -1;
            escribirTexto();
        }
    }
    return;
}); 

let primeraInteraccion = true;

window.addEventListener('click', () => {
    if (primeraInteraccion) {
        pantallaInicio = false;
        contenedorInicio.textContent = '';
        cajaDialogo.classList.remove('oculto');
        escribirTexto();
        primeraInteraccion = false;
    }
});

window.addEventListener('keydown', (evento) => {
    if (evento.key === 'z' || evento.code === 'Z') {
        console.log('presionaste Z');
        if (dialogoActual < listadialogos.length - 1) {
            if (exp === true && dialogoActual === 1) {
                musica.src = playlist[0];
                musica.volume = 0.7;
                musica.play();
                window.iniciarMeteoritos();
            }
            if (escribiendo === true) {
                console.log('saltaste dialogo');
                salto = true;
                sonidoLetra.pause();
            }
            dialogoActual++;
            letraActual = 0;
            contenedorTexto.textContent = '';
            console.log('limpiando..')
            escribirTexto();
        }
        else if (dialogoActual === listadialogos.length - 1) {
            if (exp === true) {
                console.log('exp false');
                exp = false;
                contenedorTexto.textContent = '';
                cajaDialogo.classList.add('oculto');
                setTimeout(() => {
                    temp = setTimeout(lanzarmensajito(), 150000);
                }, 10000);
            }
            if (diag2 === true) {
                console.log('diag2 false')
                diag2 = false;
                contenedorTexto.textContent = '';
                console.log('limpiando..')
                cajaDialogo.classList.add('oculto');
                musica.src = playlist[0];
                musica.volume = 0.7;
                musica.play();
                window.iniciarMeteoritos();
                setTimeout(() => {
                    temp = setTimeout(lanzarmensajito(), 150000);
                }, 10000);
            }
            if (msg === true) {
                console.log('msg false');
                msg = false;
                indicemensajito++;
                contenedorTexto.textContent = '';
                cajaDialogo.classList.add('oculto');
                setTimeout(() => {
                    temp = setTimeout(lanzarmensajito(), 120000);
                }, 120000);
            }
        }
    }
});

musica.addEventListener('ended', () => {
    if (exp === true) {
        indiceActual = (indiceActual+1) % 2;
        musica.src = playlist[indiceActual];
        musica.volume = 0.7;
        musica.play();
        return;
    }
    indiceActual = indiceActual + 1;
    indiceActual = indiceActual % playlist.length;
    musica.src = playlist[indiceActual];
    musica.volume = 0.7;
    musica.play();
    console.log('cambiando a canción ' + indiceActual);
});

window.addEventListener('keydown', (evento) => {
    if (evento.key === 's' || evento.code === 'S') {
        evento.preventDefault();
        if (!musica.paused) {
            musica.pause();
            if (indiceActual === playlist.length-1) {
                console.log('no qdan mas unu')
                indiceActual = 0;
                musica.src = playlist[indiceActual];
                musica.volume = 0.7;
                musica.play();
                return;
            }
            else {
                console.log('siguiente:b');
                indiceActual++;
                musica.src = playlist[indiceActual];
                musica.volume = 0.7;
                musica.play();
                return;
            }
            
        }
        else {
            
        }
    }
})
