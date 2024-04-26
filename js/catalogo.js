/*
Aca hago el llamado a al json con la información del catalogo y la hago uso de ella llamando a la funcion AgregarCarrito
*/
let productosCatalogo = [];
fetch("../js/catalogo.json").then((response) => response.json())
    .then((data) => {
        productosCatalogo = data;
        AgregarCarrito(productosCatalogo);
    })


//acá  declaro la funcion l "AgregarCarrito" que se usará dentro del fetch
function AgregarCarrito(productos) {
    //actualiza el contador del icono carrito
    let contador = 0;
    let num_contador = document.querySelector(".cnt");
    let cont = localStorage.getItem("cantidades");

    if (cont != null) {
        contador = Number(cont);
        num_contador.classList.replace("contador_inicial", "contador");
        num_contador.innerText = ` ${contador}`;

    }
    if (contador === 0) {
        num_contador.classList.replace("contador", "contador_inicial")
    }


    let carrito_compra = new Carrito();
    // Declaro un objeto carrito y luego, si es que se han agregado articulos y cambiado de página para luego volver a la página catalogo,
    //agrego los productos ya agregados al carrito para que no se reinicie  y se pierda esa información
    let carrito_activo = JSON.parse(localStorage.getItem("carrito_compra"));
    if (carrito_activo != null) {
        let carrito_inicial = Number(carrito_activo.productos.length);

        if (carrito_inicial > 0) {

            for (let objeto of carrito_activo.productos) {
                carrito_compra.agregar(objeto.codigo, productos, objeto.cantidad);
                let claseA = ` .botonA_${objeto.codigo}`
                let btn_a = document.querySelector(claseA);
                btn_a.innerText = "+";
                btn_a.classList.replace("boton_agregar", "boton_cant");

                let claseB = ` .botonB_${objeto.codigo}`
                let btn_b = document.querySelector(claseB);
                btn_b.innerText = "-";
                btn_b.classList.replace("boton_borrar", "boton_cant");

                let claseC = ` .cant${objeto.codigo}`
                let info_cant = document.querySelector(claseC);
                info_cant.innerText = ` ${objeto.cantidad}`

            }
        }

    }

    //Aca declaro el evento para que se agregue nlos productos  llamando a botones_agregar y si no hay ya productos agregados que muestre
    //las cantidades y ponga disponible el botón para eliminar cantidades
    let botones_agregar = document.querySelectorAll(".boton_");

    botones_agregar.forEach(boton => {

        boton.addEventListener("click", (btn) => {
            let articulo = productos.find(i => i.codigo === Number(btn.currentTarget.id))

            carrito_compra.agregar(articulo.codigo, productos, 1);
            let cantidades = carrito_compra.cantidad(articulo.codigo)

            //aca llevo el contador de los productos que se verán en el icono carrito
            contador = carrito_compra.cantidadTotal()
            if (contador > 0) {
                num_contador.classList.replace("contador_inicial", "contador");
            }
            num_contador.innerText = ` ${contador}`;

           //Uso de la librería Toastify para anunciar que se agregue un producto al carrito
            Toastify({
                text: ` ${articulo.nombre} fue AGREGADO correctamente!`,
                duration: 3000,
                destination: "../html/carrito.html",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                className: "toasti",
                offset: {
                    x: 0,
                    y: 90 
                },
                onClick: function () { } 
            }).showToast();


            if (cantidades > 0) {
                btn.currentTarget.innerText = "+"

                btn.currentTarget.classList.replace("boton_agregar", "boton_cant")
                let clase_cant = ` .cant${btn.currentTarget.id}`
                let div_cant = document.querySelector(clase_cant);

                div_cant.innerText = ` ${cantidades}`


                let clase_btnB = ` .botonB_${btn.currentTarget.id}`
                let btn_eliminar = document.querySelector(clase_btnB);
                btn_eliminar.innerText = "-";
                btn_eliminar.classList.replace("boton_borrar", "boton_cant")
            }


            localStorage.setItem('carrito_compra', JSON.stringify(carrito_compra));
            localStorage.setItem('cantidades', contador);
        })

    })


    //aca llamo al botón para eliminar cantidades y declaro el evento para que se resten las cantidad dando al boton "-"
    let botones_borrar = document.querySelectorAll(".boton_b");


    botones_borrar.forEach(boton => {

        boton.addEventListener("click", (btn) => {
            let articulo = productos.find(i => i.codigo === Number(btn.currentTarget.id))
            carrito_compra.eliminar(articulo.codigo);
            let cantidades = carrito_compra.cantidad(articulo.codigo)
            contador = carrito_compra.cantidadTotal()
            if (contador === 0) {
                num_contador.classList.replace("contador", "contador_inicial");
            }
            num_contador.innerText = ` ${contador}`;
            Toastify({
                text: ` ${articulo.nombre} fue ELIMINADO correctamente!`,
                duration: 3000,
                destination: "../html/carrito.html",
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "center", 
                stopOnFocus: true, 
                className: "toasti",
                offset: {
                    x: 0, 
                    y: 90 
                },
                onClick: function () { } 
            }).showToast();

            let clase_cant = ` .cant${btn.currentTarget.id}`
            let div_cant = document.querySelector(clase_cant);
            if (cantidades > 0) {
                div_cant.innerText = ` ${cantidades}`

            } else {

                let clase_btnA = ` .botonA_${btn.currentTarget.id}`
                let btn_agregar = document.querySelector(clase_btnA);
                btn_agregar.innerText = "Agregar al carrito"

                btn_agregar.classList.replace("boton_cant", "boton_agregar")
                div_cant.innerText = ""

                btn.currentTarget.classList.replace("boton_cant", "boton_borrar")
            }
            if (contador === 0) {
                num_contador.classList.replace("contador", "contador_inicial");
            }

            localStorage.setItem('carrito_compra', JSON.stringify(carrito_compra));
            localStorage.setItem('cantidades', contador);
        })

    })

    
}