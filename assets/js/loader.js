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

                // ------------------------------------------------------
                // Fix: mobile browsers (mainly iOS Safari / some Android
                // WebViews) can fail to paint a `position: fixed` element
                // that was inserted into the page *after* first paint —
                // it stays invisible until a scroll/resize forces a
                // relayout. Since the footer (and its fixed .social-toggle
                // and #backToTop buttons) is injected here via innerHTML,
                // force an immediate reflow on those specific elements so
                // they render right away instead of waiting on the user
                // to scroll.
                // ------------------------------------------------------
                if (id === "footer") {
                    const fixedEls = [
                        element.querySelector(".social-toggle"),
                        document.getElementById("backToTop")
                    ];

                    fixedEls.forEach(fixedEl => {
                        if (!fixedEl) return;
                        fixedEl.style.display = "none";
                        void fixedEl.offsetHeight; // force reflow
                        fixedEl.style.display = "";
                    });

                    // Extra safety net for stubborn WebViews: nudge the
                    // browser to recompute fixed-position compositing.
                    window.dispatchEvent(new Event("resize"));

                    // Pin the social icons using the actual visible screen
                    // width instead of CSS "right". Some mobile browsers
                    // compute `right` on a `position:fixed` element against
                    // the full (layout) document width rather than the
                    // visible (visual) viewport whenever anything on the
                    // page causes horizontal overflow — even if that
                    // overflow itself is invisible/clipped. That makes a
                    // right-anchored element sit off-screen until the user
                    // drags/scrolls sideways. Using the real viewport width
                    // to set an explicit `left` sidesteps that bug entirely.
                    pinSocialToggle();
                    window.addEventListener("resize", pinSocialToggle);
                    window.addEventListener("orientationchange", pinSocialToggle);
                    if (window.visualViewport) {
                        window.visualViewport.addEventListener("resize", pinSocialToggle);
                    }
                }

                removeCurrentPageLinks(element, id);
            })
            .catch(error => console.error(error));

    });

}

/* ==========================================
   PIN SOCIAL TOGGLE TO THE REAL VIEWPORT
   (fixes the "have to scroll sideways to see
   it" bug on mobile — see comment above)
========================================== */
function pinSocialToggle() {

    const el = document.querySelector(".social-toggle");
    if (!el) return;

    // The true visible screen width — prefer visualViewport (most
    // accurate on mobile, ignores address-bar/zoom quirks), then fall
    // back to the standards-based clientWidth, then innerWidth.
    const viewportWidth =
        (window.visualViewport && window.visualViewport.width) ||
        document.documentElement.clientWidth ||
        window.innerWidth;

    const gap = viewportWidth <= 767 ? 10 : 14;
    const left = Math.max(0, viewportWidth - el.offsetWidth - gap);

    el.style.right = "auto";
    el.style.left = left + "px";

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

