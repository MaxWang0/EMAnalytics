SessionServices = {
    /**
     * Add device session - Sessions between device and server
     */
    addDeviceSession: function(username, macAddress, session) {
        var result = "";

        // Check if  is existed
        var existingSession = DeviceSession.findOne({
            username: username,
            macAddress: macAddress,
            session: session
        });
        if (existingSession === undefined || !existingSession) {
            try {
                result = DeviceSession.insert({
                    username: username,
                    macAddress: macAddress,
                    session: session,
                    creationDate: new Date(),
                });
            } catch (err) {
                return {
                    error: ResponseCodes.SYSTEM_ERROR,
                    result: result
                };
            }
        } else { // Update Session
            try {
                result = DeviceSession.update({
                    username: username,
                    macAddress: macAddress
                }, {
                    $set: {
                        session: session,
                        creationDate: new Date()
                    }
                });
            } catch (err) {
                return {
                    error: ResponseCodes.SYSTEM_ERROR,
                    result: result
                };
            }
        }
        return {
            error: null,
            result: result
        };
    },

    /**
     * Remove device session - Session between Device and Server
     */
    removeDeviceSession: function(macAddress) {
        var result = "";
        try {
            result = DeviceSession.remove({
                macAddress: macAddress
            });
        } catch (err) {
            return {
                error: ResponseCodes.SYSTEM_ERROR,
                result: result
            };
        }
        return {
            error: null,
            result: result
        };
    },
};
