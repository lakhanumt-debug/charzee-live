/* ==========================================
   CHARZEE EV SOLUTIONS
   MAIN.JS
========================================== */
document.addEventListener("DOMContentLoaded", () => {

    // Load Components
    loadComponents();

    // Navbar Scroll
    navbarScroll();

    // Back To Top
    backToTop();

    // Counter
    initCounter();

    // Smooth Scroll
    smoothScroll();

    // AOS
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 80
        });
    }

});