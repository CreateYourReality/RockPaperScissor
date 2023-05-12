// ############################################### WILDCARDS #####################################################
const rockCard = '<img src="./assets/img/rock.png" alt="rock"><p>ROCK</p>';
const paperCard = '<img src="./assets/img/paper.png" alt="paper"><p>PAPER</p>';
const scissorCard = '<img src="./assets/img/scissors.png" alt="scissor"><p>SCISSOR</p>';
const echseCard = '<img src="./assets/img/lizard.png" alt="lizard"><p>LIZARD</p>';
const spockCard = '<img src="./assets/img/spock.png" alt="spock"><p>SPOCK</p>';

const rockCardNOP = '<img src="./assets/img/rock.png" alt="rock">';
const paperCardNOP = '<img src="./assets/img/paper.png" alt="paper">';
const scissorCardNOP = '<img src="./assets/img/scissors.png" alt="scissor">';
const echseCardNOP = '<img src="./assets/img/lizard.png" alt="lizard">';
const spockCardNOP = '<img src="./assets/img/spock.png" alt="spock">';

const compWinPoint = 'url("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjE5MGVlMjljYzYxYzhkMjQ3ZWIwZjMyNzA3ZjE2N2I1ZDczNDRmOCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/f79OYWh5uwIfK/giphy.gif")';
const compLoosePoint = 'url("https://media.tenor.com/h7v2mDyxD-8AAAAC/sheldon.gif")';
const compDrawPoint = 'url("https://media.tenor.com/0b2W8yEmnOgAAAAC/sheldon-cooper.gif")';
const compLooseGame = 'url("https://media.tenor.com/CSykDmrFeAIAAAAC/im-stressed-sheldon-cooper.gif")';
const compWinGame = 'url("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTA4ZGMxZTg4NWVlN2YxMDVhMmNiNTA5MzJhYjg2MmVmYTdjMDY4ZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3ohs83cvmud7ThYTzq/giphy.gif")';
const compDrawGame = 'url("https://media.tenor.com/SbpprT_et2cAAAAd/sheldon-cooper.gif")';
// ###############################################################################################################
//################################### QUERY SELECTOR #############################################################
const playerPointsOutput = document.querySelector(".pointsPlayer");
const computerPointsOutput = document.querySelector(".pointsComputer");
const roundsOutput = document.querySelector(".mid-content p")
const startBtn = document.getElementById("startBtn");
const playerBoard = document.getElementById("player-board");
const midField = document.querySelector(".mid-points");
const computerTextOutputField = document.querySelector(".computerTextOutput");
const gameModeSelect = document.getElementById("gameMode");
// ###############################################################################################################

let cardDeck = [];
let playerCards = [];
let computerCards = [];
let layingCards = [];

// let cardOne = "";
// let cardTwo = "";
// let cardThree = "";
// let cardFour = "";
// let cardFive = "";

//####### General values #####

let pointsPlayer = 0;
let pointsComputer = 0;
let round = 0;
let maxRound = 5;

let gameMode = "classic";
let start = false;
let isClassic = false;
let isClassicDeluxe = false;
let isCardGame = false;

//Change Game Mode
const ChangeGameMode = () => {
    gameMode = gameModeSelect.value;
    StartGame();
}

//Change rounds
const changeRadio = (x) => {
    maxRound = x;
    VisualizeRounds();
    StartGame();
}

//Create a new Deck of Cards
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

// For Output
const CardNumberToText = (num) =>{
    let cardText = "";
    switch(num){
        case 1 : cardText = "Rock";break;
        case 2 : cardText = "Paper";break;
        case 3 : cardText = "Scissor";break;
        case 4 : cardText = "Lizard";break;
        case 5 : cardText = "Spock";break;
    }
    return cardText;
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

const IncreaseRounds = () =>{
    round++;
    if(round == maxRound){
        computerTextOutputField.innerHTML = "Das Spiel ist vorbei! " + GetWinner();
        start = false;
    }
}

const VisualizeRounds = () => {
    roundsOutput.innerHTML = round + " / " + maxRound;
}

const VisualizePoints = () => {
    playerPointsOutput.innerHTML = pointsPlayer;
    computerPointsOutput.innerHTML = pointsComputer;
}

const CreateSingleCard = (className,cardIndex) => {
    let newCard = document.createElement("div");
    newCard.className = className;
    newCard.onclick = function() { MyTurn(cardIndex); }
    playerBoard.appendChild(newCard);
}

const CreateNewCards = () => {
    CreateSingleCard("cardLeft",0);
    CreateSingleCard("cardRight",1);
    layingCards[0] = document.querySelector(".cardLeft");
    layingCards[1] = document.querySelector(".cardRight");

    if(gameMode == "classic" || gameMode == "classicDeluxe"){
        CreateSingleCard("cardThree",2);
        layingCards[2] = document.querySelector(".cardThree");

        if(gameMode == "classicDeluxe"){
            CreateSingleCard("cardFour",3);
            CreateSingleCard("cardFive",4);
            layingCards[3] = document.querySelector(".cardFour");
            layingCards[4] = document.querySelector(".cardFive");
        }
    }
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
    
    layingCards[0].innerHTML = cardLeft;
    layingCards[1].innerHTML = cardRight;
    playerBoard.style.flexWrap="nowrap";
}


const VisualizeCardsClassic = () =>{
    if(!isClassic){
        layingCards[0].innerHTML = rockCard;
        layingCards[1].innerHTML = paperCard;
        layingCards[2].innerHTML = scissorCard;
        isClassic = true;
        playerBoard.style.flexWrap="nowrap";
    }
}

const VisualizeCardsClassicDeluxe = () =>{
    if(!isClassicDeluxe){
        layingCards[0].innerHTML = rockCard;
        layingCards[1].innerHTML = paperCard;
        layingCards[2].innerHTML = scissorCard;
        layingCards[3].innerHTML = echseCard;
        layingCards[4].innerHTML = spockCard;
        isClassicDeluxe = true;
        playerBoard.style.flexWrap="nowrap";
    }
}

const GiveNewCardsCardGame = () => {
    for(let i = 0; i < maxRound;i++){
        playerCards.push(cardDeck.pop());
        computerCards.push(cardDeck.pop());
    }
}

const VisualizeCardsCardGame = () =>{
    
    if(!isCardGame){
        let increase = 0;

        playerCards.forEach(playerCard => {
            CreateSingleCard("card card"+increase,increase);
            layingCards[increase] = document.querySelector(".card"+increase);
            switch(playerCard){
                case 1: layingCards[increase].innerHTML = rockCardNOP;break;
                case 2: layingCards[increase].innerHTML = paperCardNOP;break;
                case 3: layingCards[increase].innerHTML = scissorCardNOP;break;
                case 4: layingCards[increase].innerHTML = echseCardNOP;break;
                case 5: layingCards[increase].innerHTML = spockCardNOP;break;
            }

            increase++;
        });
        isCardGame = true;
        playerBoard.style.flexWrap="wrap";
    }
}


const GameLogic = (a,b) => {
    //a = player / b = computer

    // rockCard 1
    // paperCard 2
    // scissorCard 3
    // echseCard 4
    // spockCard 5

    if(a == 1){
        if(b == 1){IncreaseBothPoints();return;}
        else if(b == 2){IncreaseComputerPoints();return;}
        else if(b == 3){IncreasePlayerPoints();return;}
        else if(b == 4){IncreasePlayerPoints();return;}
        else{IncreaseComputerPoints();return;}
    } else if(a == 2){
        if(b==1){IncreasePlayerPoints();return;}
        else if(b==2){IncreaseBothPoints();return;}
        else if(b==3){IncreaseComputerPoints();return;}
        else if(b==4) {IncreaseComputerPoints();return;}
        else{IncreasePlayerPoints();return;}
    } else if(a == 3){
        if(b==1){IncreaseComputerPoints();return;}
        else if(b==2){IncreasePlayerPoints();return;}
        else if(b==3){IncreaseBothPoints();return;}
        else if(b==4){IncreasePlayerPoints();return;}
        else{IncreaseComputerPoints();return;}
    }else if(a == 4){
        if(b==1){IncreaseComputerPoints();return;}
        else if(b==2){IncreasePlayerPoints();return;}
        else if(b==3){IncreaseComputerPoints();return;}
        else if(b==4){IncreaseBothPoints();return;}
        else{IncreasePlayerPoints();return;}
        }else{
        if(b==1){IncreasePlayerPoints();return;}
        else if(b==2){IncreaseComputerPoints();return;}
        else if(b==3){IncreasePlayerPoints();return;}
        else if(b==4){IncreaseComputerPoints();return;}
        else{IncreaseBothPoints();return;}
    }
}

const IncreaseComputerPoints = () => {
    pointsComputer++;
    VideoPopup(1);
}

const IncreasePlayerPoints = () => {
    pointsPlayer++;
    VideoPopup(2);
}

const IncreaseBothPoints = () => {
    pointsPlayer++;
    pointsComputer++;
    VideoPopup(3);
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


const GiveNewCardsClassic = () => {
    playerCards[0] = 1;
    playerCards[1] = 2;
    playerCards[2] = 3;

    computerCards[0] = 1;
    computerCards[1] = 2;
    computerCards[2] = 3;
}

const GiveNewCardsClassicDeluxe = () => {
    playerCards[0] = 1;
    playerCards[1] = 2;
    playerCards[2] = 3;
    playerCards[3] = 4;
    playerCards[4] = 5;

    computerCards[0] = 1;
    computerCards[1] = 2;
    computerCards[2] = 3;
    computerCards[3] = 4;
    computerCards[4] = 5;
}

const StartGame = () => {
    start = true;
    startBtn.remove();
    
    layingCards.forEach(card => {
        card.remove();
    });    
    
    isCardGame = false;
    isClassic = false;
    isClassicDeluxe = false;
    playerBoard.style.visibility = "visible";
    pointsPlayer = 0;
    pointsComputer = 0;
    round = 0;
    playerCards = [];
    computerCards = [];
    computerTextOutputField.style.color = "black";
    VideoPopup(0);

    if(gameMode == "classic"){
        CreateNewCards();
        GiveNewCardsClassic();
        VisualizeCardsClassic();
    } else if(gameMode == "classicDeluxe"){
        CreateNewCards();
        GiveNewCardsClassicDeluxe();
        VisualizeCardsClassicDeluxe();
    }  else if(gameMode == "2card"){
        CreateNewCards();
        SetNewCardDeck();
        shuffleArray(cardDeck);
        shuffleArray(cardDeck); //shuffle 3 times
        shuffleArray(cardDeck);
        GiveNewCards();
        VisualizeCards();
    } else if(gameMode == "cardgame"){
        SetNewCardDeck();
        shuffleArray(cardDeck);
        shuffleArray(cardDeck); //shuffle 3 times
        shuffleArray(cardDeck);
        GiveNewCardsCardGame();
        VisualizeCardsCardGame();
    }

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

const ComputerCardChoiceClassic = (min,max) =>{
    let computerChoice = Math.floor(Math.random() * (max - min + 1) + min); // 0 bis 2 (change 1:3)

    return computerChoice;
}


const VideoPopup = (x) => {
    let oldVideo = document.querySelector(".video-container");

    if(oldVideo != null)
        oldVideo.remove();

    let newVideo = document.createElement("div");
    newVideo.classList.add("video-container");
    midField.appendChild(newVideo);

    oldVideo = document.querySelector(".video-container");


    // 1: compWinPoint
    // 2: compLoosePoint
    // 3: compDrawPoint

    // 4: compLooseGame
    // 5: compWinGame
    // 6: compDrawGame

    switch(x){
        case 1: oldVideo.style.backgroundImage = compWinPoint;oldVideo.classList.add("start-animation");break;
        case 2: oldVideo.style.backgroundImage = compLoosePoint;oldVideo.classList.add("start-animation");break;
        case 3: oldVideo.style.backgroundImage = compDrawPoint;oldVideo.classList.add("start-animation");break;

        case 4: oldVideo.style.backgroundImage = compLooseGame;oldVideo.classList.add("end-animation"); break;
        case 5: oldVideo.style.backgroundImage = compWinGame;oldVideo.classList.add("end-animation");break;
        case 6: oldVideo.style.backgroundImage = compDrawGame;oldVideo.classList.add("end-animation");break;
        default: break;
    }

}





const GetWinner = () =>{
    let winnerText;

    if(pointsComputer > pointsPlayer){
        winnerText = "Computer gewinnt!";
        computerTextOutputField.style.color = "red";
        VideoPopup(5);
    } else if(pointsPlayer > pointsComputer){
        winnerText = "Spieler gewinnt!";
        computerTextOutputField.style.color = "blue";
        VideoPopup(4);
    } else{
        winnerText = "Unentschieden!";
        computerTextOutputField.style.color = "green";
        VideoPopup(6);
    }
    return winnerText;
}

const MyTurn = (x) => {

    if(!start)
        return;

    if(gameMode == "classic"){
        GameModeClassic(x);
    } else if(gameMode == "classicDeluxe"){
        GameModeClassicDeluxe(x);
    } else if(gameMode == "2card"){
        GameMode2Card(x);
    } else if(gameMode == "cardgame"){
        GameModeCardGame(x);
    }

    IncreaseRounds();
    VisualizePoints();
    VisualizeRounds();

}


const GameModeClassic = (x) => {
    const computerChoice = computerCards[ComputerCardChoiceClassic(0,2)];
    const playerChoice = playerCards[x]; 

    OutputConsole(computerChoice,playerChoice);

    GameLogic(playerChoice,computerChoice);
    computerTextOutputField.innerHTML = "Computer hat die Karte "+CardNumberToText(computerChoice)+" gewählt";
    GiveNewCardsClassic();
    VisualizeCardsClassic();
}

const GameModeClassicDeluxe = (x) => {

    const computerChoice = computerCards[ComputerCardChoiceClassic(0,4)];
    const playerChoice = playerCards[x]; 

    OutputConsole(computerChoice,playerChoice);

    GameLogic(playerChoice,computerChoice);
    computerTextOutputField.innerHTML = "Computer hat die Karte "+CardNumberToText(computerChoice)+" gewählt";
    GiveNewCardsClassicDeluxe();
    VisualizeCardsClassicDeluxe();
}

const GameMode2Card = (x) => {
    const computerChoice = computerCards[ComputerCardChoice()];
    const playerChoice = playerCards[x]; 

    OutputConsole(computerChoice,playerChoice);

    GameLogic(playerChoice,computerChoice);
    computerTextOutputField.innerHTML = "Computer hat die Karte "+CardNumberToText(computerChoice)+" gewählt";
    GiveNewCards();
    VisualizeCards(playerCards[0],playerCards[1]);
}

const GameModeCardGame = (x) => {
    const computerChoice = computerCards[ComputerCardChoiceClassic(0,maxRound-1)];
    const playerChoice = playerCards[x]; 

    layingCards[x].remove();

    OutputConsole(computerChoice,playerChoice);

    GameLogic(playerChoice,computerChoice);
    computerTextOutputField.innerHTML = "Computer hat die Karte "+CardNumberToText(computerChoice)+" gewählt";
}


const OutputConsole = (cC,pC) => {
    console.log(cC);
    console.log(pC);
    console.log("Du hast "+(CardNumberToText(pC))+" ausgewählt");
    console.log("Computer hat die Karte "+CardNumberToText(cC)+" gewählt");
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
