// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');

// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');

// Countdown Page
const countdown = document.querySelector('.countdown');

// Game Page
const itemContainer = document.querySelector('.item-container');

// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations

let equationsArray = [];
let playerGuessArray =[];

// Game Page
let questionAmount = 0;
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time

// Scroll
let valuelY = 0;

function select(guessedTrue)
{ 
    // 80px
    valuelY += 80;
    console.log(playerGuessArray)
    itemContainer.scroll(0,valuelY)
    return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false');
}

// random  int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// display Equations
function showGamePage()
{
  countdownPage.hidden = true;
  gamePage.hidden= false;
  populateGamePage();
}
// equation toDOM
function equationToDOM()
{

  equationsArray.forEach((eq)=>{

    const item = document.createElement('div');
    item.classList.add('item');

    const eqEl= document.createElement('h1')
    eqEl.textContent = eq.value;

    item.appendChild(eqEl);
    itemContainer.appendChild(item);
  });
}


// shuffle the array
function shuffle(array) {
let currentIndex = array.length,  randomIndex;

// While there remain elements to shuffle.
while (currentIndex != 0) {

  // Pick a remaining element.
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex--;

  // And swap it with the current element.
  [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
}

return array;
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(questionAmount);
  // Set amount of wrong equations
  const wrongEquations =questionAmount - correctEquations

  console.log(correctEquations,"and",wrongEquations);
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomInt((questionAmount/correctEquations)*30);
    secondNumber = getRandomInt((correctEquations/wrongEquations)*10);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomInt((correctEquations/wrongEquations)*20);
    secondNumber = getRandomInt((questionAmount/correctEquations)*40);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3)
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }
  shuffle(equationsArray);  
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-240');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();
  equationToDOM();
  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

function showCountdown()
{
  countdownPage.hidden = false;
  splashPage.hidden = true;
  countdown.textContent = '3'
  setTimeout(()=>{
    countdown.textContent = '2'
  },1000)
  setTimeout(()=>{
    countdown.textContent = '1'
  },2000)
  setTimeout(()=>{
    countdown.textContent = 'GO!'
  },3000)
  
}

function questionSelect(e)
{
  e.preventDefault();
    const el = Object.values(e.target)
    el.forEach((item)=>{
      if(item.checked)
      {
        questionAmount = item.value;
      }
    })
    console.log(questionAmount)
    if(questionAmount)
    {
      showCountdown();
      setTimeout(showGamePage,4000);
    }
}

startForm.addEventListener('click',()=>{

  radioContainers.forEach((item)=>{
    item.classList.remove('selected-label')
    if(item.children[1].checked)
    {
      item.classList.add('selected-label')
    }
  });
});

startForm.addEventListener('submit',questionSelect)