'use strict';

// DOM Windows
const staffImage = document.getElementById('staff-image');
const buttons = document.getElementById('button-container');
const audioSource = document.getElementById('audio-source');

// Create interval objects
function Interval(type, audioFileArray, imageArray){
  this.type = type;
  this.audioFileArray = audioFileArray;
  this.imageArray = imageArray;
}

const majorThird = new Interval('M3', ['M3-1.mp3', 'M3-2.mp3'], ['M3-1.png', 'M3-2.png']);

const perfectFifth = new Interval('p5', ['p5-1.mp3', 'p5-2.mp3'], ['p5-1.png', 'p5-2.png']);

let intervalArray = [majorThird, perfectFifth];

let intervalIndex
let fileIndex
let intervalObject

function playInterval(){
  intervalIndex = Math.floor(Math.random() * 2);
  fileIndex = Math.floor(Math.random() * 2);
  intervalObject = intervalArray[intervalIndex];
  audioSource.src = `audio-files/${intervalObject.audioFileArray[fileIndex]}`
}

playInterval()

buttons.addEventListener('click', handleButtonClick);

function handleButtonClick(event){
  if(event.target.id === intervalObject.type)
    alert('correct');
  else if(event.target.id === "button-container")
    return;
  else
    alert('wrong');
    staffImage.src = `img/${intervalObject.imageArray[fileIndex]}`
}

