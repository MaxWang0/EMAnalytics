Meteor.publish('thermostats', function() {
    // check(houseId, String);
    return Thermostat.find({
        // houseId: houseId
    });
});
