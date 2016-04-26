GcmUtils = {
    /**
     * Remove device session
     */
    updateSessionID: function(gcmId, username, session) {
        var result = "";
        var error = "";
        try {
            result = Registration.update({
                gcmId: gcmId
            }, {
                $set: {
                    session: session,
                    username: username
                }
            });
        } catch (err) {
            error = err;
        }
        return {
            error: error,
            result: result
        };
    },

    /**
     * Send Update Messages to GCM
     */
    sendMessage: function(macAddress) {
        var gcm = Npm.require('node-gcm');
        var thermostat = Thermostat.findOne({macAddress: macAddress});
        console.log("MAC Address of the thermostat is " + thermostat.macAddress);
        var house = House.findOne({houseId: thermostat.houseId});
        console.log("House ID of the house is " + house.houseId);
        var username = house.username;

        var checkSession = Registration.findOne({
            username: username
        });
        console.log("THE SESSION CHECK IS " + checkSession + " " + username);
        if (checkSession) {
            // var thermostat = Thermostat.findOne({macAddress: macAddress});
            var messageData = {
                username    : username,
                session     : checkSession.session,
                macAddress  : thermostat.macAddress,
                modifiedDate: thermostat.modifiedDate,
                extras      : {
                    status          : thermostat.status,
                    name            : thermostat.name,
                    roomTemperature : thermostat.roomTemperature,
                    roomHumidity    : thermostat.roomHumidity,
                    coolTemperature : thermostat.coolTemperature,
                    heatTemperature : thermostat.heatTemperature,
                    cycleTemperature: thermostat.cycleTemperature,
                    fanMode         : thermostat.fanMode,
                    systemMode      : thermostat.systemMode,
                    controlMode     : thermostat.controlMode,
                    running         : thermostat.running
                }
            };
            console.log("Msg sent to the mobile..." + messageData);
            /* Constructing the message */
            var message = new gcm.Message({
                action: "THERMOSTAT_UPDATE",
                data: messageData
            });

            // Construct the array of tokens
            var regTokens = Registration.find({
                username: username
            }).fetch();
            var regTokensArray = [];
            regTokensArray.push(regTokens[0].gcmId);
            console.log("GCM ID is " + regTokens[0].gcmId);
            var sender = new gcm.Sender('AIzaSyBQhE1q0GJLZA1z3bTONnsbgZ_GhVr5HD0');

            // Now the sender can be used to send messages
            sender.send(message, {
                registrationTokens: regTokensArray
            }, function(err, response) {
                if(err) console.error(err);
                else    console.log(response);
            });
        } else {
            // No User Login
            console.log("No user found");
        }
    }

};
