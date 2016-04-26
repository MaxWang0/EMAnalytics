// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.factory('HomeRetrieveFactory', function($resource) {
	return $resource('/api/web/house/retrieve', {}, {
	  'retrieve': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
});
