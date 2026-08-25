/* ==========================================
   COMPONENT LOADER
========================================== */

function loadComponents() {

    const components = {

        header: "components/header.html",

        hero: "components/hero.html",

        divider1: "components/divider-line.html",

        trusted: "components/trusted.html",

        divider2: "components/divider-line.html",

        services: "components/services.html",

        divider3: "components/divider-line.html",

        projects: "components/projects.html",

        homeProjects: "components/home/projects.html",

        divider4: "components/divider-line.html",

        testimonials: "components/testimonials.html",

        divider5: "components/divider-line.html",

        whyChoose: "components/why-choose.html",

        divider6: "components/divider-line.html",

        whyCharzee: "components/why-charzee.html",

        expertise: "components/expertise.html",

        footer: "components/footer.html",

        contact: "components/contact.html",

        products: "components/home/products.html",

        productsFull: "components/products-full.html",

        serviceAgent: "components/service-agent.html",

        about: "components/abouts.html",
        portfolio: "components/portfolio.html",

        journey: "components/journey.html",

    };

    Object.entries(components).forEach(([id, file]) => {

        const element = document.getElementById(id);

        if (!element) return;

        fetch(file)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${file}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;

                if (id === "header") {
                    navbarScroll();
                    setActiveNavLink();
                    mobileMenuLock();
                }

                // Contact form initialize
                if (id === "contact" && typeof initContactForm === "function") {
                    initContactForm();
                }

                // Service Agent initialize
                if (id === "serviceAgent" && typeof initServiceAgent === "function") {
                    initServiceAgent();
                }

                removeCurrentPageLinks(element, id);
            })
            .catch(error => console.error(error));

    });

}

function removeCurrentPageLinks(container, componentId) {

    if (componentId === "header" || componentId === "footer") return;

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = container.querySelectorAll("a[href]");

    links.forEach(link => {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage !== currentPage) return;

        const centeredWrapper = link.closest(".text-center");
        link.remove();

        if (centeredWrapper && centeredWrapper.children.length === 0) {
            centeredWrapper.remove();
        }

    });

}

/* ==========================================
   LOAD COMPONENTS
   (Invoked once from main.js's DOMContentLoaded
   handler — not registered again here — to avoid
   fetching/injecting every component twice.)
========================================== */

