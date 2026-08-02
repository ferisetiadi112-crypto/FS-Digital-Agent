// ===========================================
// FS DIGITAL AGENT
// Sprint 4.1A
// Personal Handshake
// Cloudflare Worker + OpenRouter
// ===========================================

// ================================
// CONFIG
// ================================

const API_URL =
"https://hidden-snowflake-624c.ferisetiadi112.workers.dev";

// ================================
// DOM
// ================================

const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chat = document.getElementById("chatArea");

// ================================
// SESSION
// ================================

let verified =
sessionStorage.getItem("boss_verified") === "true";

let mood =
sessionStorage.getItem("boss_mood") || "";

// ================================
// START
// ================================

window.onload = function () {

    if (!verified) {

        addMessage(
            "Siap Boss.<br><br>Ada yang bisa dibantu?",
            "ai"
        );

    } else {

        addMessage(
            "Selamat datang kembali Boss.<br><br>Apa yang akan kita kerjakan hari ini?",
            "ai"
        );

    }

};

// ================================
// EVENT
// ================================

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// ================================
// SEND MESSAGE
// ================================

async function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    // =====================================
    // PERSONAL HANDSHAKE
    // =====================================

    if (!verified) {

        addMessage(text, "user");

        const answer =
            text.toLowerCase();

        // GOOD
        if (
            answer === "persib" ||
            answer === "persib bandung"
        ) {

            verified = true;
            mood = "GOOD";

            sessionStorage.setItem(
                "boss_verified",
                "true"
            );

            sessionStorage.setItem(
                "boss_mood",
                mood
            );

            addMessage(
                "Baik Boss.<br><br>" +
                "Mood hari ini saya catat sebagai <b>GOOD</b>.<br><br>" +
                "Saya siap bekerja.<br><br>" +
                "Apa yang akan kita selesaikan hari ini?",
                "ai"
            );

            input.value = "";

            return;

        }

        // NORMAL
        if (
            answer === "arema" ||
            answer === "arema fc"
        ) {

            verified = true;
            mood = "NORMAL";

            sessionStorage.setItem(
                "boss_verified",
                "true"
            );

            sessionStorage.setItem(
                "boss_mood",
                mood
            );

            addMessage(
                "Baik Boss.<br><br>" +
                "Mood hari ini saya catat sebagai <b>NORMAL</b>.<br><br>" +
                "Saya siap bekerja.<br><br>" +
                "Apa agenda kita hari ini?",
                "ai"
            );

            input.value = "";

            return;

        }

        // LOW
        if (
            answer === "persija" ||
            answer === "persija jakarta"
        ) {

            verified = true;
            mood = "LOW";

            sessionStorage.setItem(
                "boss_verified",
                "true"
            );

            sessionStorage.setItem(
                "boss_mood",
                mood
            );

            addMessage(
                "Baik Boss.<br><br>" +
                "Mood hari ini saya catat sebagai <b>LOW</b>.<br><br>" +
                "Mari kita selesaikan pekerjaan satu per satu.",
                "ai"
            );

            input.value = "";

            return;

        }

        addMessage(

            "Maaf Boss.<br><br>" +
            "Personal Handshake belum dilakukan.<br><br>" +
            "Silakan jawab salah satu berikut:<br><br>" +
            "• Persib Bandung<br>" +
            "• Arema FC<br>" +
            "• Persija Jakarta",

            "ai"

        );

        input.value = "";

        return;

    }

    // =====================================
    // CHAT NORMAL
    // =====================================

    addMessage(text, "user");

    input.value = "";

    showTyping();

    try {

        const reply =
            await askAI(text);

        removeTyping();

        addMessage(reply, "ai");

    }

    catch (err) {

        removeTyping();

        addMessage(

            "❌ Tidak dapat terhubung ke AI.<br><br>" +
            err.message,

            "ai"

        );

    }

}

// ================================
// MESSAGE
// ================================

function addMessage(text, sender) {

    const message = document.createElement("div");

    message.className = "message " + sender;

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    bubble.innerHTML = text;

    message.appendChild(bubble);

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

}

// ================================
// TYPING
// ================================

function showTyping() {

    const message = document.createElement("div");

    message.id = "typing";

    message.className = "message ai";

    const bubble = document.createElement("div");

    bubble.className = "bubble";

    bubble.innerHTML = "Sedang mengetik...";

    message.appendChild(bubble);

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;

}

function removeTyping() {

    const typing =
        document.getElementById("typing");

    if (typing) {

        typing.remove();

    }

}

// ================================
// OPENROUTER
// ================================

async function askAI(prompt) {

    const response =
        await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json"

            },

            body: JSON.stringify({

                message: prompt

            })

        });

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(

            data?.response?.error?.message ||

            data?.error ||

            "HTTP " + response.status

        );

    }

    return data.reply;

}
