
/*
Aca hago el llamado a al json con la información del catalogo y la hago uso de ella llamando a la funcion AgregarCarrito
*/
let productos = [];
let respuesta = fetch("../js/catalogo.json").then( (response) => response.json())
 .then( (data) => {
        productos=data;
        AgregarCarrito(productos); 
            
    })


//acá  declaro la funcion l "AgregarCarrito" que se usará dentro del fetch
function AgregarCarrito(productosCatalogo){

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
        console.log(articulo.codigo)
        carrito_compra.agregar(articulo.codigo, productos, 1);
        let cantidades = carrito_compra.cantidad(articulo.codigo)

        Toastify({
            text: ` ${articulo.nombre} fue AGREGADO correctamente!`,
            duration: 3000,
            destination: "../html/carrito.html",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "toasti",
            offset: {
                x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 90 // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            onClick: function(){} // Callback after click
          }).showToast();

        console.log(cantidades)
        if (cantidades > 0) {
            btn.currentTarget.innerText = "+"
            console.log(btn.currentTarget.innerText)
            btn.currentTarget.classList.replace("boton_agregar", "boton_cant")
            let clase_cant = ` .cant${btn.currentTarget.id}`
            let div_cant = document.querySelector(clase_cant);
            console.log("cantidades que sta borrando" + clase_cant)
            console.log("cantidades: " + cantidades)
            div_cant.innerText = ` ${cantidades}`

            console.log("id borrar carrito:" + btn.currentTarget.id)
            let clase_btnB = ` .botonB_${btn.currentTarget.id}`
            let btn_eliminar = document.querySelector(clase_btnB);
            btn_eliminar.innerText = "-";
            btn_eliminar.classList.replace("boton_borrar", "boton_cant")
        }

        console.log(carrito_compra.productos.length)
        localStorage.setItem('carrito_compra', JSON.stringify(carrito_compra));
    })

})


//aca llamo al botón para eliminar cantidades y declaro el evento para que se resten las cantidad dando al boton "-"
let botones_borrar = document.querySelectorAll(".boton_b");


botones_borrar.forEach(boton => {

    boton.addEventListener("click", (btn) => {
        let articulo = productos.find(i => i.codigo === Number(btn.currentTarget.id))
        carrito_compra.eliminar(articulo.codigo);
        let cantidades = carrito_compra.cantidad(articulo.codigo)
        Toastify({
            text: ` ${articulo.nombre} fue ELIMINADO correctamente!`,
            duration: 3000,
            destination: "../html/carrito.html",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "toasti",
            offset: {
                x: 0, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: 90 // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            onClick: function(){} // Callback after click
          }).showToast();

        let clase_cant = ` .cant${btn.currentTarget.id}`
        let div_cant = document.querySelector(clase_cant);
        if (cantidades > 0) {
            div_cant.innerText = ` ${cantidades}`

        } else {
            console.log("id agrgar carrito:" + btn.currentTarget.id)
            let clase_btnA = ` .botonA_${btn.currentTarget.id}`
            let btn_agregar = document.querySelector(clase_btnA);
            btn_agregar.innerText = "Agregar al carrito"
            console.log(btn.currentTarget.innerText)
            btn_agregar.classList.replace("boton_cant", "boton_agregar")
            div_cant.innerText = ""

            btn.currentTarget.classList.replace("boton_cant", "boton_borrar")
        }

        console.log(carrito_compra.productos.length)
        localStorage.setItem('carrito_compra', JSON.stringify(carrito_compra));
    })

})
}