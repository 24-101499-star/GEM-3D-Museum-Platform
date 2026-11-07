window.addEventListener("load", () => {
    let pharaohImage = document.querySelector(".hro");

    setTimeout(() => {
        if(pharaohImage) {
            pharaohImage.classList.add("animate-pharaoh");
        }
    }, 300);
});