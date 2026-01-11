/* --- DATABASE MATERI LENGKAP --- */
const dataPlanet = {
    "matahari": {
        nama: "Matahari",
        deskripsi: "Pusat tata surya. Bintang raksasa yang sangat panas.",
        fakta: "Suhunya 15 juta derajat celcius di intinya!",
        gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/220px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg"
    },
    "merkurius": {
        nama: "Merkurius",
        deskripsi: "Planet terkecil dan terdekat dengan Matahari.",
        fakta: "Satu tahun di sini hanya 88 hari.",
        gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/220px-Mercury_in_true_color.jpg"
    },
    "venus": {
        nama: "Venus",
        deskripsi: "Planet terpanas karena efek rumah kaca.",
        fakta: "Matahari terbit dari Barat di sini.",
        gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/220px-Venus-real_color.jpg"
    },
    "bumi": {
        nama: "Bumi",
        deskripsi: "Tempat tinggal kita. Punya air cair dan oksigen.",
        fakta: "70% permukaan Bumi adalah air.",
        gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/220px-The_Earth_seen_from_Apollo_17.jpg"
    },
    "mars": {
        nama: "Mars",
        deskripsi: "Planet Merah berkarat.",
        fakta: "Punya gunung tertinggi di Tata Surya (Olympus Mons).",
        gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/220px-OSIRIS_Mars_true_color.jpg"
    },
    "jupiter": {
        nama: "Jupiter",
        deskripsi: "Planet terbesar di Tata Surya. Isinya gas raksasa.",
        fakta: "Punya noda merah besar yang sebenarnya adalah badai abadi.",
        gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/220px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg"
    },
    "saturnus": {
        nama: "Saturnus",
        deskripsi: "Terkenal dengan cincin indahnya dari es dan batu.",
        fakta: "Sangat ringan, bisa mengapung di atas air!",
        gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/220px-Saturn_during_Equinox.jpg"
    },
    "uranus": {
        nama: "Uranus",
        deskripsi: "Planet es berwarna biru muda.",
        fakta: "Berputar miring seperti bola yang menggelinding.",
        gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/220px-Uranus2.jpg"
    },
    "neptunus": {
        nama: "Neptunus",
        deskripsi: "Planet terjauh, paling dingin dan gelap.",
        fakta: "Angin di sini sangat kencang, lebih cepat dari suara!",
        gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/220px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg"
    }
};

/* --- LOGIKA INFO PLANET --- */
function bukaInfo(idPlanet) {
    const modal = document.getElementById("modal-info");
    const data = dataPlanet[idPlanet];
    document.getElementById("nama-planet").innerText = data.nama;
    document.getElementById("deskripsi-planet").innerText = data.deskripsi;
    document.getElementById("fakta-planet").innerText = data.fakta;
    document.getElementById("gambar-detail").src = data.gambar;
    modal.classList.remove("hidden");
    modal.style.display = "flex";
}
function tutupInfo() {
    document.getElementById("modal-info").classList.add("hidden");
    document.getElementById("modal-info").style.display = "none";
}

/* --- LOGIKA DOWNLOAD FILE (BARU) --- */
function unduhMakalah() { window.location.href = "makalah.pdf"; }
function unduhProject() { window.location.href = "project.pdf"; }
function unduhPPT() { window.location.href = "powerpoint.pdf"; }

function mulaiKuis() { window.open("https://gemini.google.com/share/bc9b2d8fee69", "_blank"); }

/* --- LOGIKA GAME --- */
let skor = 0;
let kunciJawaban = "";
let urutanSoal = []; 
let nomorSoal = 0;   
const totalSoal = 8;
const musik = document.getElementById("bg-music");

function bukaGame() {
    const modal = document.getElementById("modal-game");
    modal.innerHTML = `
        <div class="modal-content game-content">
            <span class="close-btn" onclick="tutupGame()">&times;</span>
            <h2>🚀 Tebak Gambar Planet</h2>
            <p id="skor-game" style="font-size: 1rem; color: #555;">Persiapan...</p>
            <img id="soal-gambar" src="" alt="Planet Misterius">
            <div id="jawaban-container"></div>
        </div>
    `;
    modal.classList.remove("hidden");
    modal.style.display = "flex";
    skor = 0;
    nomorSoal = 0;
    const allKeys = Object.keys(dataPlanet);
    urutanSoal = allKeys.filter(key => key !== "matahari");
    urutanSoal.sort(() => Math.random() - 0.5);
    updateStatusHeader();
    muatSoal();
    if (musik) { musik.currentTime = 0; musik.play().catch(e => console.log("Musik error: ", e)); }
}

function tutupGame() {
    document.getElementById("modal-game").classList.add("hidden");
    document.getElementById("modal-game").style.display = "none";
    if (musik) { musik.pause(); }
}

function updateStatusHeader() {
    document.getElementById("skor-game").innerText = `Soal ${nomorSoal + 1} / ${totalSoal}  |  Skor: ${skor}`;
}

function muatSoal() {
    if (nomorSoal >= totalSoal) {
        tampilkanNilaiAkhir();
        return;
    }
    const keySoal = urutanSoal[nomorSoal];
    const dataSoal = dataPlanet[keySoal];
    kunciJawaban = dataSoal.nama;
    document.getElementById("soal-gambar").src = dataSoal.gambar;

    const planetKeys = Object.keys(dataPlanet).filter(k => k !== "matahari");
    let pilihan = [dataSoal.nama];
    while (pilihan.length < 3) {
        const randomKey = planetKeys[Math.floor(Math.random() * planetKeys.length)];
        const namaSalah = dataPlanet[randomKey].nama;
        if (!pilihan.includes(namaSalah)) { pilihan.push(namaSalah); }
    }
    pilihan.sort(() => Math.random() - 0.5);

    const container = document.getElementById("jawaban-container");
    container.innerHTML = "";
    pilihan.forEach(nama => {
        const btn = document.createElement("button");
        btn.innerText = nama; btn.className = "btn-jawaban";
        btn.onclick = function() { cekJawaban(nama); };
        container.appendChild(btn);
    });
}

function cekJawaban(jawabanUser) {
    if (jawabanUser === kunciJawaban) {
        skor += 12.5; 
        alert("✅ BENAR!");
    } else {
        alert("❌ SALAH. Jawaban yang benar: " + kunciJawaban);
    }
    nomorSoal++;
    if (nomorSoal < totalSoal) {
        updateStatusHeader();
        muatSoal();
    } else {
        tampilkanNilaiAkhir();
    }
}

function tampilkanNilaiAkhir() {
    const modal = document.getElementById("modal-game");
    const nilaiBulat = Math.round(skor);
    let pesan = ""; let warna = "";
    if (nilaiBulat >= 85) { pesan = "LUAR BIASA! Calon Astronaut Hebat! 🚀"; warna = "#32CD32"; } 
    else if (nilaiBulat >= 60) { pesan = "Bagus! Tingkatkan lagi belajarnya. 👍"; warna = "#FFD700"; } 
    else { pesan = "Jangan menyerah, coba baca modul lagi ya. 📚"; warna = "#FF4500"; }

    modal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <span class="close-btn" onclick="tutupGame()">&times;</span>
            <h2>🏆 Hasil Permainan</h2>
            <p>Nilai Akhir Kamu:</p>
            <h1 style="font-size: 4rem; color: ${warna}; margin: 10px 0;">${nilaiBulat}</h1>
            <p style="font-weight: bold; margin-bottom: 20px;">${pesan}</p>
            <button onclick="bukaGame()" style="background-color: #1E90FF; color: white; padding: 10px 20px; border: none; border-radius: 20px; font-weight: bold; cursor: pointer;">Main Lagi 🔄</button>
            <button onclick="tutupGame()" style="background-color: #555; color: white; padding: 10px 20px; border: none; border-radius: 20px; font-weight: bold; cursor: pointer; margin-left: 10px;">Keluar ❌</button>
        </div>
    `;
    if (musik) { musik.pause(); }
}

window.onclick = function(event) {
    const mInfo = document.getElementById("modal-info");
    if (event.target == mInfo) tutupInfo();
}
