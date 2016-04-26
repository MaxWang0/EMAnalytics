// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.controller('ThermostatController', function($scope, $rootScope, $log, $modal, dataService, ThermostatUpdateFactory, ThermostatDeleteFactory) {

	// Constants
	$scope.FAN_MODES = ['AUTO', 'CIRCLE', 'OFF'];
	$scope.SYSTEM_MODES = ['COOL', 'HEAT', 'CYCLE', 'OFF'];
	$scope.CONTROL_MODES = ['MANUAL', 'PROGRAM'];

	$scope.currentHouseId = "";
	$scope.thermostats = [];

	// Update thermostat list when data is fully loaded.
	$rootScope.$on('DataLoadedEvent', function(event, args) {
		$scope.thermostats = dataService.thermostats;
        console.log($scope.thermostats);
		$log.log('finished loading thermostats');
	});

	// Remove thermostats that have provided houseId when house is deleted.
	$rootScope.$on('HouseDeleteEvent', function(event, args) {
		$scope.thermostats.filter(function(thermostat) {
			thermostat.houseId != args.houseId;
		});
	});

	$rootScope.$on('CustomerScaleChangedEvent', function(event, args) {
		for (var _iter in $scope.thermostats) {
			var thermostat = $scope.thermostats[_iter];
			if (dataService.scale == 'C') {
				 // Convert Fahrenheit to Celsius
				 thermostat.roomTemperature = fahrenheitToCelsius(thermostat.roomTemperature);
				 thermostat.coolTemperature = fahrenheitToCelsius(thermostat.coolTemperature);
				 thermostat.heatTemperature = fahrenheitToCelsius(thermostat.heatTemperature);
				 thermostat.cycleTemperature = fahrenheitToCelsius(thermostat.cycleTemperature);
			} else {
				// Convert Celsius to Fahrenheit
				thermostat.roomTemperature = celsiusToFahrenheit(thermostat.roomTemperature);
				thermostat.coolTemperature = celsiusToFahrenheit(thermostat.coolTemperature);
				thermostat.heatTemperature = celsiusToFahrenheit(thermostat.heatTemperature);
				thermostat.cycleTemperature = celsiusToFahrenheit(thermostat.cycleTemperature);
			}
		}
	});

	// Update $scope.currentHouseId when a house is selected from HouseController.
	$rootScope.$on('HouseSelectEvent', function(event, args) {
		$scope.currentHouseId = args.houseId;
	});

	$scope.update = function(updatedThermostat) {
		updatedThermostat.modifiedDate = dateFormat(new Date());
		updatedThermostat.coolTemperature = parseInt(updatedThermostat.coolTemperature);
		updatedThermostat.heatTemperature = parseInt(updatedThermostat.heatTemperature);
		updatedThermostat.cycleTemperature = parseInt(updatedThermostat.cycleTemperature);
		if (dataService.scale == 'C') {
			// Convert all target temperatures to Fahrenheit before requesting the update in server.
			updatedThermostat.coolTemperature = celsiusToFahrenheit(updatedThermostat.coolTemperature);
			updatedThermostat.heatTemperature = celsiusToFahrenheit(updatedThermostat.heatTemperature);
			updatedThermostat.cycleTemperature = celsiusToFahrenheit(updatedThermostat.cycleTemperature);
		}
		var req = new ThermostatUpdateFactory({
			'username': localStorage.getItem('username'),
			'session': localStorage.getItem('session'),
			'thermostat': updatedThermostat
		});
		req.$update(function(res) {
			// $log.log(JSON.stringify(res));
			if (res.responseCode === 0) {
				// do nothing
			} else {
				// updatedThermostat = JSON.parse(res.thermostat);
				alert('Error while updating');
			}
		});
	};

	$scope.delete = function(thermostatId) {
		var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'client/partials/password-modal.html',
	      size: 'sm',
	      controller: 'PasswordModalCtrl',
	      resolve: {
	      	id: function() {
	      		return thermostatId;
	      	},
	      	index: function() {
	      		return null;
	      	},
	        title: function () {
	          return "Thermostat Delete";
	        }
	      }
	    });

    modalInstance.result.then(function (ret) {
      var req = new ThermostatDeleteFactory({
      	'username': localStorage.getItem('username'),
      	'session': localStorage.getItem('session'),
      	'password': ret.password,
      	'thermostatId': ret.id
      });
      req.$delete(function(res) {
      	if (res.responseCode === 0) {
      		$scope.thermostats = $scope.thermostats.filter(function(thermostat) {
      			return thermostat.thermostatId != ret.id;
      		});
      	} else if (res.responseCode == 3) {
      		// responseCode = INVALID_CRENDENTIAL
      		alert('Invalid password!');
      	} else {
      		alert('Error while deleting thermostat');
      	}
      });
    });
};

  $scope.onScheduleSelected = function(macAddress) {
  	var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'client/partials/schedule.html',
	      controller: 'ScheduleController',
	      size: 'lg',
	      backdrop: 'static',
	      resolve: {
	      	macAddress: function() {
	      		return macAddress;
	      	}
	      }
	    });
  };

});
