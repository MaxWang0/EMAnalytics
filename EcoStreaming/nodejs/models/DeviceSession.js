DeviceSession = new Mongo.Collection('DeviceSession');

DeviceSession.attachSchema(
    new SimpleSchema({
        macAddress: {
            type: String
        },
        session: {
            type: String
        },
        username: {
            type: String
        },
        creationDate: {
            type: Date,
            denyUpdate: true
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    DeviceSession.allow({
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
