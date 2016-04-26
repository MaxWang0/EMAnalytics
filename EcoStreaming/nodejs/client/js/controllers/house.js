// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.controller('HouseController', function($scope, $log, $rootScope, $modal, dataService, HouseCreateFactory, HouseUpdateFactory, HouseDeleteFactory) {

		$scope.houses = [];
		$scope.currentHouseIndex = 0;

		$rootScope.$on('DataLoadedEvent', function(event, args) {
			$scope.houses = dataService.houses;
			// $scope.currentHouseIndex = 0;
	  	    $rootScope.$emit('HouseSelectEvent', {houseId: $scope.houses[$scope.currentHouseIndex].houseId});
			$log.log('finished loading houses');
		});

	  $scope.onSelectHouse = function(index) {
	  	$scope.currentHouseIndex = index;
	  	$rootScope.$emit('HouseSelectEvent', {houseId: $scope.houses[$scope.currentHouseIndex].houseId});
	  };

		// house creation
		$scope.openHouseCreateModal = function () {

	    var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'client/partials/house-modal.html',
	      controller: 'HouseModalCtrl',
	      resolve: {
	      	index: function() {
	      		return $scope.houses.length;
	      	},
	      	currentHouse: function() {
	      		return {};
	      	},
	      	title: function() {
	      		return 'New House';
	      	}
	      }
	    });

	    modalInstance.result.then(function (ret) {
	      // $log.log('newHouse = ' + JSON.stringify(ret));
	      // Validate inputs
	      var req = new HouseCreateFactory({
	      	'username':localStorage.getItem('username'),
	      	'session': localStorage.getItem('session'),
	      	'house': ret.house //JSON.stringify(ret.house)
	      });
	      req.$create(function(res) {
	      	// $log.log(res);
	      	if (res.responseCode === 0) {
	      		//$scope.houses.push(res.house);
	      		//$scope.currentHouseIndex = $scope.houses.length - 1;
                //console.log($scope.houses);
	      	} else {
                if (res.responseCode === 1)
                    alert("Invalid Format!");
	      		       //alert('Error when creating new house');
	      	}
	      });
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };

		// house deletion
	  $scope.openHouseDeleteModal = function() {
	  	if ($scope.houses.length === 0) return;
	  	var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'client/partials/password-modal.html',
	      size: 'sm',
	      controller: 'PasswordModalCtrl',
	      resolve: {
	      	id: function() {
	      		return $scope.houses[$scope.currentHouseIndex].houseId;
	      	},
	      	index: function() {
	      		return $scope.currentHouseIndex;
	      	},
	        title: function () {
	          return "House Delete";
	        }
	      }
	    });

	    modalInstance.result.then(function (ret) {
	      var req = new HouseDeleteFactory({
	      	'username': localStorage.getItem('username'),
	      	'session': localStorage.getItem('session'),
	      	'password': ret.password,
	      	'houseId': ret.id
	      });
	      req.$delete(function(res) {
	      	if (res.responseCode === 0) {
	      		$scope.houses.splice(ret.index, 1);
	      		$scope.currentHouseIndex = 0;
	      		$rootScope.$emit('HouseDeleteEvent', {'houseId': ret.id});
	      	} else if (res.responseCode == 3) {
	      		// responseCode = INVALID_CRENDENTIAL
	      		alert('Invalid password!');
	      	} else {
	      		alert('Error while deleting house');
	      	}
	      });
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
	  };

		// house update
	  $scope.openHouseUpdateModal = function() {
	  	var modalInstance = $modal.open({
	      animation: true,
	      templateUrl: 'client/partials/house-modal.html',
	      controller: 'HouseModalCtrl',
	      resolve: {
	      	index: function() {
	      		return $scope.currentHouseIndex;
	      	},
	      	currentHouse: function() {
	      		return $scope.houses[$scope.currentHouseIndex];
	      	},
	      	title: function() {
	      		return 'Update House';
	      	}
	      }
	    });

	    modalInstance.result.then(function (ret) {
	    	// Make a copy of the old house in order to revert if the request is rejected.
	    	var oldHouse = jQuery.extend(true, {}, $scope.houses[ret.index]);
	    	ret.house.modifiedDate = dateFormat(new Date());
	      $scope.houses[ret.index] = ret.house;

	      // Send delete request to server.
	      var req = new HouseUpdateFactory({
	      	'username':localStorage.getItem('username'),
	      	'session': localStorage.getItem('session'),
	      	'house': ret.house //JSON.stringify(ret.house)
	      });
	      req.$update(function(res) {
	      	// $log.log(JSON.stringify(res));
	      	if (res.responseCode === 0) {
	      		oldHouse = null;
	      	} else {
	      		$scope.houses[index] = oldHouse;
	      		alert('Error while updating house');
	      	}
	      });
	    });
	  };

});

app.controller('HouseModalCtrl', function ($scope, $modalInstance, $log, title, currentHouse, index) {
	$scope.title = title;
	$scope.thisHouse = currentHouse;

	$scope.ok = function () {
		if ($scope.thisHouse.streetAddress === null) {
			$scope.thisHouse.streetAddress = "";
		}
		if ($scope.thisHouse.city === null) {
			$scope.thisHouse.city = "";
		}
		if ($scope.thisHouse.state === null) {
			$scope.thisHouse.state = "";
		}
		if ($scope.thisHouse.zipcode === null) {
			$scope.thisHouse.zipcode = "";
		}
		if ($scope.thisHouse.timezone === null) {
			$scope.thisHouse.timezone = "";
		}
    $modalInstance.close({'house' : $scope.thisHouse, 'index': index});
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
