//Listeners:

document.addEventListener('DOMContentLoaded', setArmasAndListeners);
document.addEventListener('DOMContentLoaded', actualizarVariableCarrito);
document.addEventListener('DOMContentLoaded', mostrarCantidadCarrito);

async function setArmasAndListeners() {
    armas = await armasDisponibles()
    document.getElementById("Sheriff").addEventListener("click", comprar)
    document.getElementById("Phantom").addEventListener("click", comprar)
    document.getElementById("Vandal").addEventListener("click", comprar)
    document.getElementById("Operator").addEventListener("click", comprar)
    document.getElementById('carrito').addEventListener('click', renderProductoTabla)
    document.getElementById('btnComprar').addEventListener('click', comprarCheck)
}

let armas = []

let carritoCompras = {
    productos: [],
    totalCantidad: 0
}

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


function comprar(e) {
    const producto = armas.find((arma) => arma.nombre === e.target.id)
    const estaDuplicado = validarDuplicado(producto)
    if (carritoCompras.productos.length === 0 || !estaDuplicado) {
        carritoCompras.productos.push(producto)
    }
    guardarCarrito()
    Toast.fire({
        icon: 'success',
        title: `Agregaste ${producto.nombre} al carrito`
    })
}

function renderProductoTabla() {
    document.getElementById('tbody').innerHTML = ''
    document.getElementById('tabla').style.visibility = 'visible'
    document.getElementById('noHay').style.display = 'none'
    if (JSON.parse(localStorage.getItem('carrito')).productos.length) {
        JSON.parse(localStorage.getItem('carrito')).productos.forEach(producto => {
            document.getElementById('tbody').innerHTML += `<td>${producto.id}</td><td><img width="75" src=${producto.image} /></td><td>${producto.nombre}</td><td>${producto.cantidad}</td><td>${producto.precio}</td><td>${producto.cantidad * producto.precio}</td><td><button type="button" onclick="eliminarProducto(${producto.id})" class="btn btn-outline-danger btn-sm"><i class="fa-solid fa-trash-can mr-2"></i> Eliminar</button></td>`
        })

        document.getElementById("totalCompra").innerHTML = `<b style="color: green; font-size: 25px;">TOTAL $${JSON.parse(localStorage.getItem('carrito')).totalCompra} </b>`
    } else {
        document.getElementById('tabla').style.visibility = 'hidden'
        document.getElementById('noHay').style.display = 'block'
    }
}

function mostrarCantidadCarrito() {
    if (JSON.parse(localStorage.getItem('carrito'))) {
        document.getElementById("cantidadCarrito").innerText = JSON.parse(localStorage.getItem('carrito')).totalCantidad
    } else {
        document.getElementById("cantidadCarrito").innerText = 0
    }
}

function actualizarVariableCarrito() {
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

function eliminarProducto(id) {
    Swal.fire({
        title: 'Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#e9b422',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const index = carritoCompras.productos.findIndex(producto => producto.id === id)
            Toast.fire({
                icon: 'error',
                title: `Eliminaste ${carritoCompras.productos[index].nombre} del carrito`
            })
            carritoCompras.productos[index].cantidad--
            if (carritoCompras.productos[index].cantidad === 0) {
                carritoCompras.productos.splice(index, 1)
            }
            guardarCarrito()
            renderProductoTabla()
        }
    })
}

const guardarCarrito = () => {
    const totalCantidad = carritoCompras.productos.reduce((acc, producto) => acc + producto.cantidad, 0)
    const totalCompra = carritoCompras.productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)

    carritoCompras.totalCompra = totalCompra
    carritoCompras.totalCantidad = totalCantidad

    localStorage.setItem('carrito', JSON.stringify(carritoCompras))
    mostrarCantidadCarrito()
};

function generateId() {
    if (localStorage.getItem('orden')) {
        return JSON.parse(localStorage.getItem('orden')).id + 1
    }
    return 1
}

function comprarCheck() {
    Swal.fire({
        title: 'Quieres finalizar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#358f0c',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            const orden = {
                ...JSON.parse(localStorage.getItem('carrito')),
                id: generateId()
            }
            localStorage.setItem('orden', JSON.stringify(orden))
            window.location.href = '/paginas/ordenCompletada.html';
        }
    })
}