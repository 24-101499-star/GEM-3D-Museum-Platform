// Content for artifact.html. The page reads ?id=... from the URL and fills itself in.
// To add an artifact: add an entry here and link to artifact.html?id=<key>.

const ARTIFACTS = {
    nefertem: {
        name: "Tutankhamun as Nefertem",
        eyebrow: "Historical Context",
        title: ["The Lotus Bust", "of the Young King"],
        text: "Dynasty XVIII, ca. 1336–1327 BC. Discovered in the Valley of the Kings. <em>Depicts Tutankhamun emerging from a blue lotus blossom, symbolizing rebirth and eternal divine nature.</em> <span class=\"gold\">Material</span>: <em>Stuccoed and painted wood.</em>",
        model: "assets/models/tutankhamun-lotus.glb"
    },
    amenhotep: {
        name: "Head of Amenhotep III, c. 1391–1353 BC",
        eyebrow: "Royal Crown & Eternity",
        title: ["Head of the Young King", "in the Blue Crown"],
        text: "Dynasty XVIII, ca. 1336–1327 BC. Discovered in the Valley of the Kings. This striking representation captures Tutankhamun wearing the iconic blue khepresh crown, symbolizing royal authority and martial power.",
        model: "assets/models/amenhotep-iii-head.glb"
    },
    khasekhem: {
        name: "Statue of King Khasekhem",
        eyebrow: "Royal Statuary",
        title: ["The Seated", "Pharaoh"],
        text: "Dynasty XVIII, ca. 1336–1327 BC. Discovered in the Valley of the Kings. A magnificent depiction of the young king enthroned, showcasing exquisite divine proportions and royal regalia. <span class=\"gold\">Material</span>: Carved and painted limestone.",
        model: "assets/models/khasekhem-statue.glb"
    },
    roy: {
        name: "Statue of Roy, High Priest of Amun",
        eyebrow: "Egyptian Priestly Statuary",
        title: ["Statue of Roy, High", "Priest of Amun"],
        text: "Dynasty XIX, ca. 1290–1270 BC. A magnificent block statue depicting Roy wrapped in a cloak, featuring sacred inscriptions and divine attributes dedicated to Amun. <span class=\"gold\">Material</span>: Granodiorite / stone.",
        model: "assets/models/roy-statue.glb"
    },
    thutmose: {
        name: "Thutmose III Statue",
        eyebrow: "Egyptian Pharaonic Heritage",
        title: ["Thutmose III", "Statue"],
        text: "Historical depiction of Thutmose III from the Karnak temple complex in Egypt. Represents the divine kingship and monumental legacy of the New Kingdom pharaoh. <span class=\"gold\">Material</span>: Granodiorite / stone.",
        model: "assets/models/thutmose-iii-statue.glb"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(location.search).get("id");
    const artifact = ARTIFACTS[id] || ARTIFACTS.nefertem;

    document.title = `${artifact.name} | GEM`;
    document.querySelector(".info-panel .eyebrow").textContent = artifact.eyebrow;
    document.querySelector(".info-panel .display").innerHTML = artifact.title.map((line) => `<span>${line}</span>`).join("");
    document.querySelector(".info-text").innerHTML = artifact.text;
    document.querySelector(".plate").textContent = artifact.name;

    // use attributes: the model-viewer script may not have loaded yet
    const viewer = document.querySelector(".stage model-viewer");
    viewer.setAttribute("src", artifact.model);
    viewer.setAttribute("alt", `3D model of ${artifact.name}`);
});
