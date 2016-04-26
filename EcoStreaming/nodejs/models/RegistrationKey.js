// RegistrationKey = new Mongo.Collection('RegistrationKey');
//
// RegistrationKey.attachSchema(
//     new SimpleSchema({
//         registrationKey: {
//             type: String
//         },
//         username: {
//             type: String
//         },
//         session: {
//             type: String
//         },
//         macAddress: {
//             type: String
//         },
//         creationDate: {
//             type: Date,
//             denyUpdate: true
//         }
//     })
// );
//
// // Collection2 already does schema checking
// // Add custom permission rules if needed
// if (Meteor.isServer) {
//     RegistrationKey.allow({
//         insert: function() {
//             return true;
//         },
//         update: function() {
//             return true;
//         },
//         remove: function() {
//             return true;
//         }
//     });
// }
