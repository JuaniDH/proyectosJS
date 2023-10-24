const cuentaInput = document.getElementById('total');
const porcentajeInput = document.getElementById('propina');
const botonCalcular = document.getElementById('calcular');
const mostrarResultado = document.getElementById('precioFinal');
const formulario = document.getElementById('formulario');

const juanito = 'juani';

const texto = `hola yo soy ${juanito}`;

console.log(texto);

formulario.addEventListener('submit', calcularPropina);


function calcularPropina(e) {
    e.preventDefault();

    const cuenta = parseFloat(cuentaInput.value);
    const porcentaje = parseFloat(porcentajeInput.value);

    if (isNaN(cuenta) || isNaN(porcentaje)) {
        mostrarResultado.innerHTML = ''; 
        const alertaError = document.createElement('p');
        alertaError.textContent = 'Por favor, ingrese valores numéricos';
        alertaError.classList.add('alertaError');
        mostrarResultado.appendChild(alertaError);
        return;
    }

    const propina = cuenta * (porcentaje / 100);
    const precioFinal = cuenta + propina;

    mostrarResultado.innerHTML = '';
    const alertaResultado = document.createElement('p');
    alertaResultado.textContent = `Propina a pagar: ${propina.toFixed(2)} / Precio final a pagar: ${precioFinal.toFixed(2)}`;
    alertaResultado.classList.add('alertaResultado')
    mostrarResultado.appendChild(alertaResultado);

}