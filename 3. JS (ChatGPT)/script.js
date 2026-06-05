const chatList = document.getElementById("chatList");
const searchInput = document.getElementById("searchInput");
const newChatBtn = document.getElementById("newChatBtn");
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatArea = document.getElementById("chatArea");

let chats = [];
let currentChatId = null;

/* ------------------ STORAGE ------------------ */

function saveChats() {
    localStorage.setItem("gptChats", JSON.stringify(chats));
}

function loadChats() {
    const saved = localStorage.getItem("gptChats");

    if (saved) {
        chats = JSON.parse(saved);
    } else {
        createChat("New Chat");
    }
}

/* ------------------ CHAT CREATE ------------------ */

function createChat(title = "New Chat") {

    const chat = {
        id: Date.now(),
        title: title,
        messages: []
    };

    chats.unshift(chat);

    currentChatId = chat.id;

    saveChats();

    renderChats();

    openChat(chat.id);
}

/* ------------------ RENDER SIDEBAR ------------------ */

function renderChats() {   

    chatList.innerHTML = "";  //remove all existing chats from sidebar before rendering again to avoid duplicates

    chats.forEach(chat => {

        const div = document.createElement("div");

        div.className = "chat-item";  //It is equivalent to <div class="chat-item">  

        if (chat.id === currentChatId) {
            div.classList.add("active");   // THIS IS TO Highlight active chat
        }

        div.textContent = chat.title;

        /* OPEN CHAT */

        div.addEventListener("click", () => {
            openChat(chat.id);
        });

        /* RENAME CHAT */

        div.addEventListener("dblclick", () => {

            const name = prompt(
                "Rename Chat",
                chat.title
            );

            if (!name) return;

            chat.title = name;

            saveChats();

            renderChats();

        });

        /* DELETE CHAT */

        div.addEventListener("contextmenu", e => { //contextmenu event is triggered when user right clicks on the chat item

            e.preventDefault();

            const remove = confirm(
                "Delete this chat?"
            );

            if (!remove) return;

            chats = chats.filter(
                c => c.id !== chat.id
            );

            if (chats.length === 0) {
                createChat();
                return;
            }

            currentChatId = chats[0].id;

            saveChats();

            renderChats();

            openChat(currentChatId);

        });

        chatList.appendChild(div);

    });
}

/* ------------------ OPEN CHAT ------------------ */

function openChat(id) {

    currentChatId = id;

    const chat = chats.find(
        c => c.id === id
    );

    chatArea.innerHTML = "";

    chat.messages.forEach(msg => {

        const div = document.createElement("div");

        div.className =
            `message ${msg.role}`;

        div.textContent = msg.text;

        chatArea.appendChild(div);

    });

    renderChats();

    scrollBottom();
}

/* ------------------ ADD MESSAGE ------------------ */

function addMessage(role, text) {

    const chat = chats.find(
        c => c.id === currentChatId
    );

    chat.messages.push({
        role,
        text
    });

    saveChats();

    openChat(currentChatId);
}

/* ------------------ SEND ------------------ */

function sendMessage() {

    const text =
        messageInput.value.trim();

    if (!text) return;

    addMessage("user", text);

    messageInput.value = "";

    setTimeout(() => {

        const replies = [

            "Interesting 🤔",

            "Tell me more.",

            "I understand.",

            "That's a good question.",

            "Can you explain further?",

            "Nice idea 🚀",

            "I can help with that."

        ];

        const randomReply =
            replies[
            Math.floor(
                Math.random() *
                replies.length
            )
            ];

        addMessage(
            "bot",
            randomReply
        );

    }, 700);

}

/* ------------------ SEARCH ------------------ */

searchInput.addEventListener(
    "input",
    () => {

        const value =
            searchInput.value
                .toLowerCase();

        document
            .querySelectorAll(".chat-item")
            .forEach(item => {

                item.style.display =
                    item.textContent
                        .toLowerCase()
                        .includes(value)
                        ? "block"
                        : "none";

            });

    }
);

/* ------------------ BUTTONS ------------------ */

newChatBtn.addEventListener(
    "click",
    () => {
        createChat(
            `Chat ${chats.length + 1}`
        );
    }
);

sendBtn.addEventListener(
    "click",
    sendMessage
);

messageInput.addEventListener(
    "keydown",
    e => {

        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            sendMessage();
        }

    }
);

/* ------------------ AUTO HEIGHT ------------------ */

messageInput.addEventListener(
    "input",
    () => {

        messageInput.style.height =
            "auto";

        messageInput.style.height =
            messageInput.scrollHeight +
            "px";

    }
);

/* ------------------ SCROLL ------------------ */

function scrollBottom() {

    chatArea.scrollTop =
        chatArea.scrollHeight;

}

/* ------------------ START ------------------ */

loadChats();

renderChats();

if (chats.length > 0) {
    openChat(chats[0].id);
}