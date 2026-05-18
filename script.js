// Elements
const envelopeContainer = document.getElementById("envelope-container");
const videoContainer = document.getElementById("video-container");
const letterContainer = document.getElementById("letter-container");
const video = document.getElementById("love-video");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// === STEP 1: Envelope bosilganda video ekraniga o'tish ===
envelopeContainer.addEventListener("click", () => {
    envelopeContainer.style.display = "none";

    videoContainer.style.display = "flex";
    setTimeout(() => {
        document.querySelector(".video-window").classList.add("open");
    }, 50);

    video.play().catch(() => {
        videoContainer.addEventListener("click", () => video.play(), { once: true });
    });
});

// === STEP 2: Video tugagandan so'ng yes/no sahifasiga o'tish ===
video.addEventListener("ended", () => {
    videoContainer.style.display = "none";
    letterContainer.style.display = "flex";
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// === NO tugmasi — ekrandan chiqmaydigan qochish logikasi ===
function moveNoBtn() {
    const letterWindow = document.querySelector(".letter-window");
    const noBtnRect = noBtn.getBoundingClientRect();
    const windowRect = letterWindow.getBoundingClientRect();

    const currentTransform = noBtn.style.transform;
    const match = currentTransform.match(/translate\((-?\d+\.?\d*)px,\s*(-?\d+\.?\d*)px\)/);
    let currentX = match ? parseFloat(match[1]) : 0;
    let currentY = match ? parseFloat(match[2]) : 0;

    const angle = Math.random() * Math.PI * 2;
    const maxMoveX = Math.min(140, windowRect.width * 0.30);
    const maxMoveY = Math.min(100, windowRect.height * 0.25);
    let newX = currentX + Math.cos(angle) * maxMoveX;
    let newY = currentY + Math.sin(angle) * maxMoveY;

    const halfW = noBtnRect.width / 2;
    const halfH = noBtnRect.height / 2;
    const minX = windowRect.left - noBtnRect.left + halfW;
    const maxX = windowRect.right - noBtnRect.right - halfW;
    const minY = windowRect.top - noBtnRect.top + halfH;
    const maxY = windowRect.bottom - noBtnRect.bottom - halfH;

    newX = Math.max(minX, Math.min(maxX, newX));
    newY = Math.max(minY, Math.min(maxY, newY));

    noBtn.style.transition = "transform 0.25s ease";
    noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
}

noBtn.addEventListener("mouseover", moveNoBtn);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoBtn();
}, { passive: false });

// === Telegram xabar yuborish ===
function sendTelegramMessage() {
    const token = "8450220554:AAEzUPo7yEqXUxL2RcuDc4w_6XvSVsxwqTM";
    const chatId = "1178814024";
    const text = "💌 U YES dedi! Valentine taklifying qabul qilindi! 🎉";

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: text })
    }).catch(() => {});
}

// === YES bosilganda final holat ===
yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";
    catImg.src = "cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";

    sendTelegramMessage();
});