//Variables
const reproductor = document.getElementById('player')
const botonRetroceder = document.querySelector('#retroceder');
const botonPlay = document.querySelector('#play');
const botonPausar = document.querySelector('#pausar');
const botonAvanzar = document.querySelector('#avanzar');
const tituloCancion = document.querySelector('#tituloCancion');
const nombreArtista = document.querySelector('#nombreArtista');
const portadasReproductor = document.getElementById('portada');
const progresoCancion = document.getElementById('barraProgreso');
const controlVolumen = document.getElementById('volumenControl');
const canciones = [
    {
      title: 'En la intimidad',
      artist: 'Emilia, Callejero Fino',
      source: '../songs/en_la_intimidad.mp3',
      portada: '../img/en_la_intimidad_portada.jpg'
    },
    {
      title: 'Donde quiero estar',
      artist: 'Quevedo',
      source: '../songs/donde_quiero_estar.mp3',
      portada: '../img/donde_quiero_estar_portada.jpg'
    },
    {
      title: 'Los del espacio',
      artist: 'LIT killah, Duki, Emilia, Tiago PZK, FMK, Rusherking, Maria Becerra, Big One',
      source: '../songs/los_del_espacio.mp3',
      portada: '../img/los_del_espacio_portada.jpeg'
    },
    {
      title: 'No_se_ve',
      artist: 'Emilia',
      source: '../songs/no_se_ve.mp3',
      portada: '../img/no_se_ve_portada.jpg'
    },
    {
      title: 'BZRP Music session #55',
      artist: 'BZRP, Peso Pluma',
      source: '../songs/peso_pluma_session.mp3',
      portada: '../img/peso_pluma_portada.png'
    }
  ];
let cancionActual = 0;
let posicionActual = 0;

//Eventos
botonPlay.addEventListener('click', reproducirCancion);
botonPausar.addEventListener('click', pausarCancion);
botonAvanzar.addEventListener('click', cancionSiguiente);
botonRetroceder.addEventListener('click', cancionAnterior);
reproductor.addEventListener('timeupdate', actualizarBarraDeProgreso);
reproductor.addEventListener('timeupdate', pasarSiguiente);
controlVolumen.addEventListener('input',  actualizarVolumen);

//Funciones
function cargarCancion(cancion) {
    reproductor.src = cancion.source;
    portadasReproductor.src = cancion.portada;
    document.getElementById('tituloCancion').textContent = cancion.title;
    document.getElementById('nombreArtista').textContent = cancion.artist;
}

function reproducirCancion() {
  cargarCancion(canciones[cancionActual]);
  if(reproductor.paused) {
    reproductor.currentTime = posicionActual;
    reproductor.play().catch(error => {
      console.error('Error al reproducir la canción:', error);
    });
  }
  reproductor.play().catch(error => {
    console.error('Error al reproducir la canción:', error);
  });
}


function pausarCancion() {
  posicionActual = reproductor.currentTime;
  reproductor.pause();
}

function cancionSiguiente() {
  cargarCancion(canciones[cancionActual++]);
  retomarCurrent();
  if(cancionActual >= canciones.length) {
    cancionActual = 0;
    reproducirCancion();
  }
  reproducirCancion();
}

function cancionAnterior() {
  cargarCancion(canciones[cancionActual--]);
  retomarCurrent();
  if(cancionActual < 0) {
    cancionActual = canciones.length - 1;
    reproducirCancion();
  }
  reproducirCancion();
}

function retomarCurrent() {
  posicionActual = 0;
  reproductor.currentTime = posicionActual;
}

function actualizarBarraDeProgreso() {
  const duracion = reproductor.duration;
  const tiempoActual = reproductor.currentTime;
  const porcentajeProgreso = (tiempoActual / duracion) * 100;
  progresoCancion.style.width = `${porcentajeProgreso}%`;

  const segundosTranscurridos = Math.floor(tiempoActual % 60);
  const minutosTranscurridos = Math.floor(tiempoActual / 60);
  const tiempoTranscurrido = `${minutosTranscurridos}:${segundosTranscurridos.toString().padStart(2, '0')}`;

  document.getElementById('tiempoTranscurrido').textContent = tiempoTranscurrido;
}

function pasarSiguiente() {
  if(reproductor.ended) {
    cancionSiguiente();
  }
}

function actualizarVolumen() {
  reproductor.volume = controlVolumen.value;
}