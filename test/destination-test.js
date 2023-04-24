import { expect }from 'chai';
import destinationsData from './destination-test-data';
import Destination from '../src/Destination';

describe('Destination', function() {
  let destination;
  
    this.beforeEach(() => {
      destination = new Destination(destinationsData);
    })
    it('should be a function', function() {
      expect(Destination).to.be.a('function');
    })
  
    it('should be an instance of Destination', function() {
      expect(destination).to.be.an.instanceOf(Destination);
    })
  
    it('should have a user ID, location name, lodging per day cost and flight per traveler cost', function() {
      expect(destination.destinationData[0].id).to.equal(49);
      expect(destination.destinationData[0].destination).to.equal("Castries, St Lucia");
      expect(destination.destinationData[0].estimatedLodgingCostPerDay).to.equal(650)
      expect(destination.destinationData[0].estimatedFlightCostPerPerson).to.equal(90)

    });
  
    it('should be able to get a destination by id', function () {

      expect(destination.getDestination(49)).to.deep.equal({
        "id":49,
        "destination":"Castries, St Lucia",
        "estimatedLodgingCostPerDay":650,
        "estimatedFlightCostPerPerson":90,
        "image":"https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
        "alt":"aerial photography of rocky mountain under cloudy sky"
      })
    })

    it('should get total trip cost', function () {
      expect(destination.getCost(49, 1, 8)).to.equal(5819)
    })
}) 