// variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear(); // obtiene el año máximo o en el que estamos
const min = max - 10;

// generar un objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // llamamos la función mostrarAutos

    // llena las opciones de años
    llenarSelect();
});

// event listener para los select de búsqueda
marca.addEventListener('change', (event) => {
    /* muestra lel valor del select al seleccionar un valor */
    // console.log(event.target.value);
    datosBusqueda.marca = event.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();
});

year.addEventListener('change', (event) => {
    datosBusqueda.year = parseInt(event.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', (event) => {
    datosBusqueda.minimo = event.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', (event) => {
    datosBusqueda.maximo = event.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', (event) => {
    datosBusqueda.puertas = parseInt(event.target.value);
    filtrarAuto();
});

transmision.addEventListener('change', (event) => {
    datosBusqueda.transmision = event.target.value;
    filtrarAuto();
});

color.addEventListener('change', (event) => {
    datosBusqueda.color = event.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();
});

// funciones
function mostrarAutos(autos) {
    limpiarHTML(); // elimina el html previo
    autos.forEach( auto => {
        const autoHTML = document.createElement('p'); // creamos un párrafo para cada automóvil
        // destructuring object
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        autoHTML.textContent = `
            ${marca} 
            ${modelo} -
            ${year} -
            $${precio} -
            ${puertas} Puertas -
            Color: ${color} -
            Transmisión: ${transmision}
        `;

        // insertar en el HTML
        resultado.appendChild(autoHTML);
    })
}

// limpiar HTML
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// genera los años del select
function llenarSelect() {
    // console.log('llenando el select');
    for(let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // agrega las opciones de año al select
    }
}

// funcion que filtra en base a la búsqueda
function filtrarAuto() {
    // console.log('filtrando...');
    // arraymethod FILTER
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).
    filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).
    filter(filtrarTransmision).filter(filtrarColor); /* función de alto nivel porque es una función que toma otra función */
    // console.log(resultado);

    if(resultado.length) {
        mostrarAutos(resultado);
    }
    else {
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados disponibles';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    // console.log(auto);
    const {marca} = datosBusqueda;
    if(marca) {
        return auto.marca === marca;
    }
    else {
        return auto;
    }
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if(year) {
        return auto.year === year;
    }
    else {
        return auto;
    }
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo;
    }
    else {
        return auto;
    }
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    else {
        return auto;
    }
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    // console.log(typeof puertas);
    // console.log(typeof auto.puertas);
    if(puertas) {
        return auto.puertas === puertas;
    }
    else {
        return auto;
    }
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
    else {
        return auto;
    }
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    else {
        return auto;
    }
}