// // 'use strict';
// //
// // /* Services */
// //
// // var app = angular.module('app');
// var app = angular.module('app', ['angular-meteor', 'ui.router', 'ngResource']);

app.factory('CustomerRetrieveFactory', function($resource) {
	return $resource('/api/web/customer/retrieve', {}, {
	  'retrieve': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
});

app.factory('CustomerLoginFactory', function($resource) {
  return $resource('/api/web/customer/login', {}, {
  	'login': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	}
  });
});

app.factory('CustomerRegisterFactory', function($resource) {
  return $resource('/api/web/customer/register', {}, {
  	'register': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	}
  });
});

app.factory('CustomerUpdateFactory', function($resource) {
  return $resource('/api/web/customer/update', {}, {
    'update': {
      method: 'POST',
      isArray: false,
      headers: {"Content-Type":"application/json; charset=UTF-8"}
    }
  });
});

app.factory('CustomerSignOutFactory', function($resource) {
	return $resource('/api/web/customer/signout', {}, {
	  'signout': {
  	 	method: 'POST',
  	 	isArray: false,
  	 	headers: {"Content-Type":"application/json; charset=UTF-8"}
  	  }
	});
});
