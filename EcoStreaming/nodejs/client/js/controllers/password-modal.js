// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.controller('PasswordModalCtrl', function($scope, $modalInstance, title, id, index) {
	$scope.title = title;
	$scope.password = "";

	$scope.ok = function () {
    $modalInstance.close({'password' : $scope.password, 'id' :id, 'index': index});
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
