const form = document.getElementById("message-form");
const nameInput = document.getElementById("name-input");
const messageInput = document.getElementById("message-input");

const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");

const messageList = document.getElementById("message-list");
const resultCount = document.getElementById("result-count");

// DATA
let messages = [];
let messageMap = new Map();

// INITIAL DATA
messages = [
  {
    id: 1,
    name: "Admin",
    text: "Welcome to the message board!",
    likes: 3,
    replies: []
  },
  {
    id: 2,
    name: "Irfan",
    text: "Feel free to post your thoughts.",
    likes: 1,
    replies: [
      {
        name: "Guest",
        text: "Thanks!"
      }
    ]
  }
];

// map fill
messages.forEach(m => messageMap.set(m.id, m));

/* ---------------- RENDER ---------------- */
function show() {
  let data = [...messages];

  const keyword = searchInput.value.toLowerCase();

  data = data.filter(
    m =>
      m.text.toLowerCase().includes(keyword) ||
      m.name.toLowerCase().includes(keyword)
  );

  if (sortSelect.value === "newest") {
    data.reverse();
  }

  if (sortSelect.value === "name") {
    data.sort((a, b) => a.name.localeCompare(b.name));
  }

  resultCount.textContent = `Showing ${data.length} messages`;

  messageList.innerHTML = "";

  data.forEach(m => {
    const repliesHTML = m.replies.map(r => `
      <div class="reply">
        <b>${r.name}</b><br>
        ${r.text}
      </div>
    `).join("");

    messageList.innerHTML += `
      <div class="message-card">

        <h4>${m.name}</h4>
        <p>${m.text}</p>

        <button id="like-btn-${m.id}" onclick="likePost(${m.id})">
          👍 ${m.likes}
        </button>

        <div class="reply-box">
          <input id="reply-name-${m.id}" placeholder="Your name">
          <input id="reply-${m.id}" placeholder="Write a reply...">
          <button onclick="addReply(${m.id})">Reply</button>
        </div>

        <div id="replies-${m.id}" class="replies">
          ${repliesHTML}
        </div>

      </div>
    `;
  });
}

/* ---------------- ADD MESSAGE ---------------- */
form.onsubmit = function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const text = messageInput.value.trim();

  if (!name || !text) return;

  const msg = {
    id: Date.now(),
    name,
    text,
    likes: 0,
    replies: []
  };

  messages.push(msg);
  messageMap.set(msg.id, msg);

  nameInput.value = "";
  messageInput.value = "";

  show();
};

/* ---------------- LIKE (OPTIMIZED) ---------------- */
function likePost(id) {
  const post = messageMap.get(id);
  if (!post) return;

  post.likes++;

  updateLikeUI(id, post.likes);
}

function updateLikeUI(id, likes) {
  const btn = document.getElementById(`like-btn-${id}`);
  if (btn) {
    btn.innerHTML = `👍 ${likes}`;
  }
}

/* ---------------- REPLY (OPTIMIZED) ---------------- */
function addReply(id) {
  const nameEl = document.getElementById(`reply-name-${id}`);
  const textEl = document.getElementById(`reply-${id}`);

  const replyName = nameEl.value.trim();
  const replyText = textEl.value.trim();

  if (!replyName || !replyText) return;

  const post = messageMap.get(id);
  if (!post) return;

  post.replies.push({
    name: replyName,
    text: replyText
  });

  nameEl.value = "";
  textEl.value = "";

  updateReplyUI(id, post.replies);
}

function updateReplyUI(id, replies) {
  const container = document.getElementById(`replies-${id}`);
  if (!container) return;

  container.innerHTML = replies.map(r => `
    <div class="reply">
      <b>${r.name}</b><br>
      ${r.text}
    </div>
  `).join("");
}

/* ---------------- EVENTS ---------------- */
searchInput.oninput = show;
sortSelect.onchange = show;

show();