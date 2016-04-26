Api.addRoute('web/thermostat/delete', {authRequired: false}, {
    post: function() {
        var req      = this.request;
        var res     = this.response;

        var username     = req.body.username;
        var session      = req.body.session;
        var thermostatId = req.body.thermostatId;
        var password = req.body.password;
        var body = "";
        // var macAddress   = req.body.thermostat.macAddress;
        //
        // var modifiedDate = req.body.modifiedDate;
        // var extras       = req.body.thermostat; //JSON.parse(req.body.extras);
        // var message      = {
        //     reqCode : reqCodes.THERMOSTAT_UPDATE_CODE,
        //     username    : username,
        //     session     : session,
        //     macAddress  : macAddress,
        //     modifiedDate: modifiedDate,
        //     extras      : extras
        // };

        // var checkSession = Registration.findOne({
        //     username: username,
        //     session: session
        // });
        var checkSession = true;
        if (checkSession) {
            // console.log(TcpMessageUtils.getMessage(message));
            // Send TCP Message to the Corresponding Device
            // var result = ConnectionPool.send(macAddress, TcpMessageUtils.getMessage(message));
            // If Success
            // if (result) {
                // Create modified Object
                // var modifiedObj = {};
                // for (var i in extras)
                //     if (extras.hasOwnProperty(i) && i !== 'registrationDate' && i!=='latestRegistrationDate') {
                //         modifiedObj[i] = extras[i];
                //     }
                // // Update Thermostat
                try {
                    Thermostat.remove({
                        thermostatId: thermostatId
                    });
                }
                catch (err) {
                    console.log(err);
                    var body = JSON.stringify({
                        responseCode: ResponseCodes.INVALID_FORMAT,
                        session     : session,
                        username: username//,
                        // macAddress  : macAddress
                    });
                    return {
                      statusCode: 200,
                      body: body
                    };
                }

                body = {
                    responseCode: ResponseCodes.SUCCESS,
                    session     : session,
                    username: username
                    // macAddress  : macAddress
                };
                return {
                  statusCode: 200,
                  body: body
                };

            // } else {
            //     // Thermostat not connected, don't do anything
            //     var body = {
            //         responseCodes: ResponseCodes.INVALID_SESSION,
            //         session: session,
            //         username: username
            //         // macAddress: macAddress
            //     };
            //     return {
            //       statusCode: 200,
            //       body: body
            //     };
            // }
        } else { // Session not valid
            body = {
                responseCode: ResponseCodes.INVALID_SESSION,
                session: session,
                username: username
                // macAddress: macAddress
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
//     // Handler the POST req
//     .post(function() {

//
//     });
