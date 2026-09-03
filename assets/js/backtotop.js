/* ==========================================
   BACK TO TOP
========================================== */

function backToTop(){

const btn=document.querySelector(".back-to-top");

if(!btn) return;

window.addEventListener("scroll",()=>{

btn.classList.toggle("show",window.scrollY>400);

});

btn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}