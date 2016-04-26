ThermostatLoginProcess = {
    execute: function(jsonData) {
        var customer = Customer.findOne({
            username: jsonData.username
        });

        // Generate new device session
        var session = ShortId.generate();

        // Check if the customer credentials are matched
        if (customer.password === jsonData.password) {
            // Add this device session to the database
            var result = SessionServices.addDeviceSession(
                jsonData.username,
                jsonData.macAddress,
                session
                // jsonData.session
            );
            if (result.error) {
                console.log("ERROR: " + result.error);
            } else {
                // Update status
                ThermostatServices.updateThermostatField(
                    jsonData.macAddress,
                    'status',
                    Status.ACTIVE
                );

                // Send the response message
                this.sendLoginReponseMessage(
                    jsonData.username,
                    jsonData.macAddress
                );
                // GcmUtils.sendMessage(jsonData);
            }
        } else {
            // this.sendLoginReponseMessage
            // Invalid Credentials
            // To-do: Send error message to device
        }
    },

    /*
     * Send Thermostat Login Confirmation
     */

    sendLoginReponseMessage: function(username, macAddress) {
        var msg = TcpMessageUtils.getMessage({
            responseCode: ResponseCodes.SUCCESS,
            requestCode : RequestCodes.LOGIN_CODE,
            username    : username,
            macAddress  : macAddress
        });

        ConnectionPool.find(macAddress).write(msg);
    }
};
