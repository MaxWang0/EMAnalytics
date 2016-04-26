// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.factory('HouseCreateFactory', function($resource) {
	return $resource('/api/web/house/create', {}, {
	  'create': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
});

app.factory('HouseUpdateFactory', function($resource) {
	return $resource('/api/web/house/update', {}, {
	  'update': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
});

app.factory('HouseDeleteFactory', function($resource) {
	return $resource('/api/web/house/delete', {}, {
	  'delete': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
});
