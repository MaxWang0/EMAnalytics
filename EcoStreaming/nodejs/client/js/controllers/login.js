app.controller('LoginController', function($scope, $location, CustomerLoginFactory, CustomerRegisterFactory) {


    // console.log("Im here!");
    // console.log($location);
    $scope.isSignedIn = function() {
        var customer = JSON.parse(localStorage.getItem('customer'));
        var session = localStorage.getItem('session');
        if (customer !== null && session !== null) {
            $location.path('/home');
        } else {
            localStorage.clear();
        }
    };

    $scope.login = function(user) {
        // $scope.registerSuccess = false;
        // $scope.wrongCredentials= false;
        // $scope.registerFailed = false;
        // console.log("Im here3!");
        var req = new CustomerLoginFactory({
            "username": user.username,
            "password": user.password
        });
        // console.log("Im here2!");
        req.$login(function(response) {
            if (response.responseCode === 0) {
                localStorage.setItem('session', response.session);
                localStorage.setItem('username', response.username);
                $location.path('/home');
            } else {
                $scope.wrongCredentials= true;
            }
        });
    };
  });
