//En esta seccion llamos los elementos en donde se verán reflejados los productos que se haya agregado el carrito, el total de carrito y vaciar carrito
let carritoProductos = document.querySelector("#contenedor_productos");
let conte_total = document.querySelector(".contenedor_total_inicial");
let valor_total = document.querySelector(".valor_total");
let vaciar = document.querySelector(".vaciar")

let contador =0;
let num_contador = document.querySelector(".cnt");
let cont=localStorage.getItem("cantidades");
console.log("cuenta"+cont)
if (cont!=null) {
    contador= Number(cont);
    num_contador.classList.replace("contador_inicial", "contador");
    num_contador.innerText = ` ${contador}`;
    
}


//acá declaro un array vacío por si hay algún inconveniente en llamar al elemento carrito_compra desde localShortage
let productos_ = [];
//luego llamo a la información de lo productos agregados al carrito
productos_ = JSON.parse(localStorage.getItem("carrito_compra"));

//acá agrego la informaciónn del carrito a un array para poder trabajarlo
let productos = [];
if (productos_ != null) {
  total = Number(productos_.total);
  productos_ = productos_.productos;

  for (let objeto of productos_) {

    productos.push(new Producto_carrito(
      objeto.codigo,
      objeto.nombre,
      objeto.cantidad,
      objeto.precio_unit,
      objeto.precio_total_cant,
      objeto.imagen));
  }
}

//aca voy agregando los productos que hay en el carrito en el caso de que el array tenga elementos y si no muestra el mensaje del carrito vacío
if (productos.length > 0) {

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

    conte_total.classList.replace("contenedor_total_inicial", "contenedor_total")
    valor_total.innerText = `Total: $${total}`

  }
} else {
  let div = document.createElement("div");
  div.innerHTML = `
    <img  src="../img/carro.png">
    <p class="tituloh"> Tu carrito está vacío</p>
            `
  carritoProductos.append(div);
}

//aca se declara el evento para que se vacie el carrito con el boton vaciar y se muestra el mensaje de carrito vacío

vaciar.addEventListener("click", () => {
  localStorage.removeItem("carrito_compra")
  localStorage.removeItem("cantidades")
  num_contador.classList.replace("contador","contador_inicial");
  carritoProductos.innerHTML = `
                                        <div>
                                        <img  src="../img/carro.png">
                                        <p class="tituloh"> Tu carrito está vacío</p>
                                        <div/>       `;
  conte_total.classList.replace("contenedor_total", "contenedor_total_inicial")
})
