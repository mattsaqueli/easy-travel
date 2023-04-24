class Destination {
  constructor(destinationData) {
    this.destinationData = destinationData;
  };

  getDestination(Id) {
    return this.destinationData.find(destination => destination.id === Id);
  };

  getCost(Id, travelers, duration) {
    const destination = this.getDestination(Id)
    const totalWithAgentFee = Math.round((destination.estimatedLodgingCostPerDay * duration + destination.estimatedFlightCostPerPerson * travelers) * 1.1)
    return totalWithAgentFee;
  };
};

export default Destination;