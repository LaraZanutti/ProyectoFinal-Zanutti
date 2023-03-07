//Listeners:
document.getElementById("Sheriff").addEventListener("click", comprar)
document.getElementById("Phantom").addEventListener("click", comprar)
document.getElementById("Vandal").addEventListener("click", comprar)
document.getElementById("Operator").addEventListener("click", comprar)
document.getElementById('carrito').addEventListener('click', renderProductoTabla)
document.getElementById('btnComprar').addEventListener('click', comprarCheck)

document.addEventListener('DOMContentLoaded', actualizarVariableCarrito);
document.addEventListener('DOMContentLoaded', mostrarCantidadCarrito);


let carritoCompras = {
    productos: [],
    totalCantidad: 0
}

function comprar(e) {
    const producto = armasDisponibles.find((arma) => arma.nombre === e.target.id)
    const estaDuplicado = validarDuplicado(producto)
    if (carritoCompras.productos.length === 0 || !estaDuplicado) {
        carritoCompras.productos.push(producto)
    }
    guardarCarrito()
}

function renderProductoTabla() {
    document.getElementById('tbody').innerHTML = ''
    document.getElementById('tabla').style.visibility = 'visible'
    document.getElementById('noHay').style.display = 'none'
    if (JSON.parse(localStorage.getItem('carrito')).productos.length){
        JSON.parse(localStorage.getItem('carrito')).productos.forEach(producto => {
            document.getElementById('tbody').innerHTML += `<td>${producto.id}</td><td><img width="75" src=${producto.image} /></td><td>${producto.nombre}</td><td>${producto.cantidad}</td><td>${producto.precio}</td><td>${producto.cantidad * producto.precio}</td><td><button type="button" onclick="eliminarProducto(${producto.id})" class="btn btn-outline-danger btn-sm"><i class="fa-solid fa-trash-can mr-2"></i> Eliminar</button></td>`
        })
        
        document.getElementById("totalCompra").innerHTML = `<b style="color: green; font-size: 25px;">TOTAL $${JSON.parse(localStorage.getItem('carrito')).totalCompra} </b>`
    } else {
        document.getElementById('tabla').style.visibility = 'hidden'
        document.getElementById('noHay').style.display = 'block'
    }
}

function mostrarCantidadCarrito (){
    if (JSON.parse(localStorage.getItem('carrito'))) {
        document.getElementById("cantidadCarrito").innerText = JSON.parse(localStorage.getItem('carrito')).totalCantidad
    } else {
        document.getElementById("cantidadCarrito").innerText = 0
    }
}

function actualizarVariableCarrito () {
    if (JSON.parse(localStorage.getItem('carrito'))) {
        carritoCompras = JSON.parse(localStorage.getItem('carrito'))
    }
}


const validarDuplicado = (producto) => {
    duplicado = false
    carritoCompras.productos.forEach((item) => {
        if (item.id === producto.id) {
            item.cantidad++
            duplicado = true
        }
    })
    return duplicado
}

function eliminarProducto (id) {
    const index = carritoCompras.productos.findIndex(producto => producto.id === id)
    carritoCompras.productos.splice(index, 1)
    guardarCarrito()
    renderProductoTabla()
}

const guardarCarrito = () => {
    const totalCantidad = carritoCompras.productos.reduce((acc, producto) => acc + producto.cantidad, 0)
    const totalCompra = carritoCompras.productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)

    carritoCompras.totalCompra = totalCompra
    carritoCompras.totalCantidad = totalCantidad

    localStorage.setItem('carrito', JSON.stringify(carritoCompras))
    mostrarCantidadCarrito()
};

function comprarCheck () {
    alert("En desarrollo")
}