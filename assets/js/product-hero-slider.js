function initProductHeroSlider() {
    const hero = document.getElementById("productHeroSlider");
    if (!hero || hero.dataset.initialized === "true") return;
    const slides = hero.querySelectorAll(".product-slider-slide");
    const dots = hero.querySelectorAll(".product-slider-dot");
    const title = hero.querySelector("#productSliderTitle");
    const tag = hero.querySelector("#productSliderTag");
    const desc = hero.querySelector("#productSliderDescription");
    const currentEl = hero.querySelector("#productSliderCurrent");
    if (!slides.length) return;
    hero.dataset.initialized = "true";

    const utilityData = [
        ["bi-hdd-network-fill","BESS Utility Series","Grid-Scale Battery Energy","Storage Solutions","Utility-scale containerized BESS engineered for renewable integration, peak shifting, grid support and dependable long-duration energy storage."],
        ["bi-globe2","Utility BESS Deployment","Designed for","Real-World Grid Applications","A scalable utility storage platform built for demanding environments, with intelligent thermal management, advanced BMS and SCADA-based control."],
        ["bi-lightning-charge-fill","Utility Energy Storage","Store More Energy","When the Grid Needs It","High-capacity battery storage helps balance renewable generation, improve grid flexibility and deliver energy when demand rises."],
        ["bi-sun-fill","Renewable + BESS","Powering a","Smarter Energy Future","Connect renewable generation with intelligent battery storage to improve energy availability, efficiency and grid resilience."]
    ];
    const ciData = [
        ["bi-battery-charging","BESS C&I Series","Commercial & Industrial","Energy Storage","Compact, scalable BESS solutions for commercial and industrial sites, designed for peak shaving, backup power and reliable daily operation."],
        ["bi-diagram-3-fill","Smart BESS Architecture","Connected Storage","Built for Control","Cell-level monitoring, multi-layer BMS architecture and flexible communication support BEMS and SCADA integration."],
        ["bi-building-fill","Commercial Energy Storage","Reduce Peak Demand","Improve Energy Efficiency","Deploy storage where your business needs it to manage demand, support critical loads and make better use of renewable energy."],
        ["bi-ev-station-fill","Energy + EV Infrastructure","Storage That Supports","High-Demand Sites","Pair battery storage with modern energy infrastructure to improve power availability and support demanding commercial applications."]
    ];
    const data = document.title.toLowerCase().includes("c&i") ? ciData : utilityData;
    let current = 0, timer;
    function update(i) {
        [title,tag,desc].forEach(el => { if(el){el.style.opacity="0";el.style.transform="translateY(12px)";}});
        setTimeout(() => {
            const d=data[i];
            tag.innerHTML=`<i class="bi ${d[0]}"></i><span>${d[1]}</span>`;
            title.innerHTML=`${d[2]} <span>${d[3]}</span>`;
            desc.textContent=d[4];
            if(currentEl) currentEl.textContent=String(i+1).padStart(2,"0");
            [title,tag,desc].forEach(el => {if(el){el.style.opacity="1";el.style.transform="translateY(0)";}});
        },180);
    }
    function go(i){
        current=(i+slides.length)%slides.length;
        slides.forEach((s,n)=>s.classList.toggle("active",n===current));
        dots.forEach((d,n)=>d.classList.toggle("active",n===current));
        update(current);
    }
    function start(){clearInterval(timer);timer=setInterval(()=>go(current+1),5000);}
    go(0); start();
    dots.forEach(dot=>dot.addEventListener("click",()=>{go(Number(dot.dataset.slide));start();}));
    hero.addEventListener("mouseenter",()=>clearInterval(timer));
    hero.addEventListener("mouseleave",start);
}
document.addEventListener("DOMContentLoaded",initProductHeroSlider);

// Independent second image/project slider used only on BESS Utility and BESS C&I pages.
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-bess-project-slider]").forEach((slider) => {
        if (slider.dataset.initialized === "true") return;
        const slides = slider.querySelectorAll(".bess-project-slide");
        const dots = slider.querySelectorAll(".bess-project-dot");
        const prev = slider.querySelector(".bess-project-arrow.prev");
        const next = slider.querySelector(".bess-project-arrow.next");
        if (!slides.length) return;
        slider.dataset.initialized = "true";
        let current = 0, timer;
        const go = (index) => {
            current = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
            dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
        };
        const start = () => { clearInterval(timer); timer = setInterval(() => go(current + 1), 5500); };
        const stop = () => clearInterval(timer);
        prev?.addEventListener("click", () => { go(current - 1); start(); });
        next?.addEventListener("click", () => { go(current + 1); start(); });
        dots.forEach((dot) => dot.addEventListener("click", () => { go(Number(dot.dataset.slide)); start(); }));
        slider.addEventListener("mouseenter", stop);
        slider.addEventListener("mouseleave", start);
        slider.addEventListener("touchstart", stop, { passive: true });
        slider.addEventListener("touchend", start, { passive: true });
        go(0); start();
    });
});
