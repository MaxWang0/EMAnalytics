var net = Npm.require('net');

Meteor.startup(function() {
    var port = TcpConfigs.TCP_PORT;

    // Create new TCP server
    var server = net.createServer(Meteor.bindEnvironment(
        function(socket) {

            // Socket Timeout Listener
            socket.setTimeout(TcpConfigs.TCP_TIMEOUT,
                function() {
                    console.log(
                        "Connection to the remote address: " +
                        socket.remoteAddress + ":" +
                        socket.remotePort + " timeout!"
                    );
                    socket.destroy();
                });

            // Socket Close Event
            socket.addListener("close", Meteor.bindEnvironment(
                function(err) {
                    ConnectionPool.refresh();
                    ConnectionPool.showInfo();
                }));

            // Data Listener
            socket.addListener("data", Meteor.bindEnvironment(
                function(data) {
                    // Process Data
                    console.log("DATA = " + data);

                    // console.log();
                    tempData = data .toString()
                                    .substring(1, data.length - 1);

                    var jsonData = JSON.parse(tempData);
                    ConnectionPool.add(socket, jsonData.macAddress);

                    //process the message
                    processMessage(jsonData);
                    ConnectionPool.showInfo();
                }));
        }))
        .listen(port);
});

/**
 * Process the message
 */
function processMessage(jsonData) {
    if (jsonData.hasOwnProperty("responseCode")) {
        // Process the Response Message
        processResponse(jsonData);
    } else {
        // Process the request Message
        processRequest(jsonData);
    }
}

var processResponse = function(jsonData) {
    switch (jsonData.requestCode) {
        // Retrieval Response
        case RequestCodes.THERMOSTAT_RETRIEVAL_CODE:
            ThermostatRetrievalProcess.execute(jsonData);
            break;
    }
};

var processRequest = function(jsonData) {
    switch (jsonData.requestCode) {
        // Registration Request
        case RequestCodes.REGISTRATION_CODE:
            ThermostatRegistrationProcess.execute(jsonData);
            break;
        // Update Request
        case RequestCodes.THERMOSTAT_UPDATE_CODE:
            ThermostatUpdateProcess.execute(jsonData);
            break;
        // Login Request
        case RequestCodes.LOGIN_CODE:
            ThermostatLoginProcess.execute(jsonData);
            break;
    }
};
