Thermostat = new Mongo.Collection('Thermostat');

Thermostat.attachSchema(
    new SimpleSchema({
        thermostatId: {
            type: String,
            unique: true
        },
        macAddress: {
            type: String
        },
        registrationDate: {
            type: Date,
            denyUpdate: true
        },
        modifiedDate: {
            type: Date
        },
        name: {
            type: String
        },
        status: {
            type: Number
        },
        houseId: {
            type: String
        },
        version: {
            type: String,
            optional: true
        },
        running: {
            type: String,
            optional: true
        },
        roomTemperature: {
            type: Number,
            optional: true
        },
        roomHumidity: {
            type: Number,
            optional: true
        },
        heatTemperature: {
            type: Number,
            optional: true
        },
        coolTemperature: {
            type: Number,
            optional: true
        },
        cycleTemperature: {
            type: Number,
            optional: true
        },
        fanMode: {
            type: String,
            optional: true
        },
        systemMode: {
            type: String,
            optional: true
        },
        controlMode: {
            type: String,
            optional: true
        },
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Thermostat.allow({
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
