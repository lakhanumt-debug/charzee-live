/* ==========================================
   NAVBAR
========================================== */

function navbarScroll(){

    const header=document.querySelector(".header");

    if(!header) return;

    if(header.dataset.scrollReady==="true") return;

    header.dataset.scrollReady="true";

    const updateHeaderState=()=>{

        if(window.scrollY>80){

            header.classList.add("scrolled");

        }

        else{

            header.classList.remove("scrolled");

        }

    };

    window.addEventListener("scroll",()=>{

        updateHeaderState();

    });

    updateHeaderState();

}

function setActiveNavLink(){

    const currentPage=window.location.pathname.split("/").pop() || "index.html";
    const navLinks=document.querySelectorAll(".navbar-nav .nav-link[href]");

    navLinks.forEach(link=>{

        const linkPage=link.getAttribute("href").split("/").pop();
        const linkLabel=link.textContent.trim().toLowerCase();

        link.classList.toggle(
            "active",
            linkPage===currentPage || (currentPage==="products.html" && linkLabel==="products")
        );

    });

}

/* ==========================================
   MOBILE MENU SCROLL LOCK

   Freezes the background page wherever the
   user currently is (hero, mid-page, other
   pages, etc.) so the mobile menu always
   opens the same way, and restores their
   scroll position on close.
========================================== */

function mobileMenuLock(){

    const navbarCollapseEl=document.getElementById("navbar");

    if(!navbarCollapseEl) return;

    if(navbarCollapseEl.dataset.lockReady==="true") return;

    navbarCollapseEl.dataset.lockReady="true";

    let savedScrollY=0;

    navbarCollapseEl.addEventListener("show.bs.collapse",()=>{

        if(window.innerWidth>=992) return;

        savedScrollY=window.scrollY;

        document.body.style.position="fixed";
        document.body.style.top=`-${savedScrollY}px`;
        document.body.style.left="0";
        document.body.style.right="0";
        document.body.style.width="100%";
        document.body.classList.add("menu-open");

    });

    navbarCollapseEl.addEventListener("hidden.bs.collapse",()=>{

        if(!document.body.classList.contains("menu-open")) return;

        document.body.classList.remove("menu-open");
        document.body.style.position="";
        document.body.style.top="";
        document.body.style.left="";
        document.body.style.right="";
        document.body.style.width="";

        window.scrollTo(0,savedScrollY);

    });

}
