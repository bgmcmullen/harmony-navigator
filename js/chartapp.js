'use strict';

// Get chart element 
const ctx = document.getElementById('myChart');

// Global variables
let allIntervals = [];
let lablesArray = [];
let successArray = [];
let attemptsArray = [];

// Load interval objects from local storage
function loadIntervalOjects(){
  let retrievedIntervals = JSON.parse(localStorage.getItem('intervals'));
  if(retrievedIntervals)
    allIntervals = retrievedIntervals;
}

// Create labels for chart
function createLables() {
  for(let i = 0; i < allIntervals.length; i++){

    // Include percentage in label if answers exist
    lablesArray.push((allIntervals[i].attempts != 0) ? `${allIntervals[i].type} ${Math.round((allIntervals[i].successes/allIntervals[i].attempts) * 100)}%` : allIntervals[i].type);

    // Add success and atempts to arrays
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
        label: 'Successes (On first try)',
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

// Load results page
loadIntervalOjects();
createLables();
buildChart();