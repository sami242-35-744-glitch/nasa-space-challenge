// Game Database State
const gameData = [
    {
        title: "THE SUN",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_033f7b4085_be211867cbd4a927.png",
        correct: "TEMPERATURE",
        question: "Core temperature reaches 15 Million °C. What is its dominant feature?"
    },
    {
        title: "MERCURY",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_313a73d4c2_033f7fcb918b6977.png",
        correct: "DISTANCE",
        question: "It is closest to the Sun! What is its defining orbital stat?"
    },
    {
        title: "SATURN",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_033f7b4085_be211867cbd4a927.png",
        correct: "MASS",
        question: "95 times Earth's mass. Guess its standout property!"
    }
];

let currentIndex = 0;
let score = 100;

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
    generateStarfield();
    checkLoginSession();
    updateClock();
    setInterval(updateClock, 1000);
});

// Starfield Generator
function generateStarfield() {
    const starfield = document.getElementById('starfield');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starfield.appendChild(star);
    }
}

// Mandatory Login Gateway Logic
function checkLoginSession() {
    const user = localStorage.getItem("space_user");
    const modal = document.getElementById("login-modal");
    const navBadge = document.getElementById("user-profile-badge");
    const navName = document.getElementById("nav-username");

    if (user) {
        modal.classList.add("hidden");
        document.body.classList.remove("locked");
        navBadge.classList.remove("hidden");
        navBadge.classList.add("flex");
        navName.innerText = user;
    } else {
        modal.classList.remove("hidden");
        document.body.classList.add("locked");
        navBadge.classList.add("hidden");
    }
}

function handleLogin(event) {
    event.preventDefault();
    const nameInput = document.getElementById("login-name").value.trim();
    if (nameInput) {
        localStorage.setItem("space_user", nameInput);
        checkLoginSession();
    }
}

function handleLogout() {
    localStorage.removeItem("space_user");
    checkLoginSession();
}

// Game View Switcher
function showScreen(screenId) {
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.add('hidden');
        screen.classList.remove('flex');
    });

    const target = document.getElementById(`screen-${screenId}`);
    target.classList.remove('hidden');
    target.classList.add('flex');
}

// Interactive Planet Click in Sky Screen
function guessObject(name) {
    alert(`✨ Observed ${name}! Moving to parameter quiz stage...`);
    showScreen('guess');
}

// Guess Game Logic
function makeGuess(option) {
    const currentObj = gameData[currentIndex];
    if (option === currentObj.correct) {
        score += 50;
        alert(`🎉 Correct! ${currentObj.title}'s defining attribute is ${option}. +50 Points!`);
    } else {
        score = Math.max(0, score - 20);
        alert(`❌ Incorrect! Try again or proceed to next object.`);
    }
    document.getElementById("score-display").innerText = `SCORE: ${score}`;
}

function nextQuestion() {
    currentIndex = (currentIndex + 1) % gameData.length;
    const obj = gameData[currentIndex];
    document.getElementById("target-img").src = obj.image;
    document.getElementById("target-title").innerText = obj.title;
    document.getElementById("trivia-question").innerText = obj.question;
}

// Sky Date/Time Tracker
function updateClock() {
    const skyDate = document.getElementById("sky-date");
    if (skyDate) {
        const now = new Date();
        skyDate.innerText = now.toLocaleString('en-US', {
            weekday: 'short',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }
}

// Scroll Helper
function scrollToGame() {
    document.getElementById("game-section").scrollIntoView({ behavior: 'smooth' });
}
