emailjs.init({
    publicKey: "jSNBIBglhmoEFDx9h"
});

function initContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // Button loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Sending...
        `;

        emailjs.sendForm(
            "service_idb372p",
            "template_yhxwx3o",
            this
        )
        .then(() => {

            Swal.fire({
                icon: "success",
                title: "Thank You!",
                text: "Your message has been sent successfully.",
                confirmButtonColor: "#06BFBF"
            });

            form.reset();

        })
        .catch(() => {

            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Failed to send your message. Please try again.",
                confirmButtonColor: "#06BFBF"
            });

        })
        .finally(() => {

            // Button normal state
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <i class="bi bi-send-fill me-2"></i>
                Send Message
            `;

        });

    });

}



