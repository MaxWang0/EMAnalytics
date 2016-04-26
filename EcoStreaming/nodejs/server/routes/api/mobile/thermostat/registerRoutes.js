// // Maps to: /api/articles/:id
// Api.addRoute('mobile/thermostat/register', {authRequired: false}, {
//     // get: function () {
//     //   return Articles.findOne(this.urlParams.id);
//     // },
//     post: function() {
//         var request         = this.request;
//         var response        = this.response;
//         // Get the variables
//         var username        = request.body.username;
//         var registrationKey = request.body.registrationKey;
//         var session         = request.body.session;
//         var macAddress      = request.body.macAddress;
//
//         if (!registrationKey) {
//             // Writing Error Message
//         }
//         if (!username) {
//             // Writing Error Message
//         }
//         if (!session) {
//             // Writing Error Message
//         }
//
//         // Save the registration key to the db
//         var result = RegistrationKey.insert({
//             username       : username,
//             registrationKey: registrationKey,
//             session        : session,
//             macAddress     : macAddress,
//             creationDate   : new Date()
//         });
//         if (result.error) {
//             console.log(result.error);
//         } else {
//             // console.log(result.result);
//             var body = {
//                 responseCode: ResponseCodes.SUCCESS,
//                 username: username,
//                 session: session,
//                 macAddress: macAddress
//             };
//             console.log(body);
//             return {
//               statusCode: 200,
//               body: body
//             };
//             // response.statusCode = 200;
//             // response.end(body);
//         }
//
//         return {
//           statusCode: 404,
//           body: {status: 'fail', message: 'Registration Key not found'}
//         };
//     }
// });
