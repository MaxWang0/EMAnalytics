Api.addRoute('web/customer/retrieve', {authRequired: false}, {
    post: function() {
        var request  = this.request;
        var response = this.response;

        var username = request.body.username;
        var session  = request.body.session;

        // var checkSession = Registration.findOne({
        //     username: username,
        //     session: session
        // });
        // if (checkSession) {
        if (true) {

            var customer = Customer.findOne({
                username: username
            });

            var body = {
                responseCode : ResponseCodes.SUCCESS,
                session      : session,
                username     : username,
                email        : customer.email,
                scale        : customer.scale,
                creationDate : customer.creationDate,
                modifiedDate : customer.modifiedDate,
                firstName    : customer.firstname,
                lastName     : customer.lastname,
                streetAddress: customer.streetAddress,
                city         : customer.city,
                state        : customer.state,
                zipcode      : customer.zipcode,
                phone        : customer.phone
                // houses: houseList
            };
            return {
              statusCode: 200,
              body: body
            };
        } else {
            var body = {
                responseCode: ResponseCodes.INVALID_FORMAT,
                session: session,
                username: username
            };
            return {
              statusCode: 200,
              body: body
            };
        }
    }
});
// Router.route('api/mobile/home', {
//         where: 'server'
//     })
//     // Handler the POST request
//     .post(function() {

//
//     });
