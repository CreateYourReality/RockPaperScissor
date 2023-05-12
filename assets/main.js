const leftWildcard = document.querySelector(".cardLeft");
const rightWildcard = document.querySelector(".cardRight");
const playerPointsOutput = document.querySelector(".pointsPlayer");
const computerPointsOutput = document.querySelector(".pointsComputer");
const roundsOutput = document.querySelector(".mid-content p")

const startBtn = document.getElementById("startBtn");
const playerBoard = document.querySelector(".player-board");
const midField = document.querySelector(".mid");

//const videoContainer = '<div class="video-container"></div>';

const rockCard = '<img src="./assets/img/rock.png" alt="rock"><p>ROCK</p>';
const paperCard = '<img src="./assets/img/paper.png" alt="paper"><p>PAPER</p>';
const scissorCard = '<img src="./assets/img/scissors.png" alt="scissor"><p>SCISSOR</p>';
const echseCard = '<img src="./assets/img/lizard.png" alt="lizard"><p>LIZARD</p>';
const spockCard = '<img src="./assets/img/spock.png" alt="spock"><p>SPOCK</p>';

const compWin = 'url("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjE5MGVlMjljYzYxYzhkMjQ3ZWIwZjMyNzA3ZjE2N2I1ZDczNDRmOCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/f79OYWh5uwIfK/giphy.gif")';



let pointsPlayer = 0;
let pointsComputer = 0;

let cardDeck = [];
const playerCards = [];
const computerCards = [];

let round = 0;
let maxRound = 5;

const SetNewCardDeck = () => {
    cardDeck = [
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5,
        1,2,3,4,5 //akt. 60 cards - max. 15 Runden
    ];
}

const changeRadio = (x) => {
    maxRound = x;
    VisualizeRounds();
    StartGame();
}

//The Fisher-Yates algorith
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
}

const VisualizeRounds = () => {
    roundsOutput.innerHTML = round + " / " + maxRound;
}

const VisualizePoints = () => {
    console.log("Points player "+pointsPlayer);
    console.log("Points computer "+pointsComputer);
    playerPointsOutput.innerHTML = pointsPlayer;
    computerPointsOutput.innerHTML = pointsComputer;
}

const CardNumberToText = (num) =>{

    switch(num){
        case 1 : cardText = "Rock";break;
        case 2 : cardText = "Paper";break;
        case 3 : cardText = "Scissor";break;
        case 4 : cardText = "Lizard";break;
        case 5 : cardText = "Spock";break;
    }
    return cardText;
}

const VisualizeCards = () =>{
    let cardLeft = "";
    let cardRight = "";

    switch(playerCards[0]){
        case 1: cardLeft = rockCard;break;
        case 2: cardLeft = paperCard;break;
        case 3: cardLeft = scissorCard;break;
        case 4: cardLeft = echseCard;break;
        case 5: cardLeft = spockCard;break;
    }

    switch(playerCards[1]){
        case 1: cardRight = rockCard;break;
        case 2: cardRight = paperCard;break;
        case 3: cardRight = scissorCard;break;
        case 4: cardRight = echseCard;break;
        case 5: cardRight = spockCard;break;
    }
    
    leftWildcard.innerHTML = cardLeft;
    rightWildcard.innerHTML = cardRight;
}

const GameLogic = (a,b) => {
    //a = player / b = computer

    // rockCard 1
    // paperCard 2
    // scissorCard 3
    // echseCard 4
    // spockCard 5

    if(a == 1){
        if(b == 1){pointsComputer++;pointsPlayer++;return;}
        else if(b == 2){pointsComputer++;return;}
        else if(b == 3){pointsPlayer++;return;}
        else if(b == 4){pointsPlayer++;return;}
        else{pointsComputer++;return;}
    } else if(a == 2){
        if(b==1){ pointsPlayer++;return;}
        else if(b==2){pointsComputer++;pointsPlayer++;return;}
        else if(b==3){pointsComputer++;return;}
        else if(b==4) {pointsComputer++;return;}
        else{pointsPlayer++;return;}
    } else if(a == 3){
        if(b==1){pointsComputer++;return;}
        else if(b==2){pointsPlayer++;return;}
        else if(b==3){pointsComputer++;pointsPlayer++;return;}
        else if(b==4){pointsPlayer++;return;}
        else{pointsComputer++;return;}
    }else if(a == 4){
        if(b==1){pointsComputer++ ;return;}
        else if(b==2){pointsPlayer++;return;}
        else if(b==3){pointsComputer++;return;}
        else if(b==4){pointsComputer++;pointsPlayer++;return;}
        else{pointsPlayer++;return;}
        }else{
        if(b==1){pointsPlayer++;return;}
        else if(b==2){pointsComputer++;return;}
        else if(b==3){pointsPlayer++;return;}
        else if(b==4){pointsComputer;return;}
        else{pointsComputer++;pointsPlayer++;return;}
    }
}


const GiveNewCards = () =>{
    playerCards.pop();
    playerCards.pop();
    computerCards.pop();
    computerCards.pop();

    playerCards.push(cardDeck.pop());
    computerCards.push(cardDeck.pop());
    playerCards.push(cardDeck.pop());
    computerCards.push(cardDeck.pop());
}  


const StartGame = () => {
    startBtn.remove();
    playerBoard.style.visibility = "visible";
    pointsPlayer = 0;
    pointsComputer = 0;
    round = 0;
    SetNewCardDeck();
    shuffleArray(cardDeck);
    shuffleArray(cardDeck); //shuffle 3 times
    shuffleArray(cardDeck);
    GiveNewCards();
    VisualizeCards();
    VisualizePoints();
    VisualizeRounds();
}


const ComputerCardChoice = () =>{
    //coin flip, flip1 === flip2 ist seite 1
    let flip1 = Math.floor(Math.random() * 2) +1;
    let flip2 = Math.floor(Math.random() * 2) +1;
    let computerChoice = 0;

    flip1 === flip2 ? computerChoice = 0 : computerChoice = 1; 
    return computerChoice; //0 = left Card, 1 = right Card
}


const VideoPopup = () => {
    let oldVideo = document.querySelector(".video-container");

    if(oldVideo != null)
        oldVideo.remove();

    let newVideo = document.createElement("div");
    newVideo.classList.add("video-container");
    midField.appendChild(newVideo);

    oldVideo = document.querySelector(".video-container");
    oldVideo.style.backgroundImage = compWin;
    oldVideo.classList.add("start-animation");

}

const MyTurn = (x) => {

    const computerChoice = computerCards[ComputerCardChoice()];
    const playerChoice = playerCards[x]; 

    console.log(computerChoice);
    console.log(playerChoice);

    GameLogic(playerChoice,computerChoice);
    console.log("Du hast "+(CardNumberToText(playerChoice))+" ausgewählt");
    console.log("Computer hat die Karte "+CardNumberToText(computerChoice)+" gewählt");

  //  videoContainer.classList.remove("start-animation");
    
    VideoPopup();
    VisualizePoints();
    round++;
    VisualizeRounds();
    GiveNewCards();
    VisualizeCards(playerCards[0],playerCards[1]);
//  console.log("cards left im Deck: "+cardDeck);
}


// modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("infoBtn");
var span = document.getElementById("close");

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



//StartGame();
console.log("Start Game CardDeck: "+cardDeck);
console.log("aktuelle playerCards: "+ playerCards);
console.log("aktuelle computerCards: "+computerCards);