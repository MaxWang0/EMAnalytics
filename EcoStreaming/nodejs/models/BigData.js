BigData = new Mongo.Collection('BigData');

BigData.attachSchema(
    new SimpleSchema({
        settlementpoint: {
            type: String,
            optional: true
        },
        settlementpointtype: {
            type: String,
            optional: true
        },
        intend: {
            type: String,
            optional: true
        },
        intervalrepeatedhourflag: {
            type: String,
            optional: true
        },
        lmp5: {
            type: Number,
            decimal: true,
            optional: true
        },
        lmp10: {
            type: Number,
            decimal: true,
            optional: true
        },
        lmp15: {
            type: Number,
            decimal: true,
            optional: true
        },
        lmp20: {
            type: String,
            decimal: true,
            optional: true
        },
        lmp25: {
            type: String,
            decimal: true,
            optional: true
        },
        lmp30: {
            type: String,
            decimal: true,
            optional: true
        },
        lmp35: {
            type: String,
            decimal: true,
            optional: true
        },
        lmp40: {
            type: String,
            decimal: true,
            optional: true
        },
        lmp45: {
            type: String,
            decimal: true,
            optional: true
        },
        lmp50: {
            type: String,
            decimal: true,
            optional: true
        },
        lmp55: {
            type: String,
            decimal: true,
            optional: true
        }

    })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
    BigData.allow({
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
