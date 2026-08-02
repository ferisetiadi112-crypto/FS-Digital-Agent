// ===========================================
// FS DIGITAL AGENT
// Sprint 4.0
// Cloudflare Worker + OpenRouter
// ===========================================

// URL Cloudflare Worker
const API_URL =
"https://hidden-snowflake-624c.ferisetiadi112.workers.dev";

const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chat = document.getElementById("chatArea");

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    showTyping();

    try {

        const reply = await askAI(text);

        removeTyping();

        addMessage(reply, "ai");

    } catch (err) {

        removeTyping();

        addMessage(
            "❌ Tidak dapat terhubung ke AI.<br><br>" +
            err.message,
            "ai"
        );

    }

}

function addMessage(text, sender) {

    const div = document.createElement("div");

    div.className = "message " + sender;

    div.innerHTML = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}

function showTyping() {

    const div = document.createElement("div");

    div.id = "typing";

    div.className = "message ai";

    div.innerHTML = "Sedang mengetik...";

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) typing.remove();

}

async function askAI(prompt) {

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: prompt
        })

    });

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data?.response?.error?.message ||
            data?.error ||
            ("HTTP " + response.status)
        );

    }

    return data.reply;

}
