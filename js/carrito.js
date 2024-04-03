let carritoProductos = document.querySelector("#contenedor_productos");
let conte_total= document.querySelector(".contenedor_total_inicial");
let valor_total= document.querySelector(".valor_total");
let vaciar = document.querySelector(".vaciar")


let productos_=[];
productos_=JSON.parse(localStorage.getItem("carrito_compra"));
let productos=[];
if (productos_!=null) {
  total= Number(productos_.total);
productos_=productos_.productos;


for (let objeto of productos_){

  productos.push(new Producto_carrito(
    objeto.codigo, 
    objeto.nombre, 
    objeto.cantidad, 
    objeto.precio_unit,
    objeto.precio_total_cant, 
    objeto.imagen));
}
}




console.log("len: "+productos.length)

if (productos.length>0) {
    
  for (const articulo of productos) {
    console.log(articulo)
    let div = document.createElement("div");
    div.classList.add("subcontenedor__carrito");
    div.innerHTML = `
            <img class="img_carrito redes" src="${articulo.imagen}">
            <div class="detalles">
            <div class="elementos_carrito titulo_carrito"> ${articulo.nombre} </div>
            
            <div class="elementos_carrito"> Precio unitario: $${articulo.precio_unit} </div>
            </div>
            <div class="elementos_carrito"> Cantidad: ${articulo.cantidad}</div>
            <div class="elementos_carrito titulo_carrito"> $${articulo.precio_total_cant} </div>
            `
    carritoProductos.append(div);

    conte_total.classList.replace("contenedor_total_inicial","contenedor_total" )
    valor_total.innerText=`Total: $${total}`
    
  }  
}else{
    let div = document.createElement("div");
    div.innerHTML = `
    <img  src="../img/carro.png">
    <p class="tituloh"> Tu carrito está vacío</p>
            `
    carritoProductos.append(div);
}


vaciar.addEventListener("click", () => {localStorage.removeItem("carrito_compra") 
                                        carritoProductos.innerHTML=`
                                        <div>
                                        <img  src="../img/carro.png">
                                        <p class="tituloh"> Tu carrito está vacío</p>
                                        <div/>       `;
                                        conte_total.classList.replace("contenedor_total", "contenedor_total_inicial")
                                      })
