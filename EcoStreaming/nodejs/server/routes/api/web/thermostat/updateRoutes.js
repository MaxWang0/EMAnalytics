Api.addRoute('web/thermostat/update', {authRequired: false}, {
    post: function() {
        var request      = this.request;
        var response     = this.response;

        var username     = request.body.username;
        var session      = request.body.session;
        var macAddress   = request.body.thermostat.macAddress;

        var modifiedDate = request.body.modifiedDate;
        var extras       = request.body.thermostat; //JSON.parse(request.body.extras);
        var message      = {
            requestCode : RequestCodes.THERMOSTAT_UPDATE_CODE,
            username    : username,
            session     : session,
            macAddress  : macAddress,
            modifiedDate: modifiedDate,
            extras      : extras
        };

        var body = "";

        // var checkSession = Registration.findOne({
        //     username: username,
        //     session: session
        // });
        var checkSession = true;
        if (checkSession) {

            console.log(TcpMessageUtils.getMessage(message));
            // Send TCP Message to the Corresponding Device
            var result = ConnectionPool.send(macAddress, TcpMessageUtils.getMessage(message));
            // If Success
            if (result) {
                // Create modified Object
                var modifiedObj = {};
                for (var i in extras)
                    if (extras.hasOwnProperty(i) && i !== 'registrationDate' && i!=='latestRegistrationDate') {
                        modifiedObj[i] = extras[i];
                    }
                try {
                    Thermostat.update({
                        macAddress: macAddress
                    }, {
                        $set: modifiedObj
                    });
                }
                catch (err) {
                    console.log(err);
                    body = JSON.stringify({
                        responseCode: ResponseCodes.INVALID_FORMAT,
                        session     : session,
                        macAddress  : macAddress
                    });
                    return {
                      statusCode: 200,
                      body: body
                    };
                }
                body = {
                    responseCode: ResponseCodes.SUCCESS,
                    session     : session,
                    macAddress  : macAddress
                };
                return {
                  statusCode: 200,
                  body: body
                };
            } else {
                // Thermostat not connected, don't do anything
                body = {
                    responseCode: ResponseCodes.INVALID_SESSION,
                    session: session,
                    macAddress: macAddress
                };
                return {
                  statusCode: 200,
                  body: body
                };
            }
        } else { // Session not valid
            body = {
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
