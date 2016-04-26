Schedule = new Mongo.Collection('Schedule');

Schedule.attachSchema(
    new SimpleSchema({
        scheduleId: {
            type: String
        },
        macAddress: {
            type: String
        },
        creationDate: {
            type: Date
        },
        modifiedDate: {
            type: Date
        },
        date: {
            type: String
        },
        startTime: {
            type: String
        },
        coolTemperature: {
            type: Number
        },
        heatTemperature: {
            type: Number
        },
        cycleTemperature: {
            type: Number
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Schedule.allow({
        insert: function() {
            return true;
        },
        update: function() {
            return true;
        },
        remove: function() {
            return true;
        }
    });
}
