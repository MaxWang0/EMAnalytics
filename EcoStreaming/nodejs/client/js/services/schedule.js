// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.factory('ScheduleRetrieveFactory', ['$resource', function($resource) {
	return $resource('/api/web/schedule/retrieve', {}, {
		'retrieve': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
}]);

app.factory('ScheduleCreationFactory', ['$resource', function($resource) {
	return $resource('/api/web/schedule/create', {}, {
		'create': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
}]);

app.factory('ScheduleUpdateFactory', ['$resource', function($resource) {
	return $resource('/api/web/schedule/update', {}, {
		'update': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
}]);

app.factory('ScheduleDeleteFactory', ['$resource', function($resource) {
	return $resource('/api/web/schedule/delete', {}, {
		'delete': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
}]);
