// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.controller('HomeController', function($scope, $reactive, $log, $location, $state, $rootScope, CustomerRetrieveFactory, HomeRetrieveFactory, dataService) {
        $reactive(this).attach($scope);
        // console.log($state);
        // $state.go($state.current, {}, {reload: true});
		// Data Retrieval
		$scope.customer = {};
		$scope.houses = [];
		$scope.thermostats = [];
        // Tracker.autorun(function() {
        this.subscribe('houses', () => [localStorage.getItem('username')], {
            onReady: function() {
                var houseCursor = House.find();
                houseCursor.observeChanges({
                    added: function() {
                        console.log("New House Record Added!");
                        $scope.houses = houseCursor.fetch();
                        // console.log($scope.houses);
                        dataService.houses = $scope.houses;
                        dataService.thermostats = $scope.thermostats;
                        $scope.$apply(function(){
                            $rootScope.$emit('DataLoadedEvent', {});
                        });
                        // $state.go($state.current, {}, {reload: true});
                        // $scope.houses =
                    },
                    changed: function() {
                        console.log("New House Record Changed!");
                        $scope.houses = houseCursor.fetch();
                        // console.log($scope.houses);
                        dataService.houses = $scope.houses;
                        dataService.thermostats = $scope.thermostats;
                        $scope.$apply(function(){
                            $rootScope.$emit('DataLoadedEvent', {});
                        });
                        // $state.go($state.current, {}, {reload: true});
                        // $scope.houses =
                    }
                });
                // $scope.houses = houseCursor.fetch();
                // console.log($scope.houses);
                // $rootScope.$emit('DataLoadedEvent', {});
            },
            onStop: function() {
                console.log("STOP!");
            }
        });

        this.subscribe('thermostats', () => [], {
            onReady: function() {
                var thermostatsCursor = Thermostat.find();
                thermostatsCursor.observeChanges({
                    added: function() {
                        console.log("New Thermostat Record Added!");
                        var thermostatList = thermostatsCursor.fetch();
                        // console.log($scope.houses);
                        // $state.go($state.$current, null, { reload: true });
                        // dataService.houses = $scope.houses;
                        $scope.thermostats = [];
                        for (var _iter2 in thermostatList) {
							// Convert temperature values to Celsius if necessary.
							var thermostat = thermostatList[_iter2];
                            if (thermostat.roomTemperature) {
                                if (dataService.scale == 'C') {
                                    thermostat.roomTemperature = fahrenheitToCelsius(thermostat.roomTemperature);
                                    thermostat.coolTemperature = fahrenheitToCelsius(thermostat.coolTemperature);
                                    thermostat.heatTemperature = fahrenheitToCelsius(thermostat.heatTemperature);
                                    thermostat.cycleTemperature = fahrenheitToCelsius(thermostat.cycleTemperature);
                                }
                                $scope.thermostats.push(thermostat);
                            }
						}
                        // console.log($scope.thermostats);
                        dataService.thermostats = $scope.thermostats;
                        $scope.$apply(function(){
                            $rootScope.$emit('DataLoadedEvent', {});
                        });
                    },
                    changed: function() {
                        console.log("New Thermostat Record Changed!");
                        var thermostatList = thermostatsCursor.fetch();
                        // console.log($scope.houses);
                        // $state.go($state.$current, null, { reload: true });
                        // dataService.houses = $scope.houses;
                        $scope.thermostats = [];
                        for (var _iter2 in thermostatList) {
							// Convert temperature values to Celsius if necessary.
							var thermostat = thermostatList[_iter2];
                            if (thermostat.roomTemperature) {
                                if (dataService.scale == 'C') {
    								thermostat.roomTemperature = fahrenheitToCelsius(thermostat.roomTemperature);
    								thermostat.coolTemperature = fahrenheitToCelsius(thermostat.coolTemperature);
    								thermostat.heatTemperature = fahrenheitToCelsius(thermostat.heatTemperature);
    								thermostat.cycleTemperature = fahrenheitToCelsius(thermostat.cycleTemperature);
    							}
    							$scope.thermostats.push(thermostat);
                            }
						}
                        // console.log($scope.thermostats);
                        dataService.thermostats = $scope.thermostats;
                        $scope.$apply(function(){
                            $rootScope.$emit('DataLoadedEvent', {});
                        });
                        // $state.go($state.current, {}, {reload: true});
                        // $scope.houses =
                    },
                    removed: function() {
                        var thermostatList = thermostatsCursor.fetch();
                        // console.log($scope.houses);
                        // $state.go($state.$current, null, { reload: true });
                        // dataService.houses = $scope.houses;
                        $scope.thermostats = [];
                        for (var _iter2 in thermostatList) {
							// Convert temperature values to Celsius if necessary.
							var thermostat = thermostatList[_iter2];
                            if (thermostat.roomTemperature) {
                                if (dataService.scale == 'C') {
    								thermostat.roomTemperature = fahrenheitToCelsius(thermostat.roomTemperature);
    								thermostat.coolTemperature = fahrenheitToCelsius(thermostat.coolTemperature);
    								thermostat.heatTemperature = fahrenheitToCelsius(thermostat.heatTemperature);
    								thermostat.cycleTemperature = fahrenheitToCelsius(thermostat.cycleTemperature);
    							}
    							$scope.thermostats.push(thermostat);
                            }
						}
                        // console.log($scope.thermostats);
                        dataService.thermostats = $scope.thermostats;
                        $scope.$apply(function(){
                            $rootScope.$emit('DataLoadedEvent', {});
                        });
                    }
                });
                var thermostats = thermostatsCursor.fetch();
                // console.log('READY!');
                // console.log(thermostats);
                // $rootScope.$emit('DataLoadedEvent', {});
            },
            onStop: function() {
                console.log("STOP!");
            }
        });
        // });

        $scope.retrieve = function() {
			// waitingDialog.show('Loading ...');
			var customerReq = new CustomerRetrieveFactory({
				'username': localStorage.getItem('username'),
				'session': localStorage.getItem('session')
			});

			customerReq.$retrieve(function(response) {
				// $log.log(JSON.stringify(response));
				if (response.responseCode === 0) {
					delete response.responseCode;
					$scope.customer = response;
					localStorage.setItem('customer', JSON.stringify($scope.customer));
					$rootScope.$emit('CustomerLoadedEvent', {});

					// homeRetrieve();
				} else {
					localStorage.clear();
					$location.path("/");
				}
			});
		};

		var homeRetrieve = function() {
			var homeReq = new HomeRetrieveFactory({
				'username': localStorage.getItem('username'),
				'session': localStorage.getItem('session')
			});
			homeReq.$retrieve(function(res) {
				if (res.responseCode === 0) {
					// De-serialize the data
					// $log.log(JSON.stringify(res.houses));
					for (var _iter in res.houses) {
						var house = res.houses[_iter];
						var clientHouse = {};
						var houseKeys = Object.keys(house);
						for (var _keyIter in houseKeys) {
							if (houseKeys[_keyIter] != 'thermostats') {
								clientHouse[houseKeys[_keyIter]] = house[houseKeys[_keyIter]];
							}
						}
						$scope.houses.push(clientHouse);

						for (var _iter2 in house.thermostats) {
							// Convert temperature values to Celsius if necessary.
							var thermostat = house.thermostats[_iter2];
							if (dataService.scale == 'C') {
								thermostat.roomTemperature = fahrenheitToCelsius(thermostat.roomTemperature);
								thermostat.coolTemperature = fahrenheitToCelsius(thermostat.coolTemperature);
								thermostat.heatTemperature = fahrenheitToCelsius(thermostat.heatTemperature);
								thermostat.cycleTemperature = fahrenheitToCelsius(thermostat.cycleTemperature);
							}
							$scope.thermostats.push(thermostat);
						}
					}

					// pass data to HouseController and ThermostatController
					dataService.houses = $scope.houses;
					dataService.thermostats = $scope.thermostats;
					// $log.log(JSON.stringify(dataService.houses));
					// $log.log(JSON.stringify(dataService.thermostats));
					$rootScope.$emit('DataLoadedEvent', {});
				} else {
					// Error dialog
					alert('Error when retrieving data');
				}
			});
		};

		// Sidebar controller
		$scope.toggle = function() {
			$("#wrapper").toggleClass("toggled");
		};
});
