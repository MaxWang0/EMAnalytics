Customer = new Mongo.Collection('Customer');

Customer.attachSchema(
    new SimpleSchema({
        username: {
            type: String
        },
        password: {
            type: String
        },
        email: {
            type: String
        },
        creationDate: {
            type: Date
        },
        modifiedDate: {
            type: Date
        },
        scale: {
            type: String
        },
        firstname: {
            type: String,
            optional: true
        },
        lastname: {
            type: String,
            optional: true
        },
        streetAddress: {
            type: String,
            optional: true
        },
        city: {
            type: String,
            optional: true
        },
        state: {
            type: String,
            optional: true
        },
        zipcode: {
            type: String,
            optional: true
        },
        phone: {
            type: String,
            optional: true
        }
    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    Customer.allow({
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
