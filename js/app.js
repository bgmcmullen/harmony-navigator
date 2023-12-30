'use strict';

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
let activeIntervals = ['m2', 'M2', 'm3', 'M3', 'p4', 'tritone', 'p5', 'm6', 'M6', 'm7', 'M7', 'octave'];
let allIntervals = [minorSecond, majorSecond, minorThird, majorThird, perfectFourth, tritone, perfectFifth, minorSixth, majorSixth, minorSeventh, majorSeventh, octave];
let awaitingAnswer = true;
let answeredWrong = false;
let wrongAnswersGiven = [];

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

// Create interval objects
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

let intervalArray = [];

function addIntervalsToArray(){
  intervalArray = []
  for(let i = 0; i < allIntervals.length; i++){
    if(activeIntervals.includes(allIntervals[i].type)){
      intervalArray.push(allIntervals[i]);
    }
  }

}

let intervalIndex
let fileIndex
let intervalObject

function loadActiveIntervals(){
  let retrievedActiveIntervals = JSON.parse(localStorage.getItem('activeIntervals'));
  if(retrievedActiveIntervals)
    activeIntervals = retrievedActiveIntervals;
  setActiveIntervalsColors();
}

function setInterval(){
  if(intervalArray.length === 0)
    return;
  resultBox.innerHTML = '';
  staffImage.src = '';
  intervalIndex = Math.floor(Math.random() * intervalArray.length);
  fileIndex = Math.floor(Math.random() * 10) + 1;
  intervalObject = intervalArray[intervalIndex];
  audioSource.src = `audio-files/${intervalObject.audioFile}-${fileIndex}.3.wav`
  audioElement.load();
  awaitingAnswer = true;
  answeredWrong = false;
}

function loadIntervalOjects(){
  let retrievedIntervals = JSON.parse(localStorage.getItem('intervals'));
  if(retrievedIntervals)
    allIntervals = retrievedIntervals;
}

function handleNextButton(){
  setInterval()
  audioElement.play();
}
loadActiveIntervals()
loadIntervalOjects()
addIntervalsToArray()
setInterval()

function handleSelectButtonClick(event){
  if(event.target.id === "select-button-container")
    return;
  let clickedButton = event.target;
  if(!activeIntervals.includes(clickedButton.id)){
    activeIntervals.push(clickedButton.id);
  } else {
    activeIntervals.splice(activeIntervals.indexOf(clickedButton.id), 1);
  }

  setActiveIntervalsColors()
  addIntervalsToArray()
  setInterval()
  localStorage.setItem('activeIntervals', JSON.stringify(activeIntervals));
}

function handleButtonClick(event){
  if(event.target.id === "button-container" || awaitingAnswer === false)
    return;
  
  if(event.target.id === intervalObject.type){
    resultBox.innerHTML = `CORRECT! ${event.target.id}`;
    resultBox.style.color = 'green';
    if(answeredWrong === false){
      intervalObject.attempts++
      intervalObject.successes++;
    }
    awaitingAnswer = false;
  }
  else {
    if(answeredWrong === false)
      intervalObject.attempts++
    answeredWrong = true;
    resultBox.innerHTML = 'TRY AGAIN';
    resultBox.style.color = 'red';
    wrongAnswersGiven.push(event.target.style.backgroundColor = 'red')
    return;
  }
  for(let i = 0; i < answerButtons.length; i++){
    answerButtons[i].style.backgroundColor = '';
  }
  staffImage.src = `img/${intervalObject.image}-${fileIndex}.png`;
  // save to Local Storage
  localStorage.setItem('intervals', JSON.stringify(allIntervals));
}

function handleResetButton(){
  for(let i = 0; i < allIntervals.length; i++){
    allIntervals[i].attempts = 0;
    allIntervals[i].successes = 0;
  }
  localStorage.setItem('intervals', JSON.stringify(allIntervals));
}

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

