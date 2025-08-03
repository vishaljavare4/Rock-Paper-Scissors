let userScore = 0;          // To track the User's Score.
let compScore = 0;          // To track the Computer's Score.

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const generateCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.style.backgroundColor = "#081b31"
    msg.innerText = "Game was Draw. Play again..."
};

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.style.backgroundColor = "green";
        msg.innerText = `Congratulations! You win! Your ${userChoice} beats ${compChoice}`;
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.style.backgroundColor = "#f30e0eff"
        msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    }
};

const playGame = (userChoice) => {
    // Generate computer choice.
    const compChoice = generateCompChoice();

    if(userChoice === compChoice){
        drawGame();
    } else {
        let userWin = true;
        if(userChoice === "rock") {
            // scissors, paper
            userWin = compChoice === "paper" ? false : true;
        } else if(userChoice === "paper") {
            // rock, scissors
            userWin = compChoice === "scissors" ? false : true;
        } else {
            //rock, paper
            userWin = compChoice === "rock" ? false : true; 
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
        // console.log(choice);
        choice.addEventListener("click", () => {
            const userChoice = choice.getAttribute("id");
            // console.log(`${userChoice} was clicked!`);
            playGame(userChoice);
        })
});
