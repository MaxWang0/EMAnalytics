Api.addRoute('web/customer/login', {authRequired: false}, {
    post: function() {
        var request  = this.request;
        var response = this.response;

        var username = request.body.username;
        var password = request.body.password;
        // var gcmId    = request.body.gcmId;
        // console.log(request.body);
        console.log(username + " " + password);

        // if (!gcmId) {
        //     // Writing Error Message
        // }

        var extras = {};
        var session = SessionUtils.generateRandom();
        var customerList = Customer.find({
            username: username,
            password: password
        }).fetch();

        var customer = customerList[0];

        if (customer) {
            // Update Session ID in Registration table
            // GcmUtils.updateSessionID(gcmId, username, session);

            // Save the registration key to the db
            // var queryResult = Registration.update({
            //     gcmId: gcmId
            // }, {
            //     $set: {
            //         username: username,
            //         session: session
            //     }
            // });
            //     if (queryResult.error) {
            //         console.log(err.message);
            //     } else {
            //         console.log("Registration Result: " + result);
            //         var body = {
            //             responseCode: ResponseCodes.SUCCESS,
            //             session     : session,
            //             username    : username,
            //             email       : customer.email,
            //             scale       : customer.scale,
            //             creationDate: customer.creationDate,
            //             modifiedDate: customer.modifiedDate,
            //             extras      : extras
            //         };
            //         return {
            //           statusCode: 200,
            //           body: body
            //         };
            //     }
            var body = {
                responseCode: ResponseCodes.SUCCESS,
                username    : username,
                session     : session
            };
            return {
              statusCode: 200,
              body: body
            };
        } else {
            var body = {
                responseCode: ResponseCodes.INVALID_CREDENTIAL,
                username: username
            };
            return {
              statusCode: 200,
              body: body
            };
        }
    }
});
