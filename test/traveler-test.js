import { expect }from 'chai';
import travelersData from './traveler-test-data';
import Traveler from '../src/Traveler';

describe('Traveler', function() {
  let traveler;
  
    this.beforeEach(() => {
      traveler = new Traveler(travelersData);
    })
    it('should be a function', function() {
      expect(Traveler).to.be.a('function');
    })
  
    it('should be an instance of Traveler', function() {
      expect(traveler).to.be.an.instanceOf(Traveler);
    })
  
    it('should have a user ID, name and style', function() {
      expect(traveler.travelerData[0].id).to.equal(44);
      expect(traveler.travelerData[0].name).to.equal("Marijo MacNeilley");
      expect(traveler.travelerData[0].travelerType).to.equal("photographer")
    });
    it('should take in a current traveler', function () {
      expect(traveler.currTraveler).to.equal(undefined)
    })

    it('should be able to return a current traveler', function () {
      expect(traveler.getTraveler(44)).to.deep.equal({
        "id":44,
        "name":"Marijo MacNeilley",
        "travelerType":"photographer" 
      });
    });
});