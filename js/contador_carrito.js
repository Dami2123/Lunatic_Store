//aca actualizo el contador de articulos en las páginas
let contador = 0;
let num_contador = document.querySelector(".cnt");
let cont = localStorage.getItem("cantidades");
console.log("cuenta" + cont)
if (cont != null) {
    contador = Number(cont);
    num_contador.classList.replace("contador_inicial", "contador");
    num_contador.innerText = ` ${contador}`;

}
if (contador === 0) {
    num_contador.classList.replace("contador", "contador_inicial");
}
