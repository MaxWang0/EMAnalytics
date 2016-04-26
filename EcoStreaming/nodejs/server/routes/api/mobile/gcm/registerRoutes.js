// Router.route('api/mobile/gcm', {
//         where: 'server'
//     })
//     // Handler the POST request
//     .post(function() {
//         //this.render('/api/mobile/thermostat/register');
//         var request = this.request;
//         var response = this.response;
//
//         // Get the variables
//         // var username 		= request.body.username;
//         var gcmId = request.body.gcmId;
//         console.log(gcmId);
//         // var session 		= request.body.session;
//         // var macAddress 		= request.body.macAddress;
//
//         if (!gcmId) {
//             // Writing Error Message
//         }
//         // if (!username) {
//         // 	// Writing Error Message
//         // }
//         // if (!session) {
//         // 	// Writing Error Message
//         // }
//
//         // Save the registration key to the db
//         Registration.insert({
//             // username: username,
//             gcmId: gcmId
//         }, function(err, result) {
//             if (err) {
//                 console.log(err.message);
//             } else {
//                 console.log(result);
//                 var body = JSON.stringify({
//                     responseCode: ResponseCodes.SUCCESS,
//                     gmcId       : gcmId
//                 });
//                 response.statusCode = 200;
//                 response.end(body);
//             }
//         });
//
//     });
