let contador =0;
let num_contador = document.querySelector(".cnt");
let cont=localStorage.getItem("cantidades");
console.log("cuenta"+cont)
if (cont!=null) {
    contador= Number(cont);
    num_contador.classList.replace("contador_inicial", "contador");
    num_contador.innerText = ` ${contador}`;
    
}