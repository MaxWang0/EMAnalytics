Api.addRoute('web/house/retrieve', {authRequired: false}, {
    post: function() {
        var request  = this.request;
        var response = this.response;

        var username = request.body.username;
        var session  = request.body.session;

        var checkSession = Registration.findOne({
            username: username,
            session: session
        });
        // if (checkSession) {
        if (true) {
            var houseList = [];
            House.find({
                username: 'quang'
            }).forEach(function(newHouse) {
                // console.log(newHouse.houseId);
                var house = {};
                house.creationDate = newHouse.creationDate;
                house.username = newHouse.username;
                house.name = newHouse.name;
                house.houseId = newHouse.houseId;
                house.modifiedDate = newHouse.modifiedDate;
                // house.extras = {
                house.streetAddress = newHouse.streetAddress;
                house.timezone      = newHouse.timezone;
                house.zipcode       = newHouse.zipcode;
                house.state         = newHouse.state;
                house.city          = newHouse.city;
                // };

                var thermostatList = [];
                // Get Thermostat List belongs to this house
                Thermostat.find({
                    houseId: newHouse.houseId
                }).forEach(function(newThermostat) {
                    var thermostat = {};
                    for (var i in newThermostat)
                        if (newThermostat.hasOwnProperty(i) &&
                            i != "_id") {
                            thermostat[i] = newThermostat[i];
                        }
                    thermostat.latestRegistrationDate =
                        newThermostat.registrationDate;
                    thermostatList.push(thermostat);
                });

                // Assign the thermostat list to house object
                house.thermostats = thermostatList;

                // Push to the list
                houseList.push(house);
                // db.booksReloaded
            });

            var body = {
                responseCode: ResponseCodes.SUCCESS,
                session: session,
                username: username,
                houses: houseList
            };
            return {
              statusCode: 200,
              body: body
            };
        } else {
            var body = {
                responseCode: ResponseCodes.INVALID_FORMAT,
                session: session,
                username: username
            };
            return {
              statusCode: 200,
              body: body
            };
        }
    }
});
// Router.route('api/mobile/home', {
//         where: 'server'
//     })
//     // Handler the POST request
//     .post(function() {

//
//     });
