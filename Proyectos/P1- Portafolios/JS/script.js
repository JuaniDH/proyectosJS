document.addEventListener('DOMContentLoaded', function() {
    //Variables
    const formulario = document.querySelector('#formulario');
    const inputNombre = document.querySelector('#nombre');
    const inputNumero = document.querySelector('#numero');
    const inputCorreo = document.querySelector('#correo');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const btnSubmit = document.querySelector('#enviar');
    const btnReset = document.querySelector('#resetear');
    const correo = {
        nombre: '',
        numero: '',
        correo: '',
        asunto: '',
        mensaje: '',
    }

    //Eventos
    inputNombre.addEventListener('input', validar);
    inputNumero.addEventListener('input', validar);
    inputCorreo.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarMail);
    btnReset.addEventListener('click', function(e) {
        e.preventDefault()

        reset();
    })

    function enviarMail(e) {
        e.preventDefault();

        const enviando = document.createElement('P');
        enviando.textContent = 'Enviando...';
        enviando.classList.add('enviando');
        formulario.appendChild(enviando);

        setTimeout(() => {

            reset();

            enviando.remove();

            const alertaExito = document.createElement('P');
            alertaExito.textContent = 'Mensaje enviado con éxito'
            alertaExito.classList.add('alertaExito');
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 2000);
        }, 2000)


    }


    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarError(`El campo ${e.target.id} debe estar completo`, e.target.parentElement);
            correo[e.target.name] = '';
            activarBoton();
            return;
        }

        if(e.target.id === 'correo' && !comprobarCaracteres(e.target.value)) {
            mostrarError('Los caracteres del email no son válidos', e.target.parentElement);
            correo[e.target.name] = '';
            activarBoton();
            return;
        }


        limpiarAlerta(e.target.parentElement);

        correo[e.target.name] = e.target.value.trim().toLowerCase();

        activarBoton();

    }

    function activarBoton() {
        if(Object.values(correo).includes('')) {
            btnSubmit.classList.add('opacidad');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacidad');
            btnSubmit.disabled = false;
        }
    }

    function mostrarError(mensaje, referencia) {
        const evitarRepeticion = referencia.querySelector('.alertaError');
        if(evitarRepeticion) {
            evitarRepeticion.remove();
        }
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('alertaError');
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const evitarRepeticion = referencia.querySelector('.alertaError');
        if(evitarRepeticion) {
            evitarRepeticion.remove();
        }
    }

    function comprobarCaracteres(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function reset() {
        correo.nombre = ''
        correo.numero = ''
        correo.correo = ''
        correo.asunto = ''
        correo.mensaje = ''
        
        formulario.reset();

        activarBoton();
    }

})