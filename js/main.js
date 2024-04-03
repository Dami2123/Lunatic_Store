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
let lista_productos = [
    new Producto_tipo(100, "Chaqueta de cuero y piel", 62000, "Chaquetas", "../img/catalogo/ch1.png"),
    new Producto_tipo(101, "Chaqueta abotonada casual", 35000, "Chaquetas", "../img/catalogo/ch2.png"),
    new Producto_tipo(102, "Chaqueta bohemia flecos", 47000, "Chaquetas", "../img/catalogo/ch3.png"),
    new Producto_tipo(103, "Pantalón casual azul", 22000, "Pantalones y Shorts", "../img/catalogo/p2.png"),
    new Producto_tipo(104, "Short jean bicolor", 25000, "Pantalones y Shorts", "../img/catalogo/s1.png"),
    new Producto_tipo(105, "Pantalón negro lentejuelas", 30000, "Pantalones y Shorts", "../img/catalogo/p1.png"),
    new Producto_tipo(106, "Polera Metalica rosa", 15000, "Tops", "../img/catalogo/po1.png"),
    new Producto_tipo(107, "Top verde ajustable", 12000, "Tops", "../img/catalogo/po2.jpeg"),
    new Producto_tipo(108, "Polera acordonada", 16000, "Tops", "../img/catalogo/po3.png"),
    new Producto_tipo(109, "Vestido yin yang", 35000, "Vestidos y Faldas", "../img/catalogo/v1 (2).png"),
    new Producto_tipo(110, "Falda lentejuelas doradas", 20000, "Vestidos y Faldas", "../img/catalogo/f1.png"),
    new Producto_tipo(111, "Conjunto entero top-falda", 40000, "Vestidos y Faldas", "../img/catalogo/v3.png")
]

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
    }


    eliminar(codigo_producto) {
        let cantidad = 1;
        if (this.productos.length === 0) {
            return alert("No existen más productos en el carrito!!!")
        }
        let articulo = this.productos.find((i) => i.codigo === codigo_producto);

        if (!articulo) {
            return alert("Este producto no se encuentra actualmente en el carrito!!!")
        }
        if (cantidad >= articulo.cantidad) {
            let ubicacion = this.productos.indexOf(articulo);
            this.productos.splice(ubicacion, 1);

        } else {
            articulo.cantidad = articulo.cantidad - cantidad;
            articulo.precio_total_cant = articulo.precio_unit * articulo.cantidad;

        }


        this.actualizarTotal();

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



localStorage.setItem('lista_productos', JSON.stringify(lista_productos));


