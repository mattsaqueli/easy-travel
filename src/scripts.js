// -------------------------------- IMPORTS -------------------------------- //
import './css/styles.css';
import './images/EASY-TRAVEL.png';
import Trip from './Trip';
import Traveler from './Traveler';
import Destination from './Destination';



// -------------------------------- GLOBAL -------------------------------- //

let currUserID;
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






// -------------------------------- FUNCTIONS -------------------------------- //
