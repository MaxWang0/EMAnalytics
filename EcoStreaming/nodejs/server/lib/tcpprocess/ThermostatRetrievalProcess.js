ThermostatRetrievalProcess = {
    execute: function(jsonData) {
        var result = ThermostatServices.updateThermostat(
            jsonData.macAddress,
            jsonData
        );
        if (result.error) {
            console.log(result.error);
        } else {
            // send thermostat retrieval response message
            this.sendRetrievalReponseMessage(//jsonData.username,
                jsonData.macAddress);
        }
    },

    /*
     * Send Thermostat Function
     */

    sendRetrievalReponseMessage: function(macAddress) {
        var msg = TcpMessageUtils.getMessage({
            responseCode: ResponseCodes.SUCCESS,
            requestCode: RequestCodes.THERMOSTAT_RETRIEVAL_CODE,
            // username: username,
            macAddress: macAddress
        });

        ConnectionPool.find(macAddress).write(msg);
    },

    /**
     * 	Function to send Thermostat retrieval request
     */
    sendRetrievalRequest: function(username, deviceSession, macAddress) {
        var msg = TcpMessageUtils.getMessage({
            username: username,
            requestCode: RequestCodes.THERMOSTAT_RETRIEVAL_CODE,
            session: deviceSession,
            macAddress: macAddress
        });

        ConnectionPool.find(macAddress).write(msg);
    }

};
