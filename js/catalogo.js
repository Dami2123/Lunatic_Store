//acá hago el llamado a la información de los productos que se encuentra en un array en main.js y los pongo en un array para trabajarlo
let productos_ = JSON.parse(localStorage.getItem("lista_productos"));
let productos = [];
for (let objeto of productos_) {
    productos.push(new Producto_tipo(objeto.codigo, objeto.nombre, objeto.precio, objeto.categoria, objeto.imagen));
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

//acá llamo a los botones "agregar carrito" y declaro el evento para que se agregue los productos y si no hay ya productos agregados que muestre
//las cantidades y ponga disponible el botón para eliminar cantidades
let botones_agregar = document.querySelectorAll(".boton_");

botones_agregar.forEach(boton => {

    boton.addEventListener("click", (btn) => {
        let articulo = productos.find(i => i.codigo === Number(btn.currentTarget.id))
        console.log(articulo.codigo)
        carrito_compra.agregar(articulo.codigo, productos, 1);
        let cantidades = carrito_compra.cantidad(articulo.codigo)

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
