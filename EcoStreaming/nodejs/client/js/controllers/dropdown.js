// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.controller('DropdownCtrl', function($scope) {

		$scope.status = {
	    isopen: false
	  };

	  $scope.toggleDropdown = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();
	    $scope.status.isopen = !$scope.status.isopen;
	  };

});
