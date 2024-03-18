let lista_productos = [ 
    { codigo: 100,
    nombre: "Chaqueta de cuero y piel",
    precio: 62000,
    categoria: "Chaquetas"
    },

    { codigo: 101,
    nombre: "Chaqueta abotonada casual",
    precio: 35000,
    categoria: "Chaquetas"
    },

    { codigo: 102,
    nombre: "Chaqueta bohemia flecos",
    precio: 47000,
    categoria: "Chaquetas"
    },

    { codigo: 103,
    nombre: "Pantalón casual azul",
    precio: 22000,
    categoria: "Pantalones y Shorts"
    },

    { codigo: 104,
    nombre: "Short jean bicolor",
    precio: 25000,
    categoria: "Pantalones y Shorts"
    },

    { codigo: 105,
    nombre: "Pantalón negro lentejuelas",
    precio: 30000,
    categoria: "Pantalones y Shorts"
    },

    { codigo: 106,
    nombre: "Polera Metalica rosa",
    precio: 15000,
    categoria: "Tops"
    },

    { codigo: 107,
    nombre: "Top verde ajustable",
    precio: 12000,
    categoria: "Tops"
    },

    { codigo: 108,
    nombre: "Polera acordonada",
    precio: 16000,
    categoria: "Tops"
    },

    { codigo: 109,
    nombre: "Vestido yin yang",
    precio: 35000,
    categoria: "Vestidos y Faldas"
    },

    { codigo: 110,
    nombre: "Falda lentejuelas doradas",
    precio: 20000,
    categoria: "Vestidos y Faldas"
    },

    { codigo: 111,
    nombre: "Conjunto entero top-falda",
    precio: 40000,
    categoria: "Vestidos y Faldas"
    }
]

function eliminar_producto (codigo_venta, total){
    let articulo= productos_venta.find((i) => i.codigo === codigo_venta); 
    let ubicacion= productos_venta.indexOf(articulo);
    productos_venta.splice(ubicacion,1);
    total= total-articulo.precio_total_cant
    return total

}



let productos_venta= [];
let total=0;

while (true) {
    let codigo_venta= Number(prompt("Codigo del producto (ingresa 0 para terminar):"));

    if (codigo_venta===0) {
        break;
    }

    let articulo= lista_productos.find((i) => i.codigo === codigo_venta);

    while(articulo===undefined) {
        codigo_venta= Number(prompt("Codigo de producto invalido!! (ingresa 0 para terminar):"));
        if (codigo_venta===0) {
            break;
          }
        articulo= lista_productos.find((i) => i.codigo === codigo_venta);
    }

    if (codigo_venta==0) {
        break;
    }

    let cantidades_venta= Number(prompt("Cantidad de " + articulo.nombre + ":"));

    total= total + articulo.precio*cantidades_venta;

    productos_venta.push( {codigo: articulo.codigo, nombre: articulo.nombre, cantidad: cantidades_venta, precio_unit: articulo.precio,
    precio_total_cant: articulo.precio*cantidades_venta
    })
}

let confirmacion= Number(prompt("Digita 0 para eliminar algun articulo o cualquier caracter para finalizar:"));


while (confirmacion===0) {
    codigo_venta=Number(prompt("Ingresa codigo eliminar: "));
    total= eliminar_producto(codigo_venta,total);

    confirmacion= Number(prompt("Digita 0 para eliminar algun articulo (todas las unidades) o cualquier caracter para finalizar:"));
}

productos_venta.forEach(producto => {
    console.log("cod. : " + producto.codigo);
    console.log("Nombre : " + producto.nombre);
    console.log("Precio unitario : " + producto.precio_unit);
    console.log("Cantidad : " + producto.cantidad);
    console.log("Total unidades: " + producto.precio_total_cant);
    console.log(" ");
});
console.log("Total de la compra: "+total);
         


  
    


