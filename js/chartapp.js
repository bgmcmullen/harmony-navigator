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
    lablesArray.push((allIntervals[i].attempts != 0) ? `${allIntervals[i].type} ${Math.round((allIntervals[i].successes/allIntervals[i].attempts) * 100)}%` : allIntervals[i].type);
    successArray.push(allIntervals[i].successes);
    attemptsArray.push(allIntervals[i].attempts)
  }
}

function buildChart() {
  Chart.defaults.font.size = 17;
  let chartObj = {
    type: 'bar',
    data: {
      labels: lablesArray,
      datasets: [{
        label: 'Successes',
        data: successArray,
        backgroundColor: 'blue',
      },
      {
        label: 'Attempts',
        data: attemptsArray,
        backgroundColor: 'red',
      }
    ]
  },
    options: {
      
              plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 20,
                    },
                    color: 'black'
                }
            }
        },
  
      scales: {
        y: {
          ticks: {
            color: 'black',
          },
          beginAtZero: true
        },
        x: {
          ticks: {
            color: 'black'
          },
        }
      }
    }
  }
  new Chart(ctx, chartObj);
}

loadIntervalOjects();
createLables();
buildChart();