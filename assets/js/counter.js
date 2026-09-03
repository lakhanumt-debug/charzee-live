/* ==========================================
   COUNTER
========================================== */

function initCounter(){

    const counters=document.querySelectorAll("[data-count]");

    counters.forEach(counter=>{

        let target=+counter.dataset.count;

        let current=0;

        let increment=target/150;

        function update(){

            current+=increment;

            if(current<target){

                counter.innerText=Math.ceil(current);

                requestAnimationFrame(update);

            }

            else{

                counter.innerText=target;

            }

        }

        update();

    });

}