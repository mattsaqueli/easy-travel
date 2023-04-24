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
console.log(currDate)

// -------------------------------- QUERY SELECTORS -------------------------------- //

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
const inputForm = document.querySelector('.post-form');

// -------------------------------- EVENT LISTNERS -------------------------------- //

window.addEventListener('load', function () {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
  .then(data => {
    travelers = new Traveler(data[0].travelers);
    trips = new Trip(data[1].trips);
    destinations = new Destination(data[2].destinations);
    loadDOM();
  })
  .then(() => {
    travelers.getTraveler(currUserID)
  });
});

// -------------------------------- FUNCTIONS -------------------------------- //

function loadDOM() {
  displayCurrUser();
  displayPastTrips();
}

function displayCurrUser() {
  traveler.innerText = `Welcome back, ${travelers.getTraveler(currUserID).name.split(' ')[0]}!`
}

function displayPastTrips() {
  const displayPastTrips = trips.getPastTrips(currUserID)
  console.log(pastTrips)
  displayPastTrips.forEach(trip => {
    const destinationDisplay = destinations.getDestination(trip.destinationID)
    pastTrips.innerHTML +=   
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
  }) 
}

