/* ==========================================
   REUSABLE CONTENT SECTION SLIDER
   Converts card grids into responsive sliders.
========================================== */
(function () {
    const sectionSelectors = [
        ".about .row",
        ".product-specifications .row",
        ".applications .row",
        ".product-features .row",
        ".key-features .row"
    ];

    function isCardRow(row) {
        return row.querySelector(".spec-card, .application-card, .feature-card, .about-feature-card, .why-card, .why-item, .feature-item, .benefit-card");
    }

    function createSlider(row) {
        if (row.dataset.contentSlider === "true" || !isCardRow(row)) return;

        const items = Array.from(row.children).filter(el =>
            el.classList.contains("col") || Array.from(el.classList).some(c => c.startsWith("col-"))
        );
        if (items.length < 2) return;

        row.dataset.contentSlider = "true";
        row.classList.add("content-slider-track");

        const wrapper = document.createElement("div");
        wrapper.className = "content-slider";

        const parent = row.parentNode;
        parent.insertBefore(wrapper, row);
        wrapper.appendChild(row);

        items.forEach(item => item.classList.add("content-slider-item"));

        const controls = document.createElement("div");
        controls.className = "content-slider-controls";
        controls.innerHTML = `
            <button type="button" class="content-slider-btn content-slider-prev" aria-label="Previous slide">
                <i class="bi bi-arrow-left"></i>
            </button>
            <div class="content-slider-dots"></div>
            <button type="button" class="content-slider-btn content-slider-next" aria-label="Next slide">
                <i class="bi bi-arrow-right"></i>
            </button>`;
        wrapper.appendChild(controls);

        const dotsBox = controls.querySelector(".content-slider-dots");
        const dots = items.map((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "content-slider-dot" + (index === 0 ? " active" : "");
            dot.setAttribute("aria-label", `Go to item ${index + 1}`);
            dot.addEventListener("click", () => {
                row.scrollTo({ left: itemLeft(index), behavior: "smooth" });
            });
            dotsBox.appendChild(dot);
            return dot;
        });

        const itemLeft = index => {
            const item = items[index];
            return item.offsetLeft - parseFloat(getComputedStyle(row).paddingLeft || 0);
        };

        controls.querySelector(".content-slider-prev").addEventListener("click", () => {
            const active = getNearestIndex();
            const target = Math.max(0, active - 1);
            row.scrollTo({ left: itemLeft(target), behavior: "smooth" });
        });
        controls.querySelector(".content-slider-next").addEventListener("click", () => {
            const active = getNearestIndex();
            const target = Math.min(items.length - 1, active + 1);
            row.scrollTo({ left: itemLeft(target), behavior: "smooth" });
        });

        const getNearestIndex = () => {
            let nearest = 0;
            let distance = Infinity;
            items.forEach((item, i) => {
                const d = Math.abs(row.scrollLeft - itemLeft(i));
                if (d < distance) { distance = d; nearest = i; }
            });
            return nearest;
        };

        let scrollTimer;
        row.addEventListener("scroll", () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                let nearest = 0;
                let distance = Infinity;
                items.forEach((item, i) => {
                    const d = Math.abs(row.scrollLeft - itemLeft(i));
                    if (d < distance) { distance = d; nearest = i; }
                });
                dots.forEach((dot, i) => dot.classList.toggle("active", i === nearest));
            }, 40);
        }, { passive: true });
    }

    function initContentSliders(root = document) {
        sectionSelectors.forEach(selector => {
            root.querySelectorAll(selector).forEach(createSlider);
        });
    }

    window.initContentSliders = initContentSliders;

    document.addEventListener("DOMContentLoaded", () => {
        initContentSliders();
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) initContentSliders(node.parentElement || document);
            }));
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
})();
