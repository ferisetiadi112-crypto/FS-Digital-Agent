// ===========================================
// FS DIGITAL AGENT
// Sprint 2.1
// Interactive Chat Engine
// ===========================================

const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chat = document.getElementById("chatArea");

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    showTyping();

    setTimeout(() => {

        removeTyping();

        const reply = aiEngine(text);

        addMessage(reply, "ai");

    }, 1000);

}

function addMessage(text, sender) {

    const wrapper = document.createElement("div");

    wrapper.className = "message";

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    if (sender === "user") {

        bubble.innerHTML = `
            <b>👤 Anda</b><br><br>
            ${text}
        `;

        bubble.style.background = "#2563eb";

    } else {

        bubble.innerHTML = `
            <b>🤖 Feris</b><br><br>
            ${text}
        `;

    }

    wrapper.appendChild(bubble);

    chat.appendChild(wrapper);

    chat.scrollTop = chat.scrollHeight;

}

function showTyping() {

    const typing = document.createElement("div");

    typing.id = "typing";

    typing.className = "message";

    typing.innerHTML = `
        <div class="bubble">
            🤖 <b>Feris</b><br><br>
            Sedang mengetik...
        </div>
    `;

    chat.appendChild(typing);

    chat.scrollTop = chat.scrollHeight;

}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) typing.remove();

}

function aiEngine(message) {

    const text = message.toLowerCase();

    if (text.includes("halo")) {

        return "Halo Prof Feri 👋<br><br>Saya siap membantu pekerjaan Anda hari ini.";

    }

    if (text.includes("siapa")) {

        return "Saya adalah <b>Feris</b>, FS DIGITAL AGENT versi 0.1.";

    }

    if (text.includes("simpati")) {

        return "SIMPATI-WANI adalah proyek utama yang sedang kita kembangkan bersama.";

    }

    if (text.includes("pekerja sosial")) {

        return "Saya siap membantu seluruh pekerjaan sosial Prof mulai dari laporan, asesmen hingga pengembangan aplikasi.";

    }

    if (text.includes("terima kasih")) {

        return "Sama-sama Prof 😊";

    }

    return `
        Perintah diterima.<br><br>
        Saat ini saya masih menggunakan AI lokal.<br><br>
        Gemini AI akan diaktifkan pada Sprint berikutnya.
    `;

}
