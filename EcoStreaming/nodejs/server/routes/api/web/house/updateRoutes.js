Api.addRoute('web/house/update', {authRequired: false}, {
    post: function() {
        var request      = this.request;
        var response     = this.response;

        var username     = request.body.username;
        var session      = request.body.session;
        var houseId      = request.body.house.houseId;
        var body = "";
        // var modifiedDate = request.body.house.modifiedDate;
        // var city = request.body.city;
        // var state = request.body.state;
        // var zipcode = request.
        var extras       = request.body.house; //JSON.parse(request.body.extras);

        // var checkSession = Registration.findOne({
        //     username: username,
        //     session: session
        // });
        // if (checkSession) {
        if (true) {
            var modifiedObj = {};
            for (var i in extras) {
                if (extras.hasOwnProperty(i) && i !== 'creationDate') {
                    modifiedObj[i] = extras[i];
                }
            }

            try {
                // Update house
                var queryResult = House.update({
                    houseId: houseId
                }, {
                    $set: modifiedObj
                });
            }
            catch (err) {
                console.log(err);
                body = {
                    responseCode: ResponseCodes.INVALID_FORMAT,
                    session: session,
                    houseId: houseId
                };
                return {
                  statusCode: 200,
                  body: body
                };
            }
            body = {
                responseCode: ResponseCodes.SUCCESS,
                session: session,
                houseId: houseId
            };
            return {
              statusCode: 200,
              body: body
            };

        } else { // Session not valid
            body = {
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
// Router.route('/api/mobile/house/update', {
//         where: 'server'
//     })
//     // Handler the POST request
//     .post(function() {

//
//     });
