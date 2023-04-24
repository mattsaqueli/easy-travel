class Traveler {
  constructor(travelerData) {
    this.travelerData = travelerData;
    this.currTraveler;
  };

  getTraveler(userID) {
    this.currTraveler = this.travelerData.find(traveler => {
      return traveler.id === userID;
    })
    return this.currTraveler;
  };
};

export default Traveler;