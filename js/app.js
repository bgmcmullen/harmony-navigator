'use strict';

// Interval Objects
const minorSecond = new Interval('m2', 'minor2', 'minor2');
const majorSecond = new Interval('M2', 'major2', 'major2');
const minorThird = new Interval('m3', 'minor3', 'minor3');
const majorThird = new Interval('M3', 'major3', 'major3');
const perfectFourth = new Interval('p4', 'perfect4', 'perfect4');
const tritone = new Interval('tritone', 'tritone', 'tritone');
const perfectFifth = new Interval('p5', 'perfect5', 'perfect5');
const minorSixth = new Interval('m6', 'minor6', 'minor6');
const majorSixth = new Interval('M6', 'major6', 'major6');
const minorSeventh = new Interval('m7', 'minor7', 'minor7');
const majorSeventh = new Interval('M7', 'major7', 'major7');
const octave = new Interval('octave', 'octave', 'octave');

// Global Variables
let activeIntervals = ['M2', 'M3', 'p5', 'octave'];
let allIntervals = [minorSecond, majorSecond, minorThird, majorThird, perfectFourth, tritone, perfectFifth, minorSixth, majorSixth, minorSeventh, majorSeventh, octave];
let awaitingAnswer = true;
let answeredWrong = false;
let wrongAnswersGiven = [];
let intervalIndex
let fileIndex
let intervalObject
let intervalArray = [];

// DOM Windows
const staffImage = document.getElementById('staff-image');
const selectButtonContiner = document.getElementById('select-button-container');
const selectButtons = Array.from(selectButtonContiner.children)
const nextButton = document.getElementById("next-button");
const buttons = document.getElementById('button-container');
const answerButtons = Array.from(buttons.children);
const audioElement = document.getElementById('interval-audio');
const audioSource = document.getElementById('audio-source');
const resetButton = document.getElementById('reset-button');
const resultBox = document.getElementById('result-box');

// Interval Contructor
function Interval(type, audioFile, image){
  this.type = type;
  this.audioFile = audioFile;
  this.image = image;
  this.attempts = 0;
  this.successes = 0;
}

// Event Listeners
buttons.addEventListener('click', handleButtonClick);
selectButtonContiner.addEventListener('click', handleSelectButtonClick);
nextButton.addEventListener('click', handleNextButton);
resetButton.addEventListener('click', handleResetButton);

// Add all active interval objects to array
function addIntervalsToArray(){
  intervalArray = []
  for(let i = 0; i < allIntervals.length; i++){
    if(activeIntervals.includes(allIntervals[i].type)){
      intervalArray.push(allIntervals[i]);
    }
  }
}

// Load active intervals from local storage and set active intervals
function loadActiveIntervals(){
  let retrievedActiveIntervals = JSON.parse(localStorage.getItem('activeIntervals'));
  if(retrievedActiveIntervals)
    activeIntervals = retrievedActiveIntervals;
  setActiveIntervalsColors();
}


function setInterval(){
  // Make sure interval array is  not empty
  if(intervalArray.length === 0)
    return;

  // Clear result box and staff image
  resultBox.innerHTML = '';
  staffImage.src = '';
  staffImage.style.display = 'none';

  // Randomly set interval index
  intervalIndex = Math.floor(Math.random() * intervalArray.length);

  // Randomly set file index
  fileIndex = Math.floor(Math.random() * 10) + 1;

  // Choose interval object based on random index
  intervalObject = intervalArray[intervalIndex];

  // Choose audio file based on random index
  audioSource.src = `audio-files/${intervalObject.audioFile}-${fileIndex}.3.wav`
  audioElement.load();

  awaitingAnswer = true;
  answeredWrong = false;
  resetAnswerButtonColors()
}

// Load active intervals from local storage
function loadIntervalOjects(){
  let retrievedIntervals = JSON.parse(localStorage.getItem('intervals'));
  if(retrievedIntervals)
    allIntervals = retrievedIntervals;
}

// Set Next Interval
function handleNextButton(){
  setInterval()
  audioElement.play();
}


function handleSelectButtonClick(event){

  // Make sure button was clicked 
  if(event.target.id === "select-button-container")
    return;
  let clickedButton = event.target;

  // Add or remove interval from active list
  if(!activeIntervals.includes(clickedButton.id)){
    activeIntervals.push(clickedButton.id);
  } else {
    activeIntervals.splice(activeIntervals.indexOf(clickedButton.id), 1);
  }

  setActiveIntervalsColors()
  addIntervalsToArray()
  setInterval()

  // Save active intervals to local storage
  localStorage.setItem('activeIntervals', JSON.stringify(activeIntervals));
}

// Handle answer button clicked
function handleButtonClick(event){

  // Make sure button was click and awaiting an answer
  if(event.target.id === "button-container" || awaitingAnswer === false)
    return;
  
  // Check if answer is correct
  if(event.target.id === intervalObject.type){
    resultBox.style.animation = 'none';
    resultBox.style.color = 'green';

    // If user answered correctly increment attempts and successes and give "CORRECT!" result
    if(answeredWrong === false){
      resultBox.innerHTML = `CORRECT! ${event.target.id}`;
      intervalObject.attempts++
      intervalObject.successes++;
    } else {
      resultBox.innerHTML = event.target.id
    }
    awaitingAnswer = false;
  }
  else {

    // Handle wrong answer
    if(answeredWrong === false)
      intervalObject.attempts++
    answeredWrong = true;
    resultBox.innerHTML = 'TRY AGAIN';

    // Highlight wrong answer button in red
    resultBox.style.color = 'red';
    resultBox.style.animation = 'red-glow 1.5s ease infinite';
    wrongAnswersGiven.push(event.target.style.backgroundColor = 'red');
    return;
  }

  resetAnswerButtonColors();
  staffImage.src = `img/${intervalObject.image}-${fileIndex}.png`;
  staffImage.style.display = '';
  // Save to Local Storage
  localStorage.setItem('intervals', JSON.stringify(allIntervals));
}

// Reset results and save to local storage
function handleResetButton(){
  for(let i = 0; i < allIntervals.length; i++){
    allIntervals[i].attempts = 0;
    allIntervals[i].successes = 0;
  }
  localStorage.setItem('intervals', JSON.stringify(allIntervals));
}

// Set color of select buttons and remove unused answer buttons
function setActiveIntervalsColors(){
  for(let i = 0; i < selectButtons.length; i++){
    if(activeIntervals.includes(selectButtons[i].innerHTML)){
      selectButtons[i].style.backgroundColor = 'green';
      selectButtons[i].style.textDecoration = '';
      selectButtons[i].style.fontWeight = 'bold';
    } else {
      selectButtons[i].style.backgroundColor = 'white';
      selectButtons[i].style.textDecoration = 'line-through';
      selectButtons[i].style.fontWeight = '';
    }
  }
  for(let i = 0; i < answerButtons.length; i++){
    if(activeIntervals.includes(answerButtons[i].innerHTML)){
      answerButtons[i].style.display = '';
    } else {
      answerButtons[i].style.display = 'none';
    }
  }
}

function resetAnswerButtonColors(){
  // Reset button colors
  for(let i = 0; i < answerButtons.length; i++){
    answerButtons[i].style.backgroundColor = '';
  }
}

// Load Quiz
loadActiveIntervals()
loadIntervalOjects()
addIntervalsToArray()
setInterval()
