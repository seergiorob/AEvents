const boton = document.querySelector("#boton")

const menu = document.querySelector("#mobile-menu-3")

boton.addEventListener("click", ()=>{
    menu.classList.toggle("hidden")
})