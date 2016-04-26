Api.addRoute('mobile/thermostat/update', {authRequired: false}, {
    post: function() {
        var request      = this.request;
        var response     = this.response;

        var username     = request.body.username;
        var session      = request.body.session;
        var macAddress   = request.body.macAddress;

        var modifiedDate = request.body.modifiedDate;
        var extras       = JSON.parse(request.body.extras);
        var message      = {
            requestCode : RequestCodes.THERMOSTAT_UPDATE_CODE,
            username    : username,
            session     : session,
            macAddress  : macAddress,
            modifiedDate: modifiedDate,
            extras      : extras
        };

        var checkSession = Registration.findOne({
            username: username,
            session: session
        });
        if (checkSession) {
            // Send TCP Message to the Corresponding Device
            var result = ConnectionPool.send(macAddress, TcpMessageUtils.getMessage(message));
            // If Success
            if (result) {
                // Create modified Object
                var modifiedObj = {};
                for (var i in extras)
                    if (extras.hasOwnProperty(i)) {
                        modifiedObj[i] = extras[i];
                    }
                // Update Thermostat
                var queryResult = Thermostat.update({
                    macAddress: macAddress
                }, {
                    $set: modifiedObj
                });

                // If Error happens
                if (queryResult.error) {
                    console.log(queryResult.error);
                    var body = JSON.stringify({
                        responseCode: ResponseCodes.INVALID_FORMAT,
                        session     : session,
                        macAddress  : macAddress
                    });
                    return {
                      statusCode: 200,
                      body: body
                    };
                } else {
                    // console.log(queryResult);
                    var body = {
                        responseCode: ResponseCodes.SUCCESS,
                        session     : session,
                        macAddress  : macAddress
                    };
                    return {
                      statusCode: 200,
                      body: body
                    };
                }

            } else {
                // Thermostat not connected, don't do anything
            }
        } else { // Session not valid
            var body = {
                responseCode: ResponseCodes.INVALID_SESSION,
                session: session,
                macAddress: macAddress
            };
            return {
              statusCode: 200,
              body: body
            };
        }
    }
});
// Router.route('/api/mobile/thermostat/update', {
//         where: 'server'
//     })
//     // Handler the POST request
//     .post(function() {

//
//     });
