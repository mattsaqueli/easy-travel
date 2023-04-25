// -------------------------------- IMPORTS -------------------------------- //

import './css/styles.css';
import './images/EASY-TRAVEL.png';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';
import { fetchData } from './apiCalls';

// -------------------------------- GLOBAL -------------------------------- //

let currUserID = 7;
let date = new Date();
let currDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);
let trips, travelers, destinations;

// -------------------------------- QUERY SELECTORS -------------------------------- //

const loginForm = document.querySelector('#login');
const login = document.querySelector('#loginBtn');
const loginHeader = document.querySelector('#loginHeader');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const topArea = document.querySelector('.top-bar')
const estimateBtn = document.querySelector('.estimate-button');
const estimateCost = document.querySelector('.estimate-cost')
const pastTrips = document.querySelector('.past-cards');
const pendingTrips = document.querySelector('.pending-cards');
const traveler = document.querySelector('.welcome-user');
const travelTotal = document.querySelector('.cost');
const dateInput = document.querySelector('#date');
const durationInput = document.querySelector('#duration');
const TravelerInput = document.querySelector('#travelers');
const destinationInput = document.querySelector('#destination');
const inputForm = document.querySelector('.form');

// -------------------------------- EVENT LISTNERS -------------------------------- //

window.addEventListener('load', getData);
estimateBtn.addEventListener('click', getTripEstimateCost);
login.addEventListener('click', grantAccess);

inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify({
      "id": parseInt(trips.tripData.length + 1),
      "userID": currUserID,
      "destinationID": parseInt(destinationInput.value),
      "travelers": parseInt(TravelerInput.value),
      "date": document.getElementById('dateInput').value.split('-').join('/'),
      "duration": durationInput.value,
      "status":"pending",
      "suggestedActivities":[]
    }), 
    headers: {
      'Content-Type': 'application/json'
    }  
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    getData();
  })
  .catch(err => console.log(err));

  durationInput.value = '';
  TravelerInput.value = '';
  destinationInput.value = '';
  estimateCost.innerText = '';
})

// -------------------------------- FUNCTIONS -------------------------------- //

function getData() {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
  .then(data => {
    travelers = new Traveler(data[0].travelers);
    trips = new Trip(data[1].trips);
    destinations = new Destination(data[2].destinations);
    loadDOM();
  })
  .then(() => {
    travelers.getTraveler(currUserID);
  })
  .catch(err => console.log(err));
};

function loadDOM() {
  displayCurrUser();
  displayPastTrips();
  displayPendingTrips();
  displayTotalCost();
  displayCalendarInput();
  populateDestinations(destinations);
};

function displayCurrUser() {
  traveler.innerText = `Welcome back, ${travelers.getTraveler(currUserID).name.split(' ')[0]}!`;
};

function displayPastTrips() {
  const displayPastTrips = trips.getPastTrips(currUserID);
  displayPastTrips.forEach(trip => {
    const destinationDisplay = destinations.getDestination(trip.destinationID);
    pastTrips.innerHTML +=   
    ` <section class="user-card"
        <header class="card-top">
          <img class="location-img" src="${destinationDisplay.image}" alt="${destinationDisplay.alt}" width="300px" height="200px">
        </header>
        <main class="card-middle">
          <p>${destinationDisplay.destination}</p>
        </main>
        <footer class="card-bottom">
          <p>${trip.date}</p>
        </footer>
      </section>
    `;
  }); 
};

function displayPendingTrips() {
  const displayPendingTrips = trips.getPendingTrips(currUserID);
  displayPendingTrips.forEach(trip => {
    const destinationDisplay = destinations.getDestination(trip.destinationID);
    pendingTrips.innerHTML +=   
    `
      <header class="card-top">
        <img class="location-img" src="${destinationDisplay.image}" alt="${destinationDisplay.alt}" width="300px" height="200px">
      </header>
      <main class="card-middle">
        <p>${destinationDisplay.destination}</p>
      </main>
      <footer class="card-bottom">
        <p>${trip.date}</p>
      </footer>
    `
  });
};

function displayTotalCost() {
  const convert = Intl.NumberFormat('en-us');
  const displayPast = trips.getPastTrips(currUserID);
  let total = displayPast.reduce((total, trip) => {
    total += destinations.getCost(trip.destinationID, trip.travelers, trip.duration);
    return total;
  }, 0);
  total = convert.format(total);
  travelTotal.innerText = `Total travel cost: $${total}`;
};

function displayCalendarInput() {
  dateInput.innerHTML = `<label for="date">Date:<input id="dateInput" type="date" min="${currDate.split('/').join('-')}" name="date" required></label>`;
};

function populateDestinations(destinations) {
  destinations.destinationData.forEach(destination => {
    destinationInput.innerHTML += `<option id="${destination.id}" value="${destination.id}">${destination.destination}</option>`;
  });
};


function getTripEstimateCost(event) {
  event.preventDefault();
  const convert = Intl.NumberFormat('en-us');
  if (durationInput.value && TravelerInput.value && destinationInput.value) {
    let total = destinations.getCost(parseInt(destinationInput.value), parseInt(TravelerInput.value), parseInt(durationInput.value));
    total = convert.format(total);
    estimateCost.innerText = `Estimated trip cost: $${total}`;
  } else {
    alert("Please fill out all input fields.");
  };
};

function grantAccess(event) {
  event.preventDefault();
  let usernameInput = username.value;
  let passwordInput = password.value;
  let userInput = parseInt(usernameInput.replace('traveler', ''));
  if( passwordInput = 'travel' && userInput >= 1 && userInput <= 50) {
    currUserID = userInput;
    loadDOM();
    display(topArea);
    display(pastTrips);
    display(pendingTrips);
    hide(loginHeader);
    hide(loginForm);
  } else if (userInput !== 'travel' || userInput < 1 || userInput > 50) {
    alert('Please enter a valid username and password.')
  };
};

function hide(area) {
  area.classList.add('hidden');
};

function display(area) {
  area.classList.remove('hidden');
};



