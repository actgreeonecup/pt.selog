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
  "Vidya Nirmala Putri",
];

const namaBagian = [
  "Inventory",
  "Claim",
  "Receiving",
  "Storage",
  "Issuing",
  "Shipping",
  "Quality",
  "HSE & GA",
  "Administrasi",
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
    // var Aktifitas = document.getElementById("Aktifitas").value;
    var Aktifitas = document.getElementById("Aktifitas").value;
    // var bagian = document.getElementById("bagian").value;
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

    let bagian;
    if (Aktifitas == "Inventory") {
      bagian = namaBagian[0];
    } else if (Aktifitas == "Procurement") {
      bagian = namaBagian[0];
    } else if (Aktifitas == "Supply Operation") {
      bagian = namaBagian[0];
    } else if (Aktifitas == "BO Monitoring") {
      bagian = namaBagian[0];
    } else if (Aktifitas == "Claim Customer to Depo") {
      bagian = namaBagian[0];
    } else if (Aktifitas == "Claim Depo to TAM") {
      bagian = namaBagian[1];
    } else if (Aktifitas == "Unloading") {
      bagian = namaBagian[1];
    } else if (Aktifitas == "Checking Receiving") {
      bagian = namaBagian[1];
    } else if (Aktifitas == "Binning") {
      bagian = namaBagian[1];
    } else if (Aktifitas == "Cleansing Receiving") {
      bagian = namaBagian[1];
    } else if (Aktifitas == "Reserve") {
      bagian = namaBagian[2];
    } else if (Aktifitas == "Replenishment") {
      bagian = namaBagian[2];
    } else if (Aktifitas == "Relocation") {
      bagian = namaBagian[2];
    } else if (Aktifitas == "Trouble Shooter") {
      bagian = namaBagian[2];
    } else if (Aktifitas == "Maintain Location") {
      bagian = namaBagian[2];
    } else if (Aktifitas == "Maintain F") {
      bagian = namaBagian[2];
    } else if (Aktifitas == "Picking Issuing") {
      bagian = namaBagian[3];
    } else if (Aktifitas == "Checking Issuing") {
      bagian = namaBagian[3];
    } else if (Aktifitas == "Packaging Preparation") {
      bagian = namaBagian[3];
    } else if (Aktifitas == "Packing") {
      bagian = namaBagian[3];
    } else if (Aktifitas == "Picking - Checking - Packing (PCP)") {
      bagian = namaBagian[3];
    } else if (Aktifitas == "Cleansing Issuing") {
      bagian = namaBagian[3];
    } else if (Aktifitas == "Billing") {
      bagian = namaBagian[4];
    } else if (Aktifitas == "Loading") {
      bagian = namaBagian[4];
    } else if (Aktifitas == "Shipping Monitoring") {
      bagian = namaBagian[4];
    } else if (Aktifitas == "Monitoring Shipping Document") {
      bagian = namaBagian[4];
    } else if (Aktifitas == "Quality") {
      bagian = namaBagian[5];
    } else if (Aktifitas == "HSE") {
      bagian = namaBagian[6];
    } else if (Aktifitas == "GA") {
      bagian = namaBagian[6];
    } else if (Aktifitas == "Administrasi") {
      bagian = namaBagian[7];
    } else if (Aktifitas == "HR") {
      bagian = namaBagian[7];
    }
    let koor;
    if (bagian == "Receiving") {
      koor = namaKoor[0];
    } else if (bagian == "Shipping") {
      koor = namaKoor[5];
    } else if (bagian == "Storage") {
      koor = namaKoor[4];
    } else if (bagian == "Inventory") {
      koor = namaKoor[3];
    } else if (bagian == "Administrasi") {
      koor = namaKoor[6];
    } else if (bagian == "HSE") {
      koor = namaKoor[2];
    } else if (bagian == "Claim") {
      koor = namaKoor[5];
    } else if (bagian == "Issuing") {
      koor = namaKoor[1];
    }

    // URL Web App Google Apps Script
    var scriptURL =
      "https://script.google.com/macros/s/AKfycbwvzo9oshrek34-ZypNzcJev3iFu2E9Jo-SxOeAUVGtp719wQutqfUlVvrnTbU9FHJV/exec"; // Ganti dengan URL Web App Anda

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
        Aktifitas: Aktifitas,
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
