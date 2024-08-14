// Fungsi untuk menghitung BMI
function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value); // Mengambil nilai berat badan
  const height = parseFloat(document.getElementById("height").value) / 100; // Mengambil nilai tinggi badan dan mengonversi ke meter
  const age = parseInt(document.getElementById("age").value); // Mengambil nilai usia

  // Validasi input
  if (isNaN(weight) || isNaN(height) || height === 0 || isNaN(age)) {
    alert("Tolong masukkan nilai yang valid!"); // Menampilkan pesan jika input tidak valid
    return;
  }

  // Menghitung BMI
  const bmi = (weight / (height * height)).toFixed(2);
  document.getElementById("bmi-result").textContent = `BMI Anda: ${bmi}`;

  // Menentukan kategori BMI dan memberikan tips
  let category = "";
  let tips = "";
  if (bmi < 18.5) {
    category = "Kurus";
    tips = `
      <h3>Tips untuk Berat Badan Kurus:</h3>
      <ul>
        <li>Perbanyak konsumsi makanan bergizi seperti sayuran, buah-buahan, dan protein.</li>
        <li>Cobalah makan lebih sering dalam porsi kecil.</li>
        <li>Tambahkan camilan sehat di antara waktu makan.</li>
        <li>Latihan kekuatan untuk meningkatkan massa otot.</li>
      </ul>
    `;
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Normal";
    tips = `
      <h3>Tips untuk Berat Badan Normal:</h3>
      <ul>
        <li>Pertahankan pola makan seimbang dengan asupan gizi yang cukup.</li>
        <li>Jaga agar tetap aktif dengan olahraga teratur.</li>
        <li>Minimalkan konsumsi makanan olahan dan gula berlebih.</li>
        <li>Perhatikan perubahan berat badan dan lakukan penyesuaian jika diperlukan.</li>
      </ul>
    `;
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    tips = `
      <h3>Tips untuk Berat Badan Berlebih:</h3>
      <ul>
        <li>Kurangi asupan kalori dengan memperhatikan porsi makan.</li>
        <li>Fokus pada makanan rendah lemak dan kaya serat.</li>
        <li>Tambah rutinitas olahraga yang melibatkan kardio dan kekuatan.</li>
        <li>Konsultasikan dengan ahli gizi untuk rencana makan yang sesuai.</li>
      </ul>
    `;
  } else {
    category = "Obesitas";
    tips = `
      <h3>Tips untuk Obesitas:</h3>
      <ul>
        <li>Bekerjalah dengan profesional kesehatan untuk program penurunan berat badan yang aman.</li>
        <li>Perhatikan pola makan dengan mengurangi makanan tinggi kalori dan lemak jenuh.</li>
        <li>Gabungkan olahraga teratur, termasuk latihan kardio dan kekuatan.</li>
        <li>Pertimbangkan dukungan kelompok atau konseling untuk perubahan gaya hidup yang berkelanjutan.</li>
      </ul>
    `;
  }

  // Menampilkan kategori BMI dan tips
  document.getElementById("bmiCategory").textContent = `Kategori: ${category}`;
  document.getElementById("tips").innerHTML = tips;

  // Memperbarui grafik BMI
  updateBMIChart(bmi);
}

// Fungsi untuk memperbarui grafik BMI
function updateBMIChart(bmi) {
  const ctx = document.getElementById("bmiChart").getContext("2d");
  const chartData = {
    labels: ["Kurus", "Normal", "Overweight", "Obesitas"],
    datasets: [
      {
        label: "BMI Anda",
        data: [
          bmi < 18.5 ? bmi : null,
          bmi >= 18.5 && bmi < 24.9 ? bmi : null,
          bmi >= 25 && bmi < 29.9 ? bmi : null,
          bmi >= 30 ? bmi : null,
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.raw !== null) {
              return `BMI Anda: ${bmi}`;
            }
            return tooltipItem.label;
          },
        },
      },
    },
  };

  if (window.bmiChart) {
    window.bmiChart.destroy(); // Hapus chart yang sudah ada jika ada
  }

  window.bmiChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: chartOptions,
  });
}

// Fungsi untuk mereset kalkulator
function resetCalculator() {
  document.getElementById("bmi-form").reset(); // Mengatur ulang form
  document.getElementById("bmi-result").textContent =
    "BMI Anda akan tampil di sini"; // Mengatur ulang hasil BMI
  document.getElementById("bmiCategory").textContent = ""; // Mengatur ulang kategori BMI
  document.getElementById("tips").innerHTML = ""; // Mengatur ulang tips

  if (window.bmiChart) {
    window.bmiChart.destroy(); // Hapus chart yang sudah ada
  }
}

// Tambahkan event listener untuk tombol reset
document
  .querySelector(".btn-secondary")
  .addEventListener("click", resetCalculator); // Menambahkan event listener pada tombol reset
