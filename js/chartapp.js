'use strict';

let allIntervals = [];

const ctx = document.getElementById('myChart');



let lablesArray = [];
let successArray = [];
let attemptsArray = [];

function loadIntervalOjects(){
  let retrievedIntervals = JSON.parse(localStorage.getItem('intervals'));
  if(retrievedIntervals)
    allIntervals = retrievedIntervals;
}

function createLables() {
  for(let i = 0; i < allIntervals.length; i++){
    lablesArray.push((allIntervals[i].attempts != 0) ? `${allIntervals[i].type} ${Math.round((allIntervals[i].successes/allIntervals[i].attempts) * 100)} %` : allIntervals[i].type);
    successArray.push(allIntervals[i].successes);
    attemptsArray.push(allIntervals[i].attempts)
  }
}

function buildChart() {
  let chartObj = {
    type: 'bar',
    data: {
      labels: lablesArray,
      datasets: [{
        label: 'Successes',
        data: successArray,
        borderWidth: 5,
        backgroundColor: 'blue',
        borderColor: 'red'
      },
      {
        label: 'Attempts',
        data: attemptsArray,
        borderWidth: 5,
        backgroundColor: 'red',
        borderColor: 'blue',
      }
    ]
  },
    options: {
  
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  }
  new Chart(ctx, chartObj);
}

loadIntervalOjects();
createLables();
buildChart();