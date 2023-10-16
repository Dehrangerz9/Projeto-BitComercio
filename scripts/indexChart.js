let profile = document.querySelector("#profile")
let menuLateral = document.getElementById("menu-lateral");

profile.addEventListener("mouseenter",()=>{
    if (menuLateral.style.display === "none"){
        menuLateral.style.display = "flex"
    } else {
        menuLateral.style.display = "none";
    }
 })

 menuLateral.addEventListener("mouseleave",()=>{
    if (menuLateral.style.display === "none"){
        menuLateral.style.display = "flex"
    } else {
        menuLateral.style.display = "none";
    }
 })

 let userBalance = document.querySelector("#accountBalance");
 let toggleAccountBalance = document.querySelector("#toggleAccountBalance");

 toggleAccountBalance.addEventListener("click",()=>{
    if (userBalance.type === "number") {
        userBalance.type = "password";
        toggleAccountBalance.classList.remove("fa-eye");
        toggleAccountBalance.classList.add("fa-eye-slash");
    } else {
        userBalance.type = "number";
        toggleAccountBalance.classList.remove("fa-eye-slash");
        toggleAccountBalance.classList.add("fa-eye");
    }
 })