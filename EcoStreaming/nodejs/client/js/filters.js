// 'use strict';
//
// var app = angular.module('app');
// var app = angular.module('app', ['angular-meteor', 'ui.router']);
app.filter('matchHouseId', function($log) {
	return function(thermostats, currentHouseId) {
		return thermostats.filter(function(thermostat) {
			return thermostat.houseId == currentHouseId;
		});
		// $log.log(JSON.stringify({'thermostats': thermostats, 'currentHouseId': currentHouseId}));
	};
});

app.filter('matchDate', function($log) {
	return function(schedules, currentDate) {
		return schedules.filter(function(schedule) {
			return schedule.date == currentDate;
		});
	};
});
