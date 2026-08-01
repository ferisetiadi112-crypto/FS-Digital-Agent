// ===========================================
// FS DIGITAL AGENT
// Sprint 3.1 - Gemini Connected
// ===========================================

const GEMINI_API_KEY = "AQ.GANTI_DENGAN_API_KEY_ANDA";

const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chat = document.getElementById("chatArea");

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(e){
    if(e.key==="Enter"){
        sendMessage();
    }
});

async function sendMessage(){

    const text=input.value.trim();

    if(text==="") return;

    addMessage(text,"user");

    input.value="";

    showTyping();

    try{

        const reply=await askGemini(text);

        removeTyping();

        addMessage(reply,"ai");

    }catch(err){

        removeTyping();

        addMessage(
            "❌ Tidak dapat terhubung ke Gemini API.<br><br>"+err.message,
            "ai"
        );

    }

}

function addMessage(text,sender){

    const div=document.createElement("div");

    div.className="message "+sender;

    div.innerHTML=text;

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

}

function showTyping(){

    const div=document.createElement("div");

    div.id="typing";

    div.className="message ai";

    div.innerHTML="Sedang mengetik...";

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

}

function removeTyping(){

    const typing=document.getElementById("typing");

    if(typing) typing.remove();

}

async function askGemini(prompt){

    const response=await fetch(GEMINI_URL,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            contents:[

                {

                    parts:[

                        {
                            text:prompt
                        }

                    ]

                }

            ]

        })

    });

    if(!response.ok){

        throw new Error("HTTP "+response.status);

    }

    const data=await response.json();

    return data.candidates[0].content.parts[0].text;

}
