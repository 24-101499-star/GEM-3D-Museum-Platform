// Artifact detail content. artifact.html?id=<key> picks one entry.
const ARTIFACTS = {
    nefertem: {
        plate: "Tutankhamun as Nefertem",
        eyebrow: "Historical Context",
        heading: "The Lotus Bust<br>of the Young King",
        text: "Dynasty XVIII, ca. 1336–1327 BC. Discovered in the Valley of the Kings. <em>Depicts Tutankhamun emerging from a blue lotus blossom, symbolizing rebirth and eternal divine nature.</em> <span class=\"gold\">Material</span>: <em>Stuccoed and painted wood.</em>",
        model: "tutankhamen_emerging_from_a_lotus.glb"
    },
    amenhotep: {
        plate: "Head of Amenhotep III, c. 1391–1353 BC",
        eyebrow: "Royal Crown & Eternity",
        heading: "Head of the Young King<br>in the Blue Crown",
        text: "Dynasty XVIII, ca. 1336–1327 BC. Discovered in the Valley of the Kings. This striking representation captures Tutankhamun wearing the iconic blue khepresh crown, symbolizing royal authority and martial power.",
        model: "head_of_amenhotep_iii_c._1391-1353_bc.glb"
    },
    khasekhem: {
        plate: "Statue of King Khasekhem",
        eyebrow: "Royal Statuary",
        heading: "The Seated<br>Pharaoh",
        text: "Dynasty XVIII, ca. 1336–1327 BC. Discovered in the Valley of the Kings. A magnificent depiction of the young king enthroned, showcasing exquisite divine proportions and royal regalia. <span class=\"gold\">Material</span>: Carved and painted limestone.",
        model: "statue_of_king_khasekhem.glb"
    },
    roy: {
        plate: "Statue of Roy, High Priest of Amun",
        eyebrow: "Egyptian Priestly Statuary",
        heading: "Statue of Roy, High<br>Priest of Amun",
        text: "Dynasty XIX, ca. 1290–1270 BC. A magnificent block statue depicting Roy wrapped in a cloak, featuring sacred inscriptions and divine attributes dedicated to Amun. <span class=\"gold\">Material</span>: Granodiorite / stone.",
        model: "a_statue_of_roy_high_priest_of_amun.glb"
    },
    thutmose: {
        plate: "Thutmose III Statue",
        eyebrow: "Egyptian Pharaonic Heritage",
        heading: "Thutmose III<br>Statue",
        text: "Historical depiction of Thutmose III from the Karnak temple complex in Egypt. Represents the divine kingship and monumental legacy of the New Kingdom pharaoh. <span class=\"gold\">Material</span>: Granodiorite / stone.",
        model: "thutmose_iii_statue_from_karnak_temple_egypt.glb"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const id = new URLSearchParams(location.search).get("id");
    const a = ARTIFACTS[id] || ARTIFACTS.nefertem;

    document.title = a.plate + " | GEM";
    document.querySelector(".info-eyebrow").textContent = a.eyebrow;
    document.querySelector(".info-heading").innerHTML = a.heading;
    document.querySelector(".info-text").innerHTML = a.text;
    document.querySelector(".plate").textContent = a.plate;

    const viewer = document.querySelector(".stage model-viewer");
    viewer.setAttribute("src", a.model);
    viewer.setAttribute("alt", "3D model of " + a.plate);
});
