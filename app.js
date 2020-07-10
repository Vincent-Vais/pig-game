/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
let scores, roundScore, activePlayer, gamePlaying, currentStreak, maxScore, name1, name2;

document.querySelectorAll("form input").forEach(input => {
    input.addEventListener("click", (e) => {
        console.log(e.target.id);
        document.querySelector(`#${e.target.id} + div i`).style.display = "none";
    });
});

document.querySelector("#start-game").addEventListener("click", readInput);

document.querySelector(".btn-roll").addEventListener("click", function(){
    if(gamePlaying){
        let dice = Math.floor(Math.random() * 6) + 1;
        currentStreak += dice === 6 ? 1 : 0;
        if(currentStreak > 0){
            document.getElementById(`player-${activePlayer}-six-${currentStreak}`).style.display = "inline";
        }
        let diceDOM = document.querySelector(".dice");
        diceDOM.style.display= "block";
        diceDOM.src = `dice-${dice}.png`;
        if(currentStreak > 1){
            gamePlaying = false;
            scores[activePlayer] = 0;
            document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
            increaseSize(diceDOM, 200, nextPlayer);
        }else if(dice > 1){
            previousDice = dice;
            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        }else{
            gamePlaying = false;
            increaseSize(diceDOM, 200, nextPlayer);
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;

        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        if(scores[activePlayer] >= maxScore){
            document.querySelector(`#name-${activePlayer}`).textContent = "WINNER!";
            document.querySelector(".dice").style.display= "none";
            document.querySelector(`.player-${activePlayer}-panel`).classList.add("winner");
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");
            gamePlaying = false;
        }else{
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer(){
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentStreak = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display= "none";

    document.getElementById("player-0-six-1").style.display = "none";
    document.getElementById("player-0-six-2").style.display = "none";
    document.getElementById("player-1-six-1").style.display = "none";
    document.getElementById("player-1-six-2").style.display = "none";
}

function increaseSize(element, size, next){
    let originalWidth = element.offsetWidth;
    let originalHeight = element.offsetHeight;
    let currentWidth = originalWidth + 10;
    let currentHeight = originalHeight + 10;
    let timer = setInterval(() => {
        if(currentWidth > size){
            element.style.width = `${originalWidth}px`;
            element.style.height = `${originalHeight}px`;
            next();
            clearInterval(timer);
        }else{
            element.style.width = `${currentWidth}px`;
            element.style.height = `${currentHeight}px`;
            currentWidth += 10;
            currentHeight += 10;
        }
    }, 100);

}

function readInput(){
    maxScore = document.querySelector("#max-points").value ? Number(document.querySelector("#max-points").value) : 100;
    name1 = document.querySelector("#player-name1").value ? document.querySelector("#player-name1").value : "Player1";
    name2 = document.querySelector("#player-name2").value ? document.querySelector("#player-name2").value : "Player2";
    init();
}

function init(){
    scores = [0, 0];
    roundScore = 0; 
    activePlayer = 0;
    currentStreak = 0;
    gamePlaying = true;

    document.querySelectorAll(".hidden").forEach(elem => {
        console.log(elem);
        elem.classList.remove("hidden");
    });

    document.querySelector("form").classList.add("hidden");
    document.querySelector("#start-game").classList.add("hidden");

    document.querySelector(".dice").style.display= "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector("#name-0").textContent = name1;
    document.querySelector("#name-1").textContent = name2;

    document.querySelector(`.player-0-panel`).classList.remove("winner");
    document.querySelector(`.player-1-panel`).classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    document.getElementById("player-0-six-1").style.display = "none";
    document.getElementById("player-0-six-2").style.display = "none";
    document.getElementById("player-1-six-1").style.display = "none";
    document.getElementById("player-1-six-2").style.display = "none";

    document.querySelector(".player-0-panel").classList.add("active");
}