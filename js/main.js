function Producto_tipo(codigo, nombre, precio, categoria, imagen) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio  = precio;
    this.categoria = categoria;
    this.imagen= imagen;
}
function Producto_carrito(codigo, nombre, cantidad, precio_unit,precio_total_cant, imagen) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.cantidad  = cantidad;
    this.precio_unit = precio_unit;
    this.precio_total_cant=precio_total_cant;
    this.imagen= imagen;
}
let lista_productos = [
    new Producto_tipo (100, "Chaqueta de cuero y piel", 62000, "Chaquetas", "../img/catalogo/ch1.png"),
    new Producto_tipo (101, "Chaqueta abotonada casual", 35000, "Chaquetas","../img/catalogo/ch2.png"),
    new Producto_tipo (102, "Chaqueta bohemia flecos", 47000, "Chaquetas","../img/catalogo/ch3.png"),
    new Producto_tipo (103, "Pantalón casual azul", 22000, "Pantalones y Shorts","../img/catalogo/p2.png"),
    new Producto_tipo (104, "Short jean bicolor", 25000, "Pantalones y Shorts","../img/catalogo/s1.png"),
    new Producto_tipo (105, "Pantalón negro lentejuelas", 30000, "Pantalones y Shorts","../img/catalogo/p1.png"),
    new Producto_tipo (106, "Polera Metalica rosa", 15000, "Tops","../img/catalogo/po1.png"),
    new Producto_tipo (107, "Top verde ajustable", 12000, "Tops","../img/catalogo/po2.jpeg"),
    new Producto_tipo (108, "Polera acordonada", 16000, "Tops","../img/catalogo/po3.png"),
    new Producto_tipo (109, "Vestido yin yang", 35000, "Vestidos y Faldas","../img/catalogo/v1 (2).png"),
    new Producto_tipo (110, "Falda lentejuelas doradas", 20000, "Vestidos y Faldas","../img/catalogo/f1.png"),
    new Producto_tipo (111, "Conjunto entero top-falda", 40000, "Vestidos y Faldas","../img/catalogo/v3.png")
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

    agregar(codigo_producto, catalogo,cantidad) {
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
      let cantidad=1;
        if (this.productos.length===0) {
            return alert("No existen más productos en el carrito!!!")
        }
        let articulo = this.productos.find((i) => i.codigo === codigo_producto);

        if (!articulo) {
            return alert("Este producto no se encuentra actualmente en el carrito!!!")
        }
        if (cantidad>=articulo.cantidad) {
            let ubicacion = this.productos.indexOf(articulo);
            this.productos.splice(ubicacion, 1);
            
        }else{
            articulo.cantidad= articulo.cantidad-cantidad;
            articulo.precio_total_cant = articulo.precio_unit * articulo.cantidad;

        }


        this.actualizarTotal();

    }

    vaciar() {
        this.productos=[]
  
        this.actualizarTotal();
  
      }

    cantidad(codigo_producto){

        if (this.productos.length===0) {
            return 0
        }
        let articulo = this.productos.find((i) => i.codigo === codigo_producto);

        if (!articulo) {
            return  0
        }
        return articulo.cantidad
    }

}



localStorage.setItem('lista_productos', JSON.stringify(lista_productos));



/*

let carrito_compra = new Carrito();

while (true) {
    let codigo_venta = Number(prompt("Codigo del producto (ingresa 0 para terminar):"));

    if (codigo_venta === 0) {
        break;
    }

    let articulo = lista_productos.find((i) => i.codigo === codigo_venta);

    while (!articulo) {
        codigo_venta = Number(prompt("Codigo de producto invalido!! Ingresa un nuevo codigo (ingresa 0 para terminar):"));
        if (codigo_venta === 0) {
            break;
        }
        articulo = lista_productos.find((i) => i.codigo === codigo_venta);
    }
    if (codigo_venta == 0) {
        break;
    }
    let cantidades_venta = Number(prompt("Cantidad de " + articulo.nombre + ":"));

    carrito_compra.agregar(codigo_venta, cantidades_venta, lista_productos);
}

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


carrito_compra.productos.forEach(producto => {
    console.log("cod. : " + producto.codigo);
    console.log("Nombre : " + producto.nombre);
    console.log("Precio unitario : " + producto.precio_unit);
    console.log("Cantidad : " + producto.cantidad);
    console.log("Total unidades: " + producto.precio_total_cant);
    console.log(" ");
});
console.log("Total de la compra: "+carrito_compra.total);*/