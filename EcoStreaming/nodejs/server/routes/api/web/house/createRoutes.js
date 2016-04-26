Api.addRoute('web/house/create', {authRequired: false}, {
    post: function() {
        var request 	         = this.request;
        var response 	         = this.response;

        var username 		     = request.body.username;
        var session 		     = request.body.session;
        var houseId 		     = ShortId.generate();
        var name 				 = request.body.house.name;
        // var creationDate         = request.body.creationDate;
        // var modifiedDate         = request.body.modifiedDate;
        var extras               = request.body.house;

        // var checkSession = Registration.findOne({
        //     username: username,
        //     session: session
        // });

        // if (checkSession) {
        if (true) {
            var house          = {};
            house.username     = username;
            house.houseId      = houseId;
            house.name         = name;
            house.creationDate = new Date();
            house.modifiedDate = new Date();

            if (extras.hasOwnProperty('streetAddress')) {
                house.streetAddress = extras.streetAddress;
            }
            if (extras.hasOwnProperty('city')) {
                house.city = extras.city;
            }
            if (extras.hasOwnProperty('state')) {
                house.state = extras.state;
            }
            if (extras.hasOwnProperty('zipcode')) {
                house.zipcode = extras.zipcode;
            }
            if (extras.hasOwnProperty('timezone')) {
                house.timezone = extras.timezone;
            }

            try {
                // Insert house
                var queryResult = House.insert({
                    username     : house.username,
                    houseId      : house.houseId,
                    name         : house.name,
                    creationDate : house.creationDate,
                    modifiedDate : house.modifiedDate,
                    streetAddress: house.streetAddress,
                    city         : house.city,
                    state        : house.state,
                    zipcode      : house.zipcode,
                    timezone     : house.timezone
                });
            }
            catch (err) {
                var body = {
                    responseCode: ResponseCodes.INVALID_FORMAT,
                    session     : session,
                    houseId     : houseId
                };
                return {
                  statusCode: 200,
                  body: body
                };
            }

            // console.log(queryResult);
            var body = {
                responseCode: ResponseCodes.SUCCESS,
                username: username,
                session     : session,
                house     : house
            };
            return {
              statusCode: 200,
              body: body
            };

        } else {  // Session not valid
            var body = {
                responseCode: ResponseCodes.INVALID_SESSION,
                session: session,
                houseId: houseId
            };
            return {
              statusCode: 200,
              body: body
            };
        }
    }
});
// Router.route('/api/mobile/house/create',{
//     where: 'server'
//     })
// 	// Handler the POST request
// 	.post(function () {

//
//   });
