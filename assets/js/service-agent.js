function initServiceAgent() {

    const btn = document.getElementById("serviceAgentBtn");
    const window_el = document.getElementById("serviceAgentWindow");
    const overlay = document.getElementById("serviceAgentOverlay");
    const closeBtn = document.getElementById("serviceAgentClose");
    const form = document.getElementById("serviceAgentForm");
    const input = document.getElementById("serviceAgentInput");
    const messagesContainer = document.getElementById("serviceAgentMessages");

    if (!btn || !window_el || !overlay || !closeBtn || !form || !input || !messagesContainer) {
        console.warn("Service Agent elements not found");
        return;
    }

    function toggleWindow() {
        window_el.classList.toggle("open");
        overlay.classList.toggle("open");
    }

    btn.addEventListener("click", toggleWindow);
    closeBtn.addEventListener("click", toggleWindow);
    overlay.addEventListener("click", toggleWindow);

    const botResponses = {
        "charger": "We offer both AC and DC EV chargers.<br><br>🔌 <strong>AC Chargers</strong> — Perfect for home charging (3.3kW to 22kW). Charges in 3-8 hours.<br>⚡ <strong>DC Fast Chargers</strong> — For highways and public stations (30kW to 360kW). 80% charge in 30-90 minutes.<br><br>👉 <a href='products.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>View All Products →</a><br><br>Which one interests you?",
        "solar": "Our Solar EV Solutions combine solar panels with smart charging.<br><br>☀️ Generate clean energy and reduce electricity bills<br>☀️ Charge your EV using renewable power<br>☀️ On-grid, off-grid, or hybrid systems available<br><br>👉 <a href='components/home/product/solar-ev-solutions.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>Learn About Solar Solutions →</a><br><br>Would you like to know more about solar installation?",
        "bess": "BESS (Battery Energy Storage System) stores electricity for later use.<br><br>🔋 Backup power during outages<br>🔋 Peak shaving for reduced electricity costs<br>🔋 Perfect with solar installations<br>🔋 Available in multiple sizes<br><br>👉 <a href='components/home/product/battery-storage.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>Explore BESS Solutions →</a><br><br>Interested in battery storage?",
        "installation": "We provide complete installation services:<br><br>🏗️ Site assessment and system design<br>⚙️ Electrical setup and commissioning<br>📋 Warranty and maintenance support<br><br>👉 <a href='services.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>View Our Services →</a><br><br>Connect with our team for a site survey and personalized quote.",
        "price": "Pricing depends on your specific requirements:<br><br>💰 Charger type (AC or DC)<br>💰 System capacity (kW/kWh)<br>💰 Installation complexity<br>💰 Additional features (OCPP software, BESS, etc.)<br><br>👉 <a href='contact.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>Get a Custom Quote →</a><br><br>Please contact us for an accurate quote.",
        "contact": "📍 <strong>Delhi, India</strong><br>📧 <strong>Email:</strong> info@charzee.com<br>📞 <strong>Phone:</strong> +91 98765 43210<br>🕐 <strong>Mon - Sat:</strong> 9:00 AM - 6:30 PM<br><br>👉 <a href='contact.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>Fill Enquiry Form →</a><br><br>Would you like to reach out to us?",
        "solar ev": "☀️⚡ <strong>Solar + EV Charging</strong> — The perfect combination!<br><br>✅ Solar generates power during day<br>✅ Direct charging to your EV<br>✅ Reduced charging costs significantly<br>✅ 100% sustainable energy<br><br>👉 <a href='components/home/product/solar-ev-solutions.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>Explore Solar EV Solutions →</a><br><br>This setup is ideal for homes and businesses. Interested?",
        "maintenance": "We offer Annual Maintenance Contracts (AMC):<br><br>🔧 Regular system inspections<br>🔧 Performance monitoring<br>🔧 Emergency support<br>🔧 Extended equipment lifespan<br><br>👉 <a href='services.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>Learn More About AMC →</a><br><br>Available for chargers, solar systems and BESS.",
        "default": "Great question! For detailed information, please visit our pages:<br><br>👉 <a href='products.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>Products</a><br>👉 <a href='services.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>Services</a><br>👉 <a href='about.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>About Us</a><br>👉 <a href='contact.html' style='color:#06BFBF;font-weight:600;text-decoration:none;'>Contact Us</a><br><br>Is there anything specific I can help with?"
    };

    const quickReplies = [
        { text: "🔌 EV Chargers", key: "charger" },
        { text: "☀️ Solar Energy", key: "solar" },
        { text: "🔋 BESS Storage", key: "bess" },
        { text: "💰 Pricing", key: "price" },
        { text: "📞 Contact Info", key: "contact" }
    ];

    function showQuickReplies() {
        const quickContainer = document.createElement("div");
        quickContainer.className = "service-agent-quick-replies";
        quickContainer.style.cssText = "display:flex;flex-direction:column;gap:8px;margin-top:12px;";

        quickReplies.forEach(reply => {
            const btn = document.createElement("button");
            btn.className = "service-agent-quick-btn";
            btn.textContent = reply.text;
            btn.style.cssText = "padding:10px 14px;background:linear-gradient(135deg, #06BFBF 0%, #06BFBF 100%);color:white;border:none;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;text-align:left;";
            btn.onmouseover = () => btn.style.transform = "translateX(4px)";
            btn.onmouseout = () => btn.style.transform = "translateX(0)";
            btn.onclick = () => {
                input.value = reply.text;
                form.dispatchEvent(new Event("submit"));
            };
            quickContainer.appendChild(btn);
        });

        messagesContainer.appendChild(quickContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    setTimeout(showQuickReplies, 600);

    function getResponse(userMessage) {
        const msg = userMessage.toLowerCase();
        for (let key in botResponses) {
            if (msg.includes(key)) {
                return botResponses[key];
            }
        }
        return botResponses.default;
    }

    function escapeHtml(text) {
        const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userText = input.value.trim();
        if (!userText) return;

        const quickContainer = messagesContainer.querySelector(".service-agent-quick-replies");
        if (quickContainer) quickContainer.remove();

        const userMsg = document.createElement("div");
        userMsg.className = "service-agent-message user-message";
        userMsg.innerHTML = "<div class='message-content'>" + escapeHtml(userText) + "</div>";
        messagesContainer.appendChild(userMsg);

        input.value = "";
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            const botMsg = document.createElement("div");
            botMsg.className = "service-agent-message bot-message";
            const response = getResponse(userText);
            botMsg.innerHTML = "<div class='message-content'>" + response + "</div>";
            messagesContainer.appendChild(botMsg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 500);
    });

}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initServiceAgent);
} else {
    initServiceAgent();
}
