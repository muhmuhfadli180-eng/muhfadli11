// ========================================
// URL GOOGLE APPS SCRIPT
// ========================================

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyStRHflpLZCYQ46XSP669rcvdjOxGt7ZnXb5-Afp8Ln1U_7w4S3T2U1eA-7-mv-ybHpA/exec";


// ========================================
// ELEMENT
// ========================================

const form =
    document.getElementById("guestbookForm");

const status =
    document.getElementById("status");

const submitBtn =
    document.getElementById("submitBtn");

const messageList =
    document.getElementById("messageList");


// ========================================
// TAMPILKAN PESAN
// ========================================

async function tampilkanPesan() {

    if (!messageList) {
        return;
    }

    try {

        const response =
            await fetch(SCRIPT_URL);

        const data =
            await response.json();


        messageList.innerHTML = "";


        if (data.length === 0) {

            messageList.innerHTML = `
                <p class="loading">
                    Belum ada pesan.
                    Jadilah yang pertama! 😊
                </p>
            `;

            return;
        }


        data.reverse().forEach(function(item) {

            const card =
                document.createElement("div");

            card.className =
                "message-card";


            card.innerHTML = `
                <h3>
                    👤 ${escapeHTML(item.nama)}
                </h3>

                <small>
                    📧 ${escapeHTML(item.email)}
                </small>

                <p>
                    ${escapeHTML(item.pesan)}
                </p>
            `;


            messageList.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        messageList.innerHTML = `
            <p class="loading error">
                ❌ Gagal memuat pesan.
            </p>
        `;

    }

}


// ========================================
// KIRIM PESAN
// ========================================

if (form) {

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const nama =
                document
                .getElementById("nama")
                .value
                .trim();


            const email =
                document
                .getElementById("email")
                .value
                .trim();


            const pesan =
                document
                .getElementById("pesan")
                .value
                .trim();


            if (
                !nama ||
                !email ||
                !pesan
            ) {

                status.textContent =
                    "❌ Semua kolom harus diisi.";

                status.className =
                    "status error";

                return;
            }


            submitBtn.disabled = true;

            submitBtn.textContent =
                "⏳ Mengirim...";


            status.textContent =
                "Sedang mengirim pesan...";

            status.className =
                "status";


            try {

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


                status.textContent =
                    "✅ Pesan berhasil dikirim!";

                status.className =
                    "status success";


                form.reset();


                // Tunggu sebentar,
                // lalu ambil data terbaru

                setTimeout(
                    tampilkanPesan,
                    1000
                );


            } catch (error) {

                console.error(error);

                status.textContent =
                    "❌ Gagal mengirim pesan.";

                status.className =
                    "status error";

            }


            submitBtn.disabled = false;

            submitBtn.textContent =
                "📩 Kirim Pesan";

        }
    );

}


// ========================================
// MENCEGAH HTML INJECTION
// ========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


// ========================================
// LOAD PESAN SAAT HALAMAN DIBUKA
// ========================================

tampilkanPesan();
