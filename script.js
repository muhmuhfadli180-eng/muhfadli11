// ========================================
// GOOGLE SPREADSHEET DATABASE
// ========================================


// GANTI URL INI DENGAN URL WEB APP GAS KAMU

const SCRIPT_URL =
    "MASUKKAN_URL_GOOGLE_APPS_SCRIPT_DISINI";


// ========================================
// FORM BUKU TAMU
// ========================================

const form =
    document.getElementById("guestbookForm");

const status =
    document.getElementById("status");

const submitBtn =
    document.getElementById("submitBtn");


if (form) {

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            // Ambil data

            const nama =
                document.getElementById("nama").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const pesan =
                document.getElementById("pesan").value.trim();


            // Validasi

            if (!nama || !email || !pesan) {

                status.textContent =
                    "❌ Semua kolom harus diisi.";

                status.className =
                    "status error";

                return;

            }


            // Tombol loading

            submitBtn.disabled = true;

            submitBtn.textContent =
                "⏳ Mengirim...";


            status.textContent =
                "Sedang mengirim pesan...";

            status.className =
                "status";


            try {


                // Kirim ke Google Apps Script

                await fetch(
                    SCRIPT_URL,
                    {

                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        },

                        body: JSON.stringify({

                            nama: nama,

                            email: email,

                            pesan: pesan

                        })

                    }
                );


                // Berhasil

                status.textContent =
                    "✅ Pesan berhasil dikirim! Terima kasih 😊";

                status.className =
                    "status success";


                // Kosongkan form

                form.reset();


            } catch (error) {


                console.error(error);


                status.textContent =
                    "❌ Pesan gagal dikirim. Silakan coba lagi.";

                status.className =
                    "status error";


            } finally {


                submitBtn.disabled = false;

                submitBtn.textContent =
                    "📩 Kirim Pesan";

            }

        }
    );

}
