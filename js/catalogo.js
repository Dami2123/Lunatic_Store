let productos_ = JSON.parse(localStorage.getItem("lista_productos"));
let productos = [];
for (let objeto of productos_) {
    productos.push(new Producto_tipo(objeto.codigo, objeto.nombre, objeto.precio, objeto.categoria, objeto.imagen));
}

let carrito_compra = new Carrito();
let carrito_activo = JSON.parse(localStorage.getItem("carrito_compra"));
console.log(carrito_activo)
if (carrito_activo != null) {
    let carrito_inicial = Number(carrito_activo.productos.length);
    if (carrito_inicial > 0) {
        console.log("prueba aca")
        for (let objeto of carrito_activo.productos) {
            carrito_compra.agregar(objeto.codigo, productos, objeto.cantidad);
            let claseA= ` .botonA_${objeto.codigo}`
            let btn_a = document.querySelector(claseA);
            btn_a.innerText = "+";
            btn_a.classList.replace("boton_agregar", "boton_cant");

            let claseB= ` .botonB_${objeto.codigo}`
            let btn_b = document.querySelector(claseB);
            btn_b.innerText = "-";
            btn_b.classList.replace("boton_borrar", "boton_cant");

            let claseC=` .cant${objeto.codigo}`
            let info_cant = document.querySelector(claseC);
            info_cant.innerText = ` ${objeto.cantidad}`
            
        }
    }

    


}

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

/*

let carrito_compra = new Carrito();



    let articulo = lista_productos.find((i) => i.codigo === codigo_venta);


    let cantidades_venta = Number(prompt("Cantidad de " + articulo.nombre + ":"));

    carrito_compra.agregar(codigo_venta, cantidades_venta, lista_productos);

let validacion = Number(prompt("Digita 0 para eliminar algun articulo o cualquier caracter para finalizar:"));

while (validacion === 0) {
    let condigo_eliminar = Number(prompt("Ingresa el codigo del producto a eliminar:"));
    let articulo = lista_productos.find((i) => i.codigo === condigo_eliminar);
    if (articulo) {
        let cantidades_eliminar = Number(prompt("Cantidad de " + articulo.nombre + " a eliminar:"));
        carrito_compra.eliminar(condigo_eliminar, cantidades_eliminar);   
    }else{
    validacion = Number(prompt("El codigo no existe! Ingresa 0 para eliminar algun otro articulo o cualquier caracter para finalizar: :"));
    }  
    validacion = Number(prompt("Digita 0 para eliminar otro articulo o cualquier caracter para finalizar:"));
}


*/