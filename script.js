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
function unduhModul() { window.location.href = "modul.pdf"; }
function mulaiKuis() { window.open("https://gemini.google.com/share/bc9b2d8fee69", "_blank"); }

/* --- LOGIKA GAME BARU (8 SOAL + PENILAIAN) --- */
let skor = 0;
let kunciJawaban = "";
let urutanSoal = []; // Menyimpan daftar planet yang akan ditanyakan
let nomorSoal = 0;   // Melacak kita ada di soal ke berapa (0-7)
const totalSoal = 8;
const musik = document.getElementById("bg-music");

function bukaGame() {
    const modal = document.getElementById("modal-game");
    
    // 1. Reset tampilan Modal ke tampilan Game (jika sebelumnya tampilan Nilai)
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
    
    // 2. Persiapan Data Game
    skor = 0;
    nomorSoal = 0;
    
    // Ambil semua planet KECUALI Matahari
    const allKeys = Object.keys(dataPlanet);
    urutanSoal = allKeys.filter(key => key !== "matahari");
    
    // Acak urutan soal biar tidak bosan (Fisher-Yates Shuffle)
    urutanSoal.sort(() => Math.random() - 0.5);

    // 3. Mulai Soal Pertama & Musik
    updateStatusHeader();
    muatSoal();
    
    if (musik) {
        musik.currentTime = 0;
        musik.play().catch(e => console.log("Musik error: ", e));
    }
}

function tutupGame() {
    document.getElementById("modal-game").classList.add("hidden");
    document.getElementById("modal-game").style.display = "none";
    if (musik) { musik.pause(); }
}

function updateStatusHeader() {
    // Menampilkan: "Soal 1/8 | Skor: 0"
    document.getElementById("skor-game").innerText = 
        `Soal ${nomorSoal + 1} / ${totalSoal}  |  Skor: ${skor}`;
}

function muatSoal() {
    // Cek apakah soal sudah habis?
    if (nomorSoal >= totalSoal) {
        tampilkanNilaiAkhir();
        return;
    }

    // Ambil data planet berdasarkan urutan saat ini
    const keySoal = urutanSoal[nomorSoal];
    const dataSoal = dataPlanet[keySoal];
    kunciJawaban = dataSoal.nama;

    // Tampilkan gambar
    document.getElementById("soal-gambar").src = dataSoal.gambar;

    // Siapkan Pilihan Jawaban (1 Benar + 2 Salah)
    // Ambil key planet untuk pengecoh (exclude matahari)
    const planetKeys = Object.keys(dataPlanet).filter(k => k !== "matahari");
    
    let pilihan = [dataSoal.nama];
    while (pilihan.length < 3) {
        const randomKey = planetKeys[Math.floor(Math.random() * planetKeys.length)];
        const namaSalah = dataPlanet[randomKey].nama;
        if (!pilihan.includes(namaSalah)) {
            pilihan.push(namaSalah);
        }
    }
    // Acak posisi tombol
    pilihan.sort(() => Math.random() - 0.5);

    // Render Tombol
    const container = document.getElementById("jawaban-container");
    container.innerHTML = "";
    pilihan.forEach(nama => {
        const btn = document.createElement("button");
        btn.innerText = nama; 
        btn.className = "btn-jawaban";
        btn.onclick = function() { cekJawaban(nama); };
        container.appendChild(btn);
    });
}

function cekJawaban(jawabanUser) {
    if (jawabanUser === kunciJawaban) {
        skor += 12.5; // 100 dibagi 8 soal = 12.5 poin per soal
        alert("✅ BENAR!");
    } else {
        alert("❌ SALAH. Jawaban yang benar: " + kunciJawaban);
    }
    
    // Lanjut ke soal berikutnya
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
    const nilaiBulat = Math.round(skor); // Bulatkan nilai (misal 87.5 jadi 88)
    
    let pesan = "";
    let warna = "";
    
    if (nilaiBulat >= 85) {
        pesan = "LUAR BIASA! Calon Astronaut Hebat! 🚀";
        warna = "#32CD32"; // Hijau
    } else if (nilaiBulat >= 60) {
        pesan = "Bagus! Tingkatkan lagi belajarnya. 👍";
        warna = "#FFD700"; // Emas
    } else {
        pesan = "Jangan menyerah, coba baca modul lagi ya. 📚";
        warna = "#FF4500"; // Merah
    }

    // Ubah tampilan Modal menjadi Rapor Nilai
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
    
    // Matikan musik saat nilai muncul (opsional, biar dramatis)
    if (musik) { musik.pause(); }
}

/* --- EVENT LISTENER KLIK LUAR MODAL --- */
window.onclick = function(event) {
    const mInfo = document.getElementById("modal-info");
    const mGame = document.getElementById("modal-game");
    if (event.target == mInfo) tutupInfo();
    // Khusus game, kita kunci biar gak ketutup gak sengaja pas lagi main
    // Jadi user harus klik tombol X atau Keluar
}
