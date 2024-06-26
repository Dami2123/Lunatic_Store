// en este archivo se declaran las funciones necesarias para manipular el carrito y los objetos asociados a los productos
//las funcionalidades de agregar y eliminar productos del carrito se encuentran en la página del catalogo (catalogo.js)
//Los elementos agregados al carritoo y la opcion vaciar, se encuentra en la pagina del carrito (carrito.js)
function Producto_tipo(codigo, nombre, precio, categoria, imagen) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.imagen = imagen;
}
function Producto_carrito(codigo, nombre, cantidad, precio_unit, precio_total_cant, imagen) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio_unit = precio_unit;
    this.precio_total_cant = precio_total_cant;
    this.imagen = imagen;
}

class Carrito {
    constructor() {
        this.total = 0;
        this.productos = [];
    }



    actualizarTotal() {
        let nuevo_total = 0;

        this.productos.forEach(producto => {
            nuevo_total += producto.precio_total_cant
        })

        this.total = nuevo_total;
    }

    cantidadTotal(){
        let cant_total= 0;

        this.productos.forEach(producto => {
            cant_total += producto.cantidad
        })

        return cant_total;
    }

    agregar(codigo_producto, catalogo, cantidad) {
        ;
        const existencia = this.productos.find((i) => i.codigo === codigo_producto);
        let articulo = catalogo.find((i) => i.codigo === codigo_producto);

        if (!existencia) {
            this.productos.push(new Producto_carrito(
                articulo.codigo,
                articulo.nombre,
                cantidad,
                articulo.precio,
                articulo.precio * cantidad,
                articulo.imagen
            ))


        } else {

            existencia.cantidad = existencia.cantidad + 1;
            existencia.precio_total_cant = existencia.precio_unit * existencia.cantidad;


        }

        this.actualizarTotal();
        this.cantidadTotal()
    }


    eliminar(codigo_producto) {
        let cantidad = 1;
        if (this.productos.length === 0) {
            return alert("No existen más productos en el carrito!!!")
        }
        let articulo = this.productos.find((i) => i.codigo === codigo_producto);


        if (cantidad >= articulo.cantidad) {
            let ubicacion = this.productos.indexOf(articulo);
            this.productos.splice(ubicacion, 1);

        } else {
            articulo.cantidad = articulo.cantidad - cantidad;
            articulo.precio_total_cant = articulo.precio_unit * articulo.cantidad;

        }


        this.actualizarTotal();
        this.cantidadTotal()

    }

    vaciar() {
        this.productos = []

        this.actualizarTotal();

    }

    cantidad(codigo_producto) {

        if (this.productos.length === 0) {
            return 0
        }
        let articulo = this.productos.find((i) => i.codigo === codigo_producto);

        if (!articulo) {
            return 0
        }
        return articulo.cantidad
    }

    

}



