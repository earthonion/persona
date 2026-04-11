let current = null;

async function render() {
  current = await generatePersona();
  document.getElementById("firstName").textContent = current.firstName;
  document.getElementById("lastName").textContent = current.lastName;
  document.getElementById("gender").textContent = current.gender;
  document.getElementById("username").textContent = current.username;
  document.getElementById("email").textContent = current.email;
  document.getElementById("password").textContent = current.password;
}

function setStatus(msg) {
  const el = document.getElementById("status");
  el.textContent = msg;
  setTimeout(() => { if (el.textContent === msg) el.textContent = ""; }, 2000);
}

document.getElementById("regen").addEventListener("click", render);

document.getElementById("copy").addEventListener("click", async () => {
  if (!current) return;
  const text =
    `First name: ${current.firstName}\n` +
    `Last name:  ${current.lastName}\n` +
    `Gender:     ${current.gender}\n` +
    `Username:   ${current.username}\n` +
    `Email:      ${current.email}\n` +
    `Password:   ${current.password}`;
  await navigator.clipboard.writeText(text);
  setStatus("Copied.");
});

document.getElementById("fill").addEventListener("click", async () => {
  if (!current) return;
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;
  try {
    const results = await browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
    await browser.tabs.sendMessage(tab.id, { type: "fill", persona: current });
    setStatus("Filled.");
  } catch (e) {
    setStatus("Fill failed: " + e.message);
  }
});

render();
