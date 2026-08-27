/* Footer & Service Agent loader for product detail pages located in components/home/product */
document.addEventListener("DOMContentLoaded", () => {
    const footerTarget = document.getElementById("productFooter");
    const serviceAgentTarget = document.getElementById("serviceAgent");

    if (!footerTarget && !serviceAgentTarget) return;

    // Load Footer
    if (footerTarget) {
        fetch("../../../components/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Unable to load footer");
                return response.text();
            })
            .then(html => {
                const rootPath = "../../../";

                html = html.replace(/(src|href)="assets\//g, `$1="${rootPath}assets/`);
                html = html.replace(/href="(?!https?:|mailto:|tel:|#|\.\.\/|\.\/|assets\/)([^"]+)"/g, (match, path) => `href="${rootPath}${path}"`);

                footerTarget.innerHTML = html;
            })
            .catch(error => console.error(error));
    }

    // Load Service Agent
    if (serviceAgentTarget) {
        fetch("../../../components/service-agent.html")
            .then(response => {
                if (!response.ok) throw new Error("Unable to load service agent");
                return response.text();
            })
            .then(html => {
                serviceAgentTarget.innerHTML = html;
                
                // Initialize service agent after loading
                if (typeof initServiceAgent === "function") {
                    initServiceAgent();
                }
            })
            .catch(error => console.error(error));
    }
});
