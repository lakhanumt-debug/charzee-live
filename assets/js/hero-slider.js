/* ==========================================
   HERO IMAGE + CONTENT SLIDER
========================================== */
function initHeroSlider() {
    const sliderEl = document.getElementById("heroSlider");
    if (!sliderEl || sliderEl.dataset.initialized === "true") return;

    const slides = sliderEl.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll("#heroSliderNav .hero-dot");
    const titleEl = document.getElementById("heroTitle");
    const tagEl = document.getElementById("heroTag");
    const descriptionEl = document.getElementById("heroDescription");

    if (!slides.length) return;
    sliderEl.dataset.initialized = "true";

    const slidesData = [
        {
            icon: "bi-battery-charging",
            tag: "Battery Energy Storage Systems",
            titleMain: "Reliable Power Storage",
            titleHighlight: "For Every Need.",
            description: "Advanced Battery Energy Storage Systems engineered for backup power, grid stabilization, peak shaving and seamless renewable energy integration."
        },
        {
            icon: "bi-battery-half",
            tag: "Advanced Battery Solutions",
            titleMain: "Advanced Battery",
            titleHighlight: "Solutions That Last.",
            description: "Reliable, high-performance battery solutions designed to deliver efficient energy storage, long operating life and dependable power when you need it most."
        },
        {
            icon: "bi-sun-fill",
            tag: "Solar Energy Solutions",
            titleMain: "Harness The Sun",
            titleHighlight: "For a Greener Tomorrow.",
            description: "Smart solar energy solutions that generate clean power, reduce energy costs and work seamlessly with modern storage and monitoring systems."
        },
        {
            icon: "bi-ev-station-fill",
            tag: "Smart EV Charging",
            titleMain: "Powering Every Journey",
            titleHighlight: "With Smart EV Charging.",
            description: "Future-ready AC and DC EV charging infrastructure built for homes, businesses, fleets and high-speed charging corridors."
        }
    ];

    let current = 0;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 5000;

    [titleEl, tagEl, descriptionEl].filter(Boolean).forEach(el => {
        el.style.transition = "opacity .3s ease, transform .3s ease";
    });

    function updateContent(index) {
        const data = slidesData[index] || slidesData[0];
        [titleEl, tagEl, descriptionEl].filter(Boolean).forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(10px)";
        });

        setTimeout(() => {
            if (tagEl) {
                tagEl.innerHTML = `<i class="bi ${data.icon}"></i><span>${data.tag}</span>`;
            }
            if (titleEl) {
                titleEl.innerHTML = `${data.titleMain} <span>${data.titleHighlight}</span>`;
            }
            if (descriptionEl) descriptionEl.textContent = data.description;

            [titleEl, tagEl, descriptionEl].filter(Boolean).forEach(el => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            });
        }, 180);
    }

    function goToSlide(index) {
        current = ((index % slides.length) + slides.length) % slides.length;
        slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
        dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
        updateContent(current);
    }

    function nextSlide() { goToSlide(current + 1); }
    function stopAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
        autoplayTimer = null;
    }
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    goToSlide(0);
    startAutoplay();

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = Number(dot.dataset.slide);
            if (!Number.isNaN(index)) {
                goToSlide(index);
                startAutoplay();
            }
        });
    });

    sliderEl.closest(".hero")?.addEventListener("mouseenter", stopAutoplay);
    sliderEl.closest(".hero")?.addEventListener("mouseleave", startAutoplay);
}

document.addEventListener("DOMContentLoaded", () => {
    const start = () => {
        if (document.getElementById("heroSlider")) initHeroSlider();
    };
    start();

    const heroContainer = document.getElementById("hero");
    if (heroContainer && !document.getElementById("heroSlider")) {
        const observer = new MutationObserver(() => {
            if (document.getElementById("heroSlider")) {
                initHeroSlider();
                observer.disconnect();
            }
        });
        observer.observe(heroContainer, { childList: true, subtree: true });
    }
});
