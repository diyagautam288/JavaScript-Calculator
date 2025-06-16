const toggleMode= document.getElementById("toggle-mode")
const container=document.querySelector(".container")
toggleMode.addEventListener("change",()=>container.classList.toggle('dark-mode'))