
const armasDisponibles = [
    {
        nombre: 'Sheriff',
        precio: 10,
        disponible: true
    },
    {
        nombre: 'Phantom',
        precio: 20,
        disponible: true
    },
    {
        nombre: 'Vandal',
        precio: 20,
        disponible: true
    },
    {
        nombre: 'Operator',
        precio: 50,
        disponible: true
    }
]

let carritoCompras = {
    productos: [],
    total: 0
}

const sumarIva = () => {
    return carritoCompras.total * 1.21
}

const validarCantidad = (cantidad) => {
    return cantidad && parseInt(cantidad) > 0;
}

const validarNombre = (nombre) => {
    if (nombre.toLowerCase() === 'fin') return true
    return nombre && armasDisponibles.some(arma => nombre.toUpperCase() === arma.nombre.toUpperCase())
}

const sumarAlCarrito = (armaParametro) => {
    const armaEncontrada = armasDisponibles.find(armaDisponible => armaDisponible.nombre.toUpperCase() === armaParametro.nombre.toUpperCase())
    carritoCompras.productos.push({...armaEncontrada, cantidad: Number (armaParametro.cantidadP) })
    carritoCompras.total += (armaParametro.cantidadP * armaEncontrada.precio)
}

function comprar() {
    do {
        var nombreArma = prompt('Ingrese el nombre del arma:');
        while (!validarNombre(nombreArma)) {
            nombreArma = prompt("Por favor ingrese un nombre");
        }
        if (nombreArma.toLowerCase() === "fin") {
            break;
        } else {
            nombreP = nombreArma;
            var cantidadP = prompt('Ingrese la cantidad que desea comprar:');
            while (!validarCantidad(cantidadP)) {
                cantidadP = prompt(" Ingrese un numero mayor a 0");
            }
        }
        sumarAlCarrito({nombre: nombreArma, cantidadP})
    }


    while (nombreArma != "fin" || nombreArma != "FIN" || nombreArma != "Fin")

    console.log(carritoCompras)
    console.log('El precio con IVA: ' + sumarIva())

    alert('El total a pagar es: ' + carritoCompras.total)
    alert('El total a pagar (con IVA) es de $' + sumarIva())
}

