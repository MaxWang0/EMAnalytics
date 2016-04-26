// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.factory('ThermostatUpdateFactory', function($resource) {
	return $resource('/api/web/thermostat/update', {}, {
	  'update': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
});

app.factory('ThermostatDeleteFactory', function($resource) {
	return $resource('/api/web/thermostat/delete', {}, {
	  'delete': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
});
