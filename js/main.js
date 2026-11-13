// Shared page behaviour: mobile menu, hero animation, scroll effects, AR button, newsletter.

document.addEventListener("DOMContentLoaded", () => {
    setupMenu();
    setupHeroAnimation();
    setupChronicleReveal();
    setupArButtons();
    setupNewsletter();
});

function setupMenu() {
    const button = document.querySelector(".menu-btn");
    const menu = document.getElementById("mobile-menu");
    const backdrop = document.querySelector(".menu-backdrop");
    if (!button || !menu) return;

    const links = [...menu.querySelectorAll("a")];

    function setOpen(open) {
        menu.hidden = !open;
        backdrop.hidden = !open;
        button.setAttribute("aria-expanded", open);
        button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        document.body.classList.toggle("menu-open", open);
        if (open) links[0].focus();
    }

    button.addEventListener("click", () => setOpen(menu.hidden));
    backdrop.addEventListener("click", () => setOpen(false));
    links.forEach((link) => link.addEventListener("click", () => setOpen(false)));

    document.addEventListener("keydown", (e) => {
        if (menu.hidden) return;

        if (e.key === "Escape") {
            setOpen(false);
            button.focus();
        }

        // keep Tab inside the menu while it is open
        if (e.key === "Tab") {
            const first = button;
            const last = links[links.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // the menu only exists below 1200px, so close it if the window gets wider
    matchMedia("(min-width: 1200px)").addEventListener("change", (e) => {
        if (e.matches) setOpen(false);
    });
}


// Slide the pharaoh in once its own image has loaded
// (window "load" would also wait for the video and the gif).
function setupHeroAnimation() {
    const pharaoh = document.querySelector(".hero-pharaoh");
    if (!pharaoh) return;

    const start = () => setTimeout(() => pharaoh.classList.add("is-visible"), 300);

    if (pharaoh.complete) start();
    else pharaoh.addEventListener("load", start, { once: true });
}


// The gold relics in the Chronicle section slide in on hover (desktop).
// Touch screens have no hover, so also trigger them when the section scrolls into view.
function setupChronicleReveal() {
    const section = document.querySelector(".chronicle");
    if (!section || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
        section.classList.toggle("in-view", entry.isIntersecting);
    }, { threshold: 0.35 });

    observer.observe(section);
}


// "AR Experience" buttons open AR on phones that support it.
// Elsewhere they just bring the 3D model into view.
function setupArButtons() {
    document.querySelectorAll(".ar-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const viewer = document.querySelector("model-viewer");
            if (!viewer) return;

            if (viewer.canActivateAR) viewer.activateAR();
            else viewer.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });
}


// No mailing-list backend yet, so just confirm the address was received.
function setupNewsletter() {
    const form = document.querySelector(".newsletter");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!form.nextElementSibling?.classList.contains("newsletter-note")) {
            form.insertAdjacentHTML("afterend", '<p class="newsletter-note">Thanks! You\'re on the list.</p>');
        }
        form.reset();
    });
}
