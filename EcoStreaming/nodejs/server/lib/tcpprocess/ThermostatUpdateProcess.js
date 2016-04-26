ThermostatUpdateProcess = {
    /**
     * execute the process
     */
    execute: function(jsonData) {
        if (this.isValidFormat(jsonData)) {
            if (ThermostatServices.isValidSession(jsonData.macAddress, jsonData.session)) {
                var result = ThermostatServices.updateThermostat(
                    jsonData.macAddress,
                    jsonData.extras
                );
                if (result.error) {
                    //error!
                    console.log(error);
                    this.sendErrorMessage(error, jsonData);
                } else {
                    // Do not do anything
                    this.sendConfirmedMessage(
                        jsonData.session,
                        jsonData.macAddress
                    );

                    // Broadcast the error messages to multiple devices
                    GcmUtils.sendMessage(jsonData.macAddress);
                }
            } else {
                // print Error
                console.log('Invalid Session');
                this.sendErrorMessage(ResponseCodes.INVALID_SESSION, jsonData);
            }
        } else {
            // print Error
            console.log('Invalid Format');
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
            requestCode: RequestCodes.THERMOSTAT_UPDATE_CODE,
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
            jsonData.hasOwnProperty('extras') && jsonData.extras &&
            jsonData.hasOwnProperty('modifiedDate') && jsonData.modifiedDate
        );
    }
};
