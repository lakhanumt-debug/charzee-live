/* ==========================================
   FADE ANIMATION
========================================== */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(

".fade-up,.fade-left,.fade-right,.zoom"

).forEach(el=>observer.observe(el));