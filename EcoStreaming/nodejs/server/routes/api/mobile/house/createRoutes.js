Api.addRoute('mobile/house/create', {authRequired: false}, {
    post: function() {
        var request 	         = this.request;
        var response 	         = this.response;

        var username 		     = request.body.username;
        var session 		     = request.body.session;
        var houseId 		     = request.body.houseId;
        var name 				 = request.body.name;
        var creationDate         = request.body.creationDate;
        var modifiedDate         = request.body.modifiedDate;
        var extras               = request.body.extras;

        var checkSession = Registration.findOne({
            username: username,
            session: session
        });

        if (checkSession) {
            var house          = {};
            house.username     = username;
            house.houseId      = houseId;
            house.name         = name;
            house.creationDate = new Date(creationDate);
            house.modifiedDate = new Date(modifiedDate);

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
                if (queryResult.error) {
                    console.log(err.message);
                    var body = {
                        responseCode: ResponseCodes.INVALID_FORMAT,
                        session     : session,
                        houseId     : houseId
                    };
                    response.statusCode = 200;
                    response.end(body);
                } else {
                    // console.log(result);
                    var body = {
                        responseCode: ResponseCodes.SUCCESS,
                        session     : session,
                        houseId     : houseId
                    };
                    response.statusCode = 200;
                    response.end(body);
                }

        } else {  // Session not valid
            var body = {
                responseCode: ResponseCodes.INVALID_SESSION,
                session: session,
                houseId: houseId
            };
            response.statusCode = 200;
            response.end(body);
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
