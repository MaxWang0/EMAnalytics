Api.addRoute('mobile/house/update', {authRequired: false}, {
    post: function() {
        var request      = this.request;
        var response     = this.response;

        var username     = request.body.username;
        var session      = request.body.session;
        var houseId      = request.body.houseId;

        var modifiedDate = request.body.modifiedDate;
        var extras       = JSON.parse(request.body.extras);

        var checkSession = Registration.findOne({
            username: username,
            session: session
        });
        if (checkSession) {
            var modifiedObj = {};
            for (var i in extras)
                if (extras.hasOwnProperty(i)) {
                    modifiedObj[i] = extras[i];
                }

            // Insert house
            var queryResult = House.update({
                houseId: houseId
            }, {
                $set: modifiedObj
            });
            if (queryResult.error) {
                console.log(err.message);
                var body = {
                    responseCode: ResponseCodes.INVALID_FORMAT,
                    session: session,
                    houseId: houseId
                };
                return {
                  statusCode: 200,
                  body: body
                };
            } else {
                // console.log(result);
                var body = {
                    responseCode: ResponseCodes.SUCCESS,
                    session: session,
                    houseId: houseId
                };
                return {
                  statusCode: 200,
                  body: body
                };
            }
        } else { // Session not valid
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
// Router.route('/api/mobile/house/update', {
//         where: 'server'
//     })
//     // Handler the POST request
//     .post(function() {

//
//     });
