ThermostatServices = {
        /**
         * Upsert Thermostat
         */
        upsertThermostat: function(jsonData) {
            var macAddress   = jsonData.macAddress;
            var username     = jsonData.username;
            var thermostatId = ThermostatUtils.getRandomIDs();

            // Check if thermostat is existed
            var isExisted = Thermostat.findOne({
                macAddress: macAddress
            });
            // var error = "";
            var result = "";

            if (isExisted === undefined || !isExisted) {
                // Insert thermostat data
                try {
                    result = Thermostat.insert({
                        thermostatId    : thermostatId,
                        macAddress      : jsonData.macAddress,
                        registrationDate: new Date(),
                        modifiedDate    : new Date(),
                        name            : jsonData.macAddress,
                        status          : jsonData.status,
                        houseId         : jsonData.houseId
                    });
                } catch (err) {
                    return {
                        error: ResponseCodes.SYSTEM_ERROR,
                        result: result
                    };
                }
            } // End if
            else {
                try {
                    result = Thermostat.update({
                        macAddress: jsonData.macAddress
                    }, {
                        $set: {
                            registrationDate: new Date(),
                            modifiedDate: new Date()
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
         * Update Thermostat
         */
        updateThermostat: function(macAddress, jsonData) {
            var result = "";

            // Check if thermostat is existed
            var existingThermostat = Thermostat.findOne({
                macAddress: macAddress
            });

            if (existingThermostat === undefined || !existingThermostat) {
                //return false;
            } else { // Update Thermostat
                try {
                    result = Thermostat.update({
                        macAddress: macAddress
                    }, {
                        $set: {
                            status          : jsonData.status,
                            name            : jsonData.name,
                            version         : jsonData.version,
                            running         : jsonData.running,
                            roomTemperature : jsonData.roomTemperature,
                            roomHumidity    : jsonData.roomHumidity,
                            heatTemperature : jsonData.heatTemperature,
                            coolTemperature : jsonData.coolTemperature,
                            cycleTemperature: jsonData.cycleTemperature,
                            fanMode         : jsonData.fanMode,
                            systemMode      : jsonData.systemMode,
                            controlMode     : jsonData.controlMode
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

        updateThermostatField: function(macAddress, field, value) {
            var result = "";
            var modifierObj = {};

            // Add the value to the field
            modifierObj[field] = value;

            // Execute the update query
            try {
                result = Thermostat.update({
                    macAddress: macAddress
                }, {
                    $set: modifierObj
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

        isValidSession: function(macAddress, session) {
            var result = DeviceSession.findOne({
                macAddress     : macAddress
            });
            return (result.session === session);
        }
    }; // End thermostat Service
