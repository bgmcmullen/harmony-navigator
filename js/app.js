'use strict';

const majorThird = new Interval('M3', ['M3-1.mp3', 'M3-2.mp3'], ['M3-1.png', 'M3-2.png']);

const perfectFifth = new Interval('p5', ['p5-1.mp3', 'p5-2.mp3'], ['p5-1.png', 'p5-2.png']);

// Global Variables
let activeIntervals = [];
let allIntervals = [majorThird, perfectFifth];

// DOM Windows
const staffImage = document.getElementById('staff-image');
const selectButtons = document.getElementById('select-button-container');
const buttons = document.getElementById('button-container');
const audioElement = document.getElementById('interval-audio');
const audioSource = document.getElementById('audio-source');

// Create interval objects
function Interval(type, audioFileArray, imageArray){
  this.type = type;
  this.audioFileArray = audioFileArray;
  this.imageArray = imageArray;
  this.attempts = 0;
  this.successes = 0;
}



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

function setInterval(){
  if(intervalArray.length === 0)
    return;
  intervalIndex = Math.floor(Math.random() * intervalArray.length);
  fileIndex = Math.floor(Math.random() * 2);
  intervalObject = intervalArray[intervalIndex];
  audioSource.src = `audio-files/${intervalObject.audioFileArray[fileIndex]}`
  audioElement.load();
  intervalObject.attempts++
}

setInterval()

buttons.addEventListener('click', handleButtonClick);
selectButtons.addEventListener('click', handleSelectButtonClick);

function handleSelectButtonClick(event){
  if(event.target.id === "select-button-container")
    return;
  let clickedButton = event.target;
  if(!activeIntervals.includes(clickedButton.id)){
    activeIntervals.push(clickedButton.id);
    clickedButton.style.backgroundColor = 'green';
  } else {
    activeIntervals.splice(activeIntervals.indexOf(clickedButton.id), 1);
    clickedButton.style.backgroundColor = '';
  }
  addIntervalsToArray()
  setInterval()
}

function handleButtonClick(event){
  if(event.target.id === intervalObject.type){
    alert('correct');
    intervalObject.successes++;
  }
  else if(event.target.id === "button-container")
    return;
  else 
    alert(`wrong ${intervalObject.type}: ${intervalObject.successes} / ${intervalObject.attempts} ${(intervalObject.successes / intervalObject.attempts) * 100}%`);
  staffImage.src = `img/${intervalObject.imageArray[fileIndex]}`;
  setInterval()
}

