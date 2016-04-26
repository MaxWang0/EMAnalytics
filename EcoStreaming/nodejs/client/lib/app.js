// if (Meteor.isClient) {
/* App Module */
app = angular.module('app', ['angular-meteor', 'ui.router', 'ngResource', 'ui.bootstrap']);

// angular.module('app').config(['$routeProvider',
//     function($routeProvider) {
//         $routeProvider.
//             when('/', {
//                 templateUrl: 'client/partials/login2.html',
//                 controller: 'LoginController'
//             }).when('/home', {
//                 templateUrl: 'client/partials/home.html',
//                 controller: 'HomeController'
//             }).otherwise({
//                 redirectTo: '/home'
//             });
//
//         // Use HTML5 History API. It is a standardized way to manipulate the browser history
//         // using a script. This lets Angular change the routing and URLs of our pages
//         // without refreshing the page.
//         // For more information, check https://scotch.io/quick-tips/pretty-urls-in-angularjs-removing-the-hashtag
//         // $locationProvider.html5Mode(true);
//     }
// ]);

app.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'client/partials/login.html'
        // controller: 'LoginController'
      })
      .state('home', {
          url: '/home',
          templateUrl: 'client/partials/home.html'
        //   controller: 'HomeController'
      })
      .state('data', {
          url: '/data',
          templateUrl: 'client/partials/data.html' //,
        //   controller: 'DataController'
      });

    $urlRouterProvider.otherwise("/");
  });
