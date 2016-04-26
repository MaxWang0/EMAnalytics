Api.addRoute('mobile/house/delete', {authRequired: false}, {
    post: function() {
        // this.render('/api/mobile/house/create');
        var request  = this.request;
        var response = this.response;

        var username = request.body.username;
        var password = request.body.password;
        var session  = request.body.session;
        var houseId  = request.body.houseId;

        var checkSession = Registration.findOne({
            username: username,
            session: session
        });
        var customer = Customer.findOne({
            username: username
        });
        if (checkSession && password != customer.password) {

            // Remove house
            var result = House.remove({
                hosueId: house.houseId
            });
                if (result.error) {
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
                    console.log(result);
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
// Router.route('/api/mobile/house/delete', {
//         where: 'server'
//     })
//     // Handler the POST request
//     .post(function() {
        // this.render('/api/mobile/house/create');
//
//     });
