// 'use strict';
//
// /* Directives */
//
// var app = angular.module('app');
// var app = angular.module('app', ['angular-meteor', 'ui.router']);
app.directive('houseCreateModal', function() {
	return {
		templateUrl: 'client/partials/house-create-modal.html'
	};
});

app.directive('houseTemplate', function() {
	return {
		templateUrl: 'client/partials/house.html'
	};
});

app.directive('thermostatTemplate', function() {
	return {
		templateUrl: 'client/partials/thermostat.html'
	};
});

app.directive('scheduleTemplate', function() {
	return {
		templateUrl: 'client/partials/schedule.html'
	};
});

app.directive('sidebarNav', function() {
	return {
		templateUrl: 'client/partials/sidebar.html'
	};
});
