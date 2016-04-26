Api.addRoute('mobile/customer/logout', {authRequired: false}, {
    post: function() {
        var request          = this.request;
        var response         = this.response;

        var username         = request.body.username;
        var session          = request.body.session;
        var logoutAllDevices = request.body.logoutAllDevices;

        var checkSession = Registration.findOne({
            username: username,
            session: session
        });
        if (checkSession) {
            var body = {
                responseCode: ResponseCodes.SUCCESS,
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
// Router.route('api/mobile/customer/logout', {
//         where: 'server'
//     })
//     // Handler the POST request
//     .post(function() {

//     });
