Registration = new Mongo.Collection('Registration');

Registration.attachSchema(
    new SimpleSchema({
        gcmId: {
            type: String
        },
        username: {
            type: String
        },
        session: {
            type: String,
            optional: true
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Registration.allow({
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
