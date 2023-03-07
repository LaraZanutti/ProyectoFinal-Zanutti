const render = (armas) => {
    const contenedor = document.getElementById("cards");

    armas.forEach(arma => {
        const div = document.createElement('div');

        div.classList.add('card');
        div.innerHTML += `
                            <img src=${arma.image} class="card-img-top p-5" />
                        <div class="card-body">
                            <h5 class="card-title text-center">${arma.nombre}</h5>
                            <div class="card-content text-center">
                                <p>Precio: $ ${arma.precio}</p>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button type="button" class="btn btn-outline-success btn-lg mt-5" id=${arma.nombre}>
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                       `
        contenedor.appendChild(div);
    });
};