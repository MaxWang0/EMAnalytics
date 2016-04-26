// var app = angular.module('app', ['angular-meteor', 'ui.router']);
//
// CustomerController
app.controller('RegisterController', function($scope, $location, CustomerRegisterFactory) {
    $scope.wrongCredentials = false;
    $scope.registerSuccess = false;
    $scope.registerFailed = false;

    $scope.register = function(user) {
        $scope.registerSuccess = false;
        $scope.wrongCredentials= false;
        $scope.registerFailed = false;
        var req = new CustomerRegisterFactory({
            'username': user.username,
            'password': user.password,
            'email': user.email
        });
        req.$register(function(response) {
            if (response.responseCode === 0) {
                $scope.registerSuccess = true;
            } else {
                $scope.registerFailed = true;
                if (responseCode == 10) {
                    $scope.errorMessage = "User Already exists!";
                }
            }
        });
    };
});

app.controller('CustomerSignOutController',
	function($scope, $location, CustomerSignOutFactory) {
		$scope.signOutAllDevices = false;

		$scope.signout = function() {
			var req = new CustomerSignOutFactory({
					'username': localStorage.getItem('username'),
					'session': localStorage.getItem('session'),
					'signOutAllDevices': $scope.signOutAllDevices
			});
			req.$signout(function(res) {
				localStorage.clear();
				$location.path('/');
			});
	};
});

app.controller('CustomerUpdateController', function($scope, $rootScope, $log, CustomerUpdateFactory, dataService) {

	$scope.SCALE = [{
		value: 'C',
		name: 'Celsius'
	}, {
		value: 'F',
		name: 'Fahrenheit'
	}];

	$scope.emailMissing = false;
	$scope.customer = {};
	$scope.scale = $scope.SCALE[0];

	$rootScope.$on('CustomerLoadedEvent', function(event, args) {
		$scope.customer = JSON.parse(localStorage.getItem('customer'));
		dataService.scale = $scope.customer.scale;
		if ($scope.customer.scale == 'C') {
			$scope.scale = $scope.SCALE[0];
		} else {
			$scope.scale = $scope.SCALE[1];
		}
	});

	$scope.onScaleSelected = function(val) {
		if ($scope.customer.scale != $scope.scale.value) {
			$scope.customer.scale = $scope.scale.value;
			dataService.scale = $scope.customer.scale;
			$rootScope.$emit('CustomerScaleChangedEvent', {});
		}
	};

	$scope.update = function() {
		$scope.customer.modifiedDate = dateFormat(new Date());
		if (!$scope.customer.email) {
			$scope.emailMissing = true;
		}
		if (!$scope.customer.lastName) {
			$scope.customer.lastName = "";
		}
		if (!$scope.customer.streetAddress) {
			$scope.customer.streetAddress = "";
		}
		if (!$scope.customer.city) {
			$scope.customer.city = "";
		}
		if (!$scope.customer.state) {
			$scope.customer.state = "";
		}
		if (!$scope.customer.zipcode) {
			$scope.customer.zipcode = "";
		}
		if (!$scope.customer.phone) {
			$scope.customer.phone = "";
		}
		// $log.log(JSON.stringify($scope.customer));
		var req = new CustomerUpdateFactory({
			'username': $scope.customer.username,
			'session': localStorage.getItem('session'),
			'customer': JSON.stringify($scope.customer)
		});
		req.$update(function(res) {
			// $log.log(JSON.stringify(res));
			if (res.responseCode === 0) {
				localStorage.setItem('customer', JSON.stringify($scope.customer));
			}
		});
	};

});
