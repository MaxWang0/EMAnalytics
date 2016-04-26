Timeindex = new Mongo.Collection('timeindex');

Timeindex.attachSchema(
    new SimpleSchema({
        DT: {
            type: String,
            optional: true
        }

    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    spindex.allow({
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
