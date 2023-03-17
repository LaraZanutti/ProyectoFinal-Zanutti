Swal.fire({
    title: 'Generando orden',
    html: 'Por favor espere...',
    timer: 3000,
    timerProgressBar: true,
    allowOutsideClick: false,
    width: 600,
    padding: '3em',
    color: '#716add',
    background: '#fff url(/images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("/imagenes/nyan-cat.gif")
      left top
      no-repeat
    `,
    didOpen: () => {
      Swal.showLoading()
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
        renderProductoTablaOrden()
    }
  })


function renderProductoTablaOrden() {
    document.getElementById('tbodyOrden').innerHTML = ''
    document.getElementById('tablaOrden').style.visibility = 'visible'

    JSON.parse(localStorage.getItem('orden')).productos.forEach(producto => {
        document.getElementById('tbodyOrden').innerHTML += `<td><img width="75" src=${producto.image} /></td><td>${producto.nombre}</td><td>${producto.cantidad}</td><td>${producto.precio}</td><td>${producto.cantidad * producto.precio}</td>`
    })
    document.getElementById("totalCompra").innerHTML = `<b style="color: green; font-size: 25px;">TOTAL $${JSON.parse(localStorage.getItem('orden')).totalCompra} </b>`
}
