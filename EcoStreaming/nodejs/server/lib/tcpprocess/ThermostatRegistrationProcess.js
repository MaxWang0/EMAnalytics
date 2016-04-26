ThermostatRegistrationProcess = {
    /**
     * execute the process
     */
    execute: function(jsonData) {
        if (this.isValidFormat(jsonData)) {
            var userAuth = Registration.findOne({
                username: jsonData.username
            });

            // generate new device session
            var session = ShortId.generate();

            // Check if the user session is matched
            if (userAuth.session === jsonData.appSession) {

                // Add the newly generated device session to DeviceSession
                SessionServices.addDeviceSession(
                    jsonData.username,
                    jsonData.macAddress,
                    session
                );

                // Add Thermostat Data
                var result = ThermostatServices.upsertThermostat(
                    jsonData
                );

                if (result.error) {
                    //error!
                    console.log(error);
                    this.sendErrorMessage(ResponseCodes.INVALID_CREDENTIAL, jsonData);
                } else {
                    // Send the confirmed message
                    this.sendConfirmedMessage(
                        session,
                        jsonData.macAddress
                    );

                    // Send the retrieval request to thermostat
                    ThermostatRetrievalProcess.sendRetrievalRequest(
                        jsonData.username,
                        session,
                        jsonData.macAddress
                    );
                }
            } else {
                this.sendErrorMessage(ResponseCodes.INVALID_SESSION, jsonData);
            }
        } else {
            // Invalid Message Format
            this.sendErrorMessage(ResponseCodes.INVALID_FORMAT, jsonData);
        }
    },

    /**
     *	Function to send Registration Confirmed Message
     */
    sendConfirmedMessage: function(deviceSession, macAddress) {
        // Insert successful, then send a confirm message to device
        var msg = TcpMessageUtils.getMessage({
            responseCode: ResponseCodes.SUCCESS,
            requestCode: RequestCodes.REGISTRATION_CODE,
            session: deviceSession,
            macAddress: macAddress
        });

        ConnectionPool.find(macAddress).write(msg);
    },

    sendErrorMessage: function(errCode, jsonData) {
        var msg = TcpMessageUtils.getMessage({
            responseCode: errCode,
            requestCode: jsonData.requestCode,
            macAddress: jsonData.macAddress
        });

        ConnectionPool.find(jsonData.macAddress).write(msg);
    },

    /**
     *
     */
    isValidFormat: function(jsonData) {
        return (
            jsonData.hasOwnProperty('password') && jsonData.password &&
            jsonData.hasOwnProperty('appSession') && jsonData.appSession &&
            jsonData.hasOwnProperty('username') && jsonData.username &&
            jsonData.hasOwnProperty('macAddress') && jsonData.macAddress
        );
    }

};
