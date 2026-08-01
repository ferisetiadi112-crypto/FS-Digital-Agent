// ===========================================
// FS DIGITAL AGENT
// Sprint 2.2B
// Minimal AI Chat Engine
// ===========================================

const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chat = document.getElementById("chatArea");

// Event
button.addEventListener("click", sendMessage);

input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        e.preventDefault();

        sendMessage();

    }

});

// =========================
// Send Message
// =========================

function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    input.focus();

    showTyping();

    setTimeout(() => {

        removeTyping();

        const reply = aiEngine(text);

        addMessage(reply, "ai");

    }, 700);

}

// =========================
// Add Bubble
// =========================

function addMessage(text, sender) {

    const wrapper = document.createElement("div");

    wrapper.classList.add("message");

    wrapper.classList.add(sender);

    const bubble = document.createElement("div");

    bubble.classList.add("bubble");

    bubble.innerHTML = text;

    wrapper.appendChild(bubble);

    chat.appendChild(wrapper);

    chat.scrollTop = chat.scrollHeight;

}

// =========================
// Typing
// =========================

function showTyping() {

    const wrapper = document.createElement("div");

    wrapper.className = "message ai";

    wrapper.id = "typing";

    wrapper.innerHTML = `

        <div class="bubble">

            Sedang mengetik...

        </div>

    `;

    chat.appendChild(wrapper);

    chat.scrollTop = chat.scrollHeight;

}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) {

        typing.remove();

    }

}

// =========================
// Simple AI Engine
// =========================

function aiEngine(message) {

    const text = message.toLowerCase();

    if (text.includes("halo")) {

        return "Halo Prof Feri 👋";

    }

    if (text.includes("siapa")) {

        return "Saya adalah FS DIGITAL AGENT yang sedang dikembangkan untuk membantu seluruh pekerjaan Anda.";

    }

    if (text.includes("simpati")) {

        return "Saya siap membantu pengembangan SIMPATI-WANI mulai dari perencanaan, coding, database, hingga implementasi.";

    }

    if (text.includes("pekerja sosial")) {

        return "Saya siap membantu penyusunan asesmen, laporan, instrumen, penelitian, dan seluruh pekerjaan sebagai Pekerja Sosial.";

    }

    if (text.includes("penelitian")) {

        return "Saya siap membantu penyusunan proposal, tesis, artikel ilmiah, analisis data, dan publikasi.";

    }

    if (text.includes("aplikasi")) {

        return "Saya siap membantu membangun aplikasi berbasis Web, Google Apps Script, Firebase, maupun AI.";

    }

    if (text.includes("terima kasih")) {

        return "Sama-sama Prof 😊";

    }

    return "Perintah diterima. Pada Sprint berikutnya saya akan menggunakan Gemini AI sebagai otak utama sehingga dapat memberikan jawaban yang lebih cerdas.";

}
