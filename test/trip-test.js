import { expect }from 'chai';
import tripsData from './trip-test-data';
import Trip from '../src/Trip';

describe('Trip', function() {
  let trip;
  
    this.beforeEach(() => {
      trip = new Trip(tripsData);
    })
    it('should be a function', function() {
      expect(Trip).to.be.a('function');
    })
  
    it('should be an instance of Traveler', function() {
      expect(trip).to.be.an.instanceOf(Trip);
    })
  
    it('should have an Id, userID, destinationID, total travelers, date, duration, status and suggested activities', function() {
      expect(trip.tripData[0].id).to.equal(1);
      expect(trip.tripData[0].userID).to.equal(44);
      expect(trip.tripData[0].destinationID).to.equal(49);
      expect(trip.tripData[0].travelers).to.equal(1);
      expect(trip.tripData[0].date).to.equal("2022/09/16");
      expect(trip.tripData[0].duration).to.equal(8);
      expect(trip.tripData[0].status).to.equal("approved");
      expect(trip.tripData[0].suggestedActivities).to.deep.equal([]);

    });
  
    it('should get a user trip by ID', function () {
      expect(trip.getPastTrips(44)).to.deep.equal([
        {
          id: 1,
          userID: 44,
          destinationID: 49,
          travelers: 1,
          date: '2022/09/16',
          duration: 8,
          status: 'approved',
          suggestedActivities: []
        }
      ]);
    });

});