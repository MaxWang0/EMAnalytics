House = new Mongo.Collection('House');

House.attachSchema(
    new SimpleSchema({
        houseId: {
            type: String,
            unique: true
        },
        username: {
            type: String
        },
        name: {
            type: String
        },
        creationDate: {
            type: Date,
            denyUpdate: true
        },
        modifiedDate: {
            type: Date
        },
        streetAddress: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zipcode: {
            type: String
        },
        timezone: {
            type: String
        },

    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    House.allow({
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
