const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".my-alert");
const namaKoor = ["Ilham", "Roni", "Kiki"];
// Ambil nama dan nrp dari localStorage
var namaPekerja = localStorage.getItem("namaPekerja");
var nrpPekerja = localStorage.getItem("nrpPekerja"); // Tambahkan pengambilan NRP

// Tampilkan nama pekerja di dashboard
document.getElementById("namaPekerja").textContent = namaPekerja;

// Menangani pengiriman form produktifitas
document
  .getElementById("productivityForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah pengiriman form

    // Ambil data dari form
    var bagian = document.getElementById("bagian").value;
    var date = document.getElementById("date").value;
    var task = document.getElementById("task").value;
    var hours = document.getElementById("hours").value;
    let koor;

    if (bagian == "Receiving") {
      koor = namaKoor[0];
    }
    if (bagian == "Shipping") {
      koor = namaKoor[1];
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
      }),
    })
      .then((response) => {
        btnLoading.classList.toggle("d-none");
        btnKirim.classList.toggle("d-none");
        myAlert.classList.toggle("d-none");
        //  $("#form_alerts").html("<div class='alert alert-success'>Data berhasil dikirim.</div>")
        $("#form_alerts").html(
          "<div class='alert alert-danger'>Data gagal terkirim!.</div>"
        );
      })
      .catch((error) =>
        $("#form_alerts").html(
          "<div class='alert alert-success'>Data berhasil dikirim. Grup Peserta https://chat.whatsapp.com/HIl6Wp1UwbIC7vO488hO4W</div>"
        )
      );

    // ketika tombol diklik
    // tampilkan tombol loading hilangkan tombol kirim
    btnLoading.classList.toggle("d-none");
    btnKirim.classList.toggle("d-none");
    form.reset();
  });
