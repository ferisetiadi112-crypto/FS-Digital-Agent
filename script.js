const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chat = document.getElementById("chatArea");

button.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(event){

    if(event.key==="Enter"){

        sendMessage();

    }

});

function sendMessage(){

    const text=input.value.trim();

    if(text==="") return;

    addUserMessage(text);

    input.value="";

    setTimeout(function(){

        addAIMessage();

    },700);

}

function addUserMessage(text){

    const div=document.createElement("div");

    div.className="message";

    div.innerHTML=`

    <div class="bubble">

    ${text}

    </div>

    `;

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

}

function addAIMessage(){

    const div=document.createElement("div");

    div.className="message ai";

    div.innerHTML=`

    <div class="bubble">

    Terima kasih Prof.

    Saya menerima perintah Anda.

    Saat ini saya masih menggunakan mode

    <b>FS DIGITAL AGENT v0.1</b>.

    Pada versi berikutnya saya akan mulai menggunakan

    Gemini AI sebagai otak utama.

    </div>

    `;

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

}
