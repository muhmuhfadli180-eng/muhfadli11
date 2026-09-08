document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("guestbookForm");
    const status = document.getElementById("status");
    const messageList = document.getElementById("messageList");

    /*
     * Halaman index.html tidak memiliki form buku tamu,
     * jadi script langsung berhenti.
     */
    if (!form) {
        return;
    }


    /* =========================
       DATA PESAN
    ========================= */

    let messages =
        JSON.parse(
            localStorage.getItem("guestbookMessages")
        ) || [];


    /* =========================
       TAMPILKAN PESAN
    ========================= */

    function tampilkanPesan() {

        if (!messageList) {
            return;
        }

        if (messages.length === 0) {

            messageList.innerHTML = `
                <p class="loading">
                    Belum ada pesan.
                </p>
            `;

            return;
        }


        messageList.innerHTML = "";


        messages.forEach(function (message) {

            const card =
                document.createElement("div");

            card.className = "message-card";


            const nama =
                document.createElement("h3");

            nama.textContent =
                message.nama;


            const waktu =
                document.createElement("small");

            waktu.textContent =
                message.waktu;


            const pesan =
                document.createElement("p");

            pesan.textContent =
                message.pesan;


            card.appendChild(nama);
            card.appendChild(waktu);
            card.appendChild(pesan);

            messageList.appendChild(card);

        });
    }


    /* =========================
       KIRIM PESAN
    ========================= */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const nama =
                document.getElementById("nama").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const pesan =
                document.getElementById("pesan").value.trim();


            if (!nama || !email || !pesan) {

                status.textContent =
                    "Mohon lengkapi semua data.";

                status.className =
                    "status error";

                return;
            }


            const dataBaru = {

                nama: nama,

                email: email,

                pesan: pesan,

                waktu:
                    new Date().toLocaleString(
                        "id-ID",
                        {
                            dateStyle: "medium",
                            timeStyle: "short"
                        }
                    )
            };


            messages.unshift(dataBaru);


            localStorage.setItem(
                "guestbookMessages",
                JSON.stringify(messages)
            );


            status.textContent =
                "Pesan berhasil dikirim! 😊";

            status.className =
                "status success";


            form.reset();


            tampilkanPesan();

        }
    );


    /* Tampilkan pesan saat halaman dibuka */
    tampilkanPesan();

});
