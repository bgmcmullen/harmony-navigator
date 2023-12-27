'use strict';

const minorSecond = new Interval('m2', 'minor2', 'minor2');

const majorSecond = new Interval('M2', 'minor2', 'minor2');

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
let activeIntervals = [];
let allIntervals = [minorSecond, majorSecond, minorThird, majorThird, perfectFourth, tritone, perfectFifth, minorSixth, majorSixth, minorSeventh, majorSeventh, octave];

// DOM Windows
const staffImage = document.getElementById('staff-image');
const selectButtons = document.getElementById('select-button-container');
const nextButton = document.getElementById("next-button");
const buttons = document.getElementById('button-container');
const audioElement = document.getElementById('interval-audio');
const audioSource = document.getElementById('audio-source');

// Create interval objects
function Interval(type, audioFile, image){
  this.type = type;
  this.audioFile = audioFile;
  this.image = image;
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
  staffImage.src = '';
  intervalIndex = Math.floor(Math.random() * intervalArray.length);
  fileIndex = Math.floor(Math.random() * 10) + 1;
  intervalObject = intervalArray[intervalIndex];
  audioSource.src = `audio-files/${intervalObject.audioFile}-${fileIndex}.mp3`
  audioElement.load();
  intervalObject.attempts++
}

setInterval()

buttons.addEventListener('click', handleButtonClick);
selectButtons.addEventListener('click', handleSelectButtonClick);
nextButton.addEventListener('click', setInterval);

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
  staffImage.src = `img/${intervalObject.image}-${fileIndex}.png`
}


