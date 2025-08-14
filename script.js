let userScore = 0;          // To track the User's Score.
let compScore = 0;          // To track the Computer's Score.

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// 🔊 SOUND FUNCTIONS
function playWinningBeep() {
    let ctx = new (window.AudioContext || window.webkitAudioContext)();

    // First beep
    let osc1 = ctx.createOscillator();
    let gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.value = 880; // A5
    gain1.gain.value = 0.2;
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.12);

    // Second beep slightly after
    let osc2 = ctx.createOscillator();
    let gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.value = 1320; // E6
    gain2.gain.value = 0.16;
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.13);
    osc2.stop(ctx.currentTime + 0.25);
}

function playLosingBeep() {
    let ctx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = ctx.createOscillator();
    let gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(330, ctx.currentTime); // E4
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.4); // Slide down
    gain.gain.value = 0.20;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
}

function playDrawBeep() {
    let ctx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = ctx.createOscillator();
    let gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 440; // Middle A
    gain.gain.value = 0.15;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
}

// 📌 COMPUTER CHOICE
const generateCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

// 📌 DRAW CASE
const drawGame = () => {
    msg.style.backgroundColor = "#081b31";
    msg.innerText = "Game was Draw. Play again...";
    playDrawBeep(); // 🎵 Play draw sound
};

// 📌 WIN/LOSE CASE
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.style.backgroundColor = "green";
        msg.innerText = `Congratulations! You win! Your ${userChoice} beats ${compChoice}`;
        playWinningBeep(); // 🎵 Play win sound
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.style.backgroundColor = "#f30e0e";
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
        playLosingBeep(); // 🎵 Play lose sound
    }
};

// 📌 MAIN GAME LOGIC
const playGame = (userChoice) => {
    const compChoice = generateCompChoice();
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

// 📌 EVENT LISTENERS
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
