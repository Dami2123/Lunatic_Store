//En esta seccion llamo los elementos que son necesarios para ver  reflejados los productos que se haya agregado el carrito, el total de carrito y vaciar carrito
let carritoProductos = document.querySelector("#contenedor_productos");
let conte_total = document.querySelector(".contenedor_total_inicial");
let valor_total = document.querySelector(".valor_total");
let vaciar = document.querySelector(".vaciar")

// declaro los elementos para leva el contador que se muestra en el icono de carrito
let contador = 0;
let num_contador = document.querySelector(".cnt");
let cont = localStorage.getItem("cantidades");

if (cont != null) {
    contador = Number(cont);
    num_contador.classList.replace("contador_inicial", "contador");
    num_contador.innerText = ` ${contador}`;
}
if (contador === 0) {
    num_contador.classList.replace("contador", "contador_inicial");
}


//Acá uso fetch para rescatar los productos del catalogo y actualizar los productos ya agrgados al carrito en la página de catalogo
let productosCatalogo = [];
let carrito_compra = new Carrito();
fetch("../js/catalogo.json").then((response) => response.json())
    .then((data) => {
        productosCatalogo = data;
        ObtenerCarrito(productosCatalogo);
    })



function ObtenerCarrito(catalogo) {
    //agrego los productos ya agregados al carrito para que no se reinicie  y se pierda esa información
    let carrito_activo = JSON.parse(localStorage.getItem("carrito_compra"));
    if (carrito_activo != null) {
        let carrito_inicial = Number(carrito_activo.productos.length);

        if (carrito_inicial > 0) {

            for (let objeto of carrito_activo.productos) {
                carrito_compra.agregar(objeto.codigo, catalogo, objeto.cantidad);
            }
        }
    }

    //aca  se agregan productos que hay en el carrito  y si hay no muestra el mensaje del carrito vacío
    function CargarCarrito() {
        if (carrito_compra.productos.length > 0) {
            carritoProductos.innerHTML = "";

            for (const articulo of carrito_compra.productos) {
                let div = document.createElement("div");
                div.classList.add("subcontenedor__carrito");
                let clase_btnB = ` .botonB_${articulo.codigo}`
                let clase_btnA = ` .botonA_${articulo.codigo}`
                let clase_cant = ` .cant${articulo.codigo}`
                let id = Number(articulo.codigo)
                div.innerHTML = `
                                <img class="img_carrito redes" src="${articulo.imagen}">
                                <div class="detalles">
                                <div class="elementos_carrito titulo_carrito"> ${articulo.nombre} </div>
                                <div class="elementos_carrito"> Precio unitario: $${articulo.precio_unit} </div>
                                </div>
                                <div class="elementos_carrito cambio_cant">  
                                <button class="boton_b boton_cant ${clase_btnB}" id=${id}>-</button>
                                <p class= "precio  cantidades ${clase_cant} ">${articulo.cantidad} </p>
                                <button class="boton_cant boton_ ${clase_btnA}" id=${id}>+</button> </div>
                                <div class="elementos_carrito titulo_carrito"> $${articulo.precio_total_cant} </div>
                                `
                carritoProductos.append(div);
                
                // Se habilita la vista del contenedor que muestra el total del carrito
                conte_total.classList.replace("contenedor_total_inicial", "contenedor_total")
                valor_total.innerText = `Total: $${carrito_compra.total}`
            }
        } else {
            //se geners el mensaje de carrito vacio
            carritoProductos.innerHTML = "";
            conte_total.classList.replace("contenedor_total", "contenedor_total_inicial")
            if (contador === 0) {
                num_contador.classList.replace("contador", "contador_inicial");
            }
            let div = document.createElement("div");
            div.innerHTML = `
                             <img  src="../img/carro.png">
                            <p class="tituloh"> Tu carrito está vacío</p>
                             `
            carritoProductos.append(div);
        }

        //Se activan los eventos para agregar y eliminar productos del carrito
        botones_agregar = document.querySelectorAll(".boton_");
        botones_borrar = document.querySelectorAll(".boton_b");
        botones_agregar.forEach(boton => {
            boton.addEventListener("click", (btn) => {
                let articulo = carrito_compra.productos.find(i => i.codigo === Number(btn.currentTarget.id))
                carrito_compra.agregar(articulo.codigo, catalogo, 1)

                //se lleva el contador que muestra el total de productos en el icono del carrito
                contador = carrito_compra.cantidadTotal()
                num_contador.innerText = ` ${contador}`;

                //Se aplica recursividad para que se actualicen los cambios que se producen al agregar y restar productos al carrito
                CargarCarrito()

                localStorage.setItem('carrito_compra', JSON.stringify(carrito_compra));
                localStorage.setItem('cantidades', contador);


            })

        })
        botones_borrar.forEach(boton => {
            boton.addEventListener("click", (btn) => {
                let articulo = carrito_compra.productos.find(i => i.codigo === Number(btn.currentTarget.id));
                carrito_compra.eliminar(articulo.codigo);

                //se lleva el contador que muestra el total de productos en el icono del carrito
                contador = carrito_compra.cantidadTotal();
                num_contador.innerText = ` ${contador}`;

                //Se aplica recursividad para que se actualicen los cambios que se producen al agregar y restar productos al carrito
                CargarCarrito()
                localStorage.setItem('carrito_compra', JSON.stringify(carrito_compra));
                localStorage.setItem('cantidades', contador);
            })

        })
    }

    //Se implementa la función que despliega los productos agregados al carrito
    CargarCarrito()


    //aca se declara el evento para que se vacie el carrito con el boton vaciar y se muestra el mensaje de carrito vacío

    vaciar.addEventListener("click", () => {
        localStorage.removeItem("carrito_compra")
        localStorage.removeItem("cantidades")
        num_contador.classList.replace("contador", "contador_inicial");
        carritoProductos.innerHTML = `
                                        <div>
                                        <img  src="../img/carro.png">
                                        <p class="tituloh"> Tu carrito está vacío</p>
                                        <div/>       `;
        conte_total.classList.replace("contenedor_total", "contenedor_total_inicial")
    })

}
