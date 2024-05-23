const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");
const namaKoor = [
  "Ilham Putra Pratama",
  "Roni Suharyanto",
  "Kiki Purnama",
  "Reyza Abdurrozaq",
  "Mas Gilang Ginanjar",
  "Johan Safarisa Sidik",
];

// Ambil nama dan nrp dari localStorage
var namaPekerja = localStorage.getItem("namaPekerja");
var nrpPekerja = localStorage.getItem("nrpPekerja");

// Tampilkan nama pekerja di dashboard
document.getElementById("namaPekerja").textContent = namaPekerja;

function hitungJamKerja() {
  // Ambil nilai jam mulai, jam selesai, dan bagian
  const jamMulai = document.getElementById("jamMulai").value;
  const jamSelesai = document.getElementById("jamSelesai").value;
  const bagian = document.getElementById("bagian").value;

  let jamKerja;

  if (bagian === "Istirahat") {
    jamKerja = 1;
  } else if (bagian === "Break") {
    jamKerja = 0.25; // 15 menit adalah 0.25 jam
  } else {
    // Buat objek Date dengan tanggal yang sama dan waktu sesuai input
    const mulai = new Date(`1970-01-01T${jamMulai}:00`);
    const selesai = new Date(`1970-01-01T${jamSelesai}:00`);

    // Hitung selisih waktu dalam milidetik
    let selisih = selesai - mulai;

    // Jika jam selesai lebih kecil dari jam mulai, tambah satu hari ke jam selesai
    if (selesai < mulai) {
      selesai.setDate(selesai.getDate() + 1);
      selisih = selesai - mulai;
    }

    // Konversi selisih waktu ke jam
    jamKerja = selisih / (1000 * 60 * 60);
  }

  // Tampilkan hasil
  document.getElementById(
    "hasil"
  ).innerText = `Total jam kerja: ${jamKerja} jam`;
}

// Menangani pengiriman form produktifitas
document
  .getElementById("productivityForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah pengiriman form

    // Ambil data dari form
    var bagian = document.getElementById("bagian").value;
    var date = document.getElementById("date").value;
    var task = document.getElementById("task").value;
    var jamMulai = document.getElementById("jamMulai").value;
    var jamSelesai = document.getElementById("jamSelesai").value;

    // Hitung jam kerja
    let hours;
    if (bagian === "Istirahat") {
      hours = 1;
    } else if (bagian === "Break") {
      hours = 0.25; // 15 menit adalah 0.25 jam
    } else {
      const mulai = new Date(`1970-01-01T${jamMulai}:00`);
      const selesai = new Date(`1970-01-01T${jamSelesai}:00`);
      let selisih = selesai - mulai;
      if (selesai < mulai) {
        selesai.setDate(selesai.getDate() + 1);
        selisih = selesai - mulai;
      }
      hours = selisih / (1000 * 60 * 60);
    }

    let koor;
    if (bagian == "Receiving") {
      koor = namaKoor[0];
    } else if (bagian == "Shipping") {
      koor = namaKoor[1];
    } else if (bagian == "Storage") {
      koor = namaKoor[4];
    } else if (bagian == "Inventory") {
      koor = namaKoor[1];
    } else if (bagian == "Administrasi") {
      koor = namaKoor[3];
    } else if (bagian == "HSE") {
      koor = namaKoor[2];
    } else if (bagian == "Claim") {
      koor = namaKoor[5];
    } else if (bagian == "Kaizen") {
      koor = namaKoor[5];
    }

    if (bagian == "Istirahat") {
      koor = namaPekerja;
    }

    if (bagian == "Break") {
      koor = namaPekerja;
    }

    // URL Web App Google Apps Script
    var scriptURL =
      "https://script.google.com/macros/s/AKfycbzlBFn4fYWGMCJgzciJsxPwoN8jZcTmor3YbZ_2PLpxLHkHAB9kfK0VvgOf4YNi2TUj/exec"; // Ganti dengan URL Web App Anda

    // Kirim data ke Google Apps Script
    fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        nama: namaPekerja,
        nrp: nrpPekerja,
        date: date,
        task: task,
        hours: hours,
        bagian: bagian,
        koor: koor,
        jamMulai: jamMulai,
        jamSelesai: jamSelesai,
      }),
    })
      .then((response) => {
        btnLoading.classList.toggle("d-none");
        btnKirim.classList.toggle("d-none");
        myAlert.classList.toggle("d-none");
        $("#form_alerts").html(
          "<div class='alert alert-danger'>Data gagal terkirim!.</div>"
        );
      })
      .catch((error) => {
        $("#form_alerts").html(
          "<div class='alert alert-success'>Data berhasil dikirim.</div>"
        );
      });

    // ketika tombol diklik
    // tampilkan tombol loading hilangkan tombol kirim
    btnLoading.classList.toggle("d-none");
    btnKirim.classList.toggle("d-none");
    document.getElementById("productivityForm").reset();
  });
