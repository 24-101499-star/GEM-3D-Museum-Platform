document.addEventListener("DOMContentLoaded", () => {

    // ---------- hero pharaoh slide-in (waits only for its own image, not the video/gif) ----------
    const pharaohImage = document.querySelector(".hro");
    if (pharaohImage) {
        const start = () => setTimeout(() => pharaohImage.classList.add("animate-pharaoh"), 300);
        if (pharaohImage.complete) start();
        else pharaohImage.addEventListener("load", start, { once: true });
    }

    // ---------- mobile / tablet menu ----------
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.getElementById("mobile-menu");
    const backdrop = document.querySelector(".menu-backdrop");

    if (menuBtn && menu) {
        const links = () => menu.querySelectorAll("a");

        const setOpen = (open) => {
            menu.hidden = !open;
            if (backdrop) backdrop.hidden = !open;
            menuBtn.setAttribute("aria-expanded", String(open));
            menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
            document.body.classList.toggle("menu-open", open);
            if (open) links()[0].focus();
        };

        menuBtn.addEventListener("click", () => setOpen(menu.hidden));
        if (backdrop) backdrop.addEventListener("click", () => setOpen(false));
        links().forEach((a) => a.addEventListener("click", () => setOpen(false)));

        document.addEventListener("keydown", (e) => {
            if (menu.hidden) return;
            if (e.key === "Escape") {
                setOpen(false);
                menuBtn.focus();
            }
            // keep Tab focus inside the menu + toggle button
            if (e.key === "Tab") {
                const items = [menuBtn, ...links()];
                const first = items[0];
                const last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });

        // close if the window grows back to desktop width
        window.matchMedia("(min-width: 1200px)").addEventListener("change", (e) => {
            if (e.matches) setOpen(false);
        });
    }

    // ---------- Chronicle gold pieces slide in when scrolled into view (works on touch) ----------
    const chronicle = document.querySelector(".S-2");
    if (chronicle && "IntersectionObserver" in window) {
        new IntersectionObserver((entries) => {
            entries.forEach((entry) => chronicle.classList.toggle("in-view", entry.isIntersecting));
        }, { threshold: 0.35 }).observe(chronicle);
    }

    // ---------- AR button launches AR on the nearest model-viewer ----------
    document.querySelectorAll(".ar-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const viewer = document.querySelector(btn.dataset.target || "model-viewer");
            if (!viewer) return;
            if (viewer.canActivateAR) viewer.activateAR();
            else viewer.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });
});
