
//Challenge 1
//Your Age In Days

function ageInDays(){
    var birthYear = prompt("What Year were you born?");
    var currentYear = prompt("What year is it?");
    var ageDays = (currentYear - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ageDays+' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1); 
}   

function reset(){
    document.getElementById('ageInDays').remove();
}

//Challenge 2
//Cat Generator

//Challenge 3
//Rock Paper Scissors
function rpsRandomNumber(){
    return Math.floor(Math.random()*3);
}
function decideWinner(humanChoice, botChoice){
    switch(humanChoice){
        case "rock":
            switch(botChoice){
                case "rock":
                    return 0.5;
                case "paper":
                    return 0;
                case "scissors":
                    return 1;
            }
        case "paper":
            switch(botChoice){
                case "rock":
                    return 1;
                case "paper":
                    return 0.5;
                case "scissors":
                    return 0;    
            }
        case "scissors":
            switch(botChoice){
                case "rock":
                    return 0;
                case "paper":
                    return 1;
                case "scissors":
                    return 0.5;
            }
    }
}
var choiceArray = ["rock", "paper", "scissors"];
function finalMessage(results){
    switch(results){
        case 0:
            return {
                'message':"You Lost :(", 
                'color':'red',
            };
        case 0.5:
            return {
                'message':"You Tied",
                'color':'yellow',
            };
        case 1:
            return {
                'message':"You Won!",
                'color':'green',
            };
    }
}
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>";

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}
function rpsGame(choice){
    var humanChoice, botChoice;
    humanChoice = choice.id;
    botChoice = choiceArray[rpsRandomNumber()];
    results = decideWinner(humanChoice, botChoice); //1 human win 0.5 tie 0 bot win
    message = finalMessage(results); //{'message': 'You won', 'color': 'green'}
    rpsFrontEnd(choice.id, botChoice, message);
}

//Challenge 4
//Change the Color of All Buttons

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i<all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonSelection){
    switch(buttonSelection.value){
        case 'red': buttonsRed();
        break;
        case 'green': buttonsGreen();
        break;
        case 'reset': buttonsReset();
        break;
        case 'random': buttonsRandom();
    }
}

function buttonsRed(){
    for( let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for( let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsReset(){
    for( let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom(){
    for( let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        let nbr=btnRandomNumber();
        all_buttons[i].classList.add(copyAllButtons[nbr]);
    }
}

function btnRandomNumber(){
    return Math.floor(Math.random()*copyAllButtons.length);
}

//Challenge 5
//Blackjack

let blackjackGame = {
    'you': {
        'scoreSpan' : '#your-blackjack-result',
        'div' : '#your-box',
        'score' : 0
    }, 
    'dealer': {
        'scoreSpan' : '#dealer-blackjack-result',
        'div' : '#dealer-box',
        'score' : 0
    },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
        '10': 10, 'J': 10, 'Q': 10, 'K': 10, 
        'A': [1, 11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);


function randomCard() {
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function blackjackHit(){
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU)
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/cards/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}  

function blackjackDeal(){
    computeWinner();

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for (let i=0; i<yourImages.length; i++){
        yourImages[i].remove();
    }
    
    for (let i=0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    } 

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector(YOU['scoreSpan']).style.color = 'white';
    document.querySelector(DEALER  ['scoreSpan']).style.color = 'white';
}

function updateScore(card, activePlayer){
    if (card === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function dealerLogic() {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    if (DEALER['score'] > 15){
        let winner = computeWinner();
        showResult(winner);
    } else {
        dealerLogic();
    }
}

function computeWinner () {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            winner = YOU;
            blackjackGame['wins']++;
        } else if (YOU['score'] <  DEALER['score']){
            winner = DEALER;
            blackjackGame['losses']++;
        } else if (YOU['score'] == DEALER['score']){
            blackjackGame['draws']++;
        }

    } else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }


    return winner;
}

function showResult (winner){
    let message, messageColor;
    if (winner === YOU){
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You won';
        messageColor = 'green';
        winSound.play();
    } else if (winner === DEALER){
        document.querySelector('#losses').textContent = blackjackGame['losses'];
        message = 'You lost';
        messageColor = 'red';
        lossSound.play();
    } else {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'You tied';
        messageColor = 'black';
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}