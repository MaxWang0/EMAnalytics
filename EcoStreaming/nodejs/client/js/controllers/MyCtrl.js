// var myApp = angular.module('app', []);

app.controller('MyCtrl', function($scope, $location, $http) {




    $http.post('/api/web/data/retrieve', {}).success(function(data) {
      console.log();

      $scope.priceData = data.list3.list;
      $scope.TimeData = data.list3.list2;
      // data.list.forEach(function(d) {
      //     var temp = {};
      //     temp.price = d.settlementpoint;
      //     // temp.date = new Date(d.intend);
      //     $scope.priceData.push({'settlementpoint': d.settlementpoint});
      //     //console.log($scope.priceData);
      //
      // });
    })









    console.log("DATA")
    $scope.addresses = [
        {'state': 'AL'},
        {'state': 'CA'},
        {'state': 'FL'}
    ];
    console.log($scope.addresses)

    $scope.lov_state = [
        {'lookupCode': 'AL', 'description': 'Alabama'},
        {'lookupCode': 'FL', 'description': 'Florida'},
        {'lookupCode': 'CA', 'description': 'California'},
        {'lookupCode': 'DE', 'description': 'Delaware'}
    ];
});


app.directive('datepicker', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                element.datepicker({
                    dateFormat:'dd/mm/yy',
                    onSelect:function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
            });
        }
    }
});
