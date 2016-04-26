/**
 * Connection Pool Collection Definition
 */
var ConnectionPoolCollection = function() {
    var list = {};
    var self = this;

    self.add = function(socket, macAddress) {
        // Add Socket to the list
        list[macAddress] = socket;
        return true;
    };
    self.remove = function(macAddress) {
        // End this
        if (list.hasOwnProperty(macAddress)) {
            list[macAddress].destroy();
            delete list[macAddress];
            return true;
        }
        return false;
    };
    self.find = function(macAddress) {
        if (list.hasOwnProperty(macAddress))
            return list[macAddress];
        return null;
    };
    self.refresh = function() {
        for (var i in list) {
            if (!list[i].remoteAddress || !list[i].remotePort) {
                ThermostatServices.updateThermostatField(i, 'status', Status.INACTIVE);
                SessionServices.removeDeviceSession(i);
                delete list[i];
            }
        }
    };
    self.showInfo = function() {
        console.log("List of all macAddress: ");
        for (var i in list)
            if (list.hasOwnProperty(i))
                console.log(i + "\n");
    };

    self.send = function(macAddress, message) {
        console.log("Sending message to device " + macAddress + "...");
        if (list.hasOwnProperty(macAddress)) {
            list[macAddress].write(message);
            return true;   // Successfully written
        }
        return false; // Unsuccessfully written
    };
};

// Create new ConnectionPool Object
ConnectionPool = new ConnectionPoolCollection();
