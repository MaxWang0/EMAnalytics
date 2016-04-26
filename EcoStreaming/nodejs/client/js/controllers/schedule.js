// var app = angular.module('app', ['angular-meteor', 'ui.router']);

app.controller('ScheduleController', function($scope, $log, $modalInstance, macAddress, ScheduleRetrieveFactory, ScheduleCreationFactory, ScheduleUpdateFactory, ScheduleDeleteFactory) {

	$scope.DATE = ["Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday"];

	$scope.macAddress = macAddress;
	$scope.schedules = [];
	$scope.filteredSchedules = [];
	$scope.activeTab = 0;

	$scope.onSelectTab = function(index) {
		$scope.activeTab = index;
	};

	var getFilteredSchedule = function() {
		var filteredSchedules = $scope.schedules.filter(function(schedule) {
			return schedule.date == $scope.activeTab;
		});
		var scheduleCompare = function (a, b) {
			if (a.startTime < b.startTime) {
				return -1;
			}
			if (a.startTime > b.startTime) {
				return 1;
			}
			return 0;
		};
		filteredSchedules.sort(scheduleCompare);
		var startTime = '';
		for (var _iter in filteredSchedules) {
			startTime += filteredSchedules[_iter].startTime + "  ";
		}
		$log.log('filteredSchedules = [' + startTime + ']');
		return filteredSchedules;
	};

	// Retrieve list of schedules under the provided thermostat.
	$scope.retrieve = function() {
		var req = new ScheduleRetrieveFactory({
			'username': localStorage.getItem('username'),
			'session': localStorage.getItem('session'),
			'macAddress': $scope.macAddress
		});
		req.$retrieve(function(res) {
			// $log.log(JSON.stringify(res));
			if (res.responseCode === 0) {
				$scope.schedules = res.schedule;
				$log.log('update filteredSchedules');
				$scope.filteredSchedules = getFilteredSchedule();
			} else {
				alert('Error(s) while retrieving schedule data.');
			}
		});
	};

	$scope.create = function() {
		var schedule = {date: $scope.activeTab, startTime: 360, coolTemperature: 65, heatTemperature: 80, cycleTemperature: 73};
		$scope.schedules.push(schedule);
		var index = $scope.schedules.indexOf(schedule);
		var req = new ScheduleCreationFactory({
			'username': localStorage.getItem('username'),
			'session': localStorage.getItem('session'),
			'macAddress': $scope.macAddress,
			'schedule': schedule
		});
		req.$create(function(res) {
			// $log.log(JSON.stringify(res));
			if (res.responseCode === 0) {
				// do nothing
				$scope.schedules[index] = res.schedule;
				$log.log('update filteredSchedules');
				$scope.filteredSchedules = getFilteredSchedule();
			} else {
				delete $scope.schedules[index];
				alert('Error(s) while creating schedule data.');
			}
		});
	};

	$scope.update = function(schedule) {
		schedule.modifiedDate = dateFormat(new Date());
		$log.log(JSON.stringify(schedule));
		var req = new ScheduleUpdateFactory({
			'username': localStorage.getItem('username'),
			'session': localStorage.getItem('session'),
			'schedule': schedule
		});
		req.$update(function(res) {
			$log.log(JSON.stringify(res));
			if (res.responseCode === 0) {
				schedule = res.schedule;
				$log.log('update filteredSchedules');
				$scope.filteredSchedules = getFilteredSchedule();
			} else {
				alert('Error(s) while updating schedule data.');
			}
		});
	};

	$scope.delete = function(scheduleId) {
		$log.log(scheduleId);
		var req = new ScheduleDeleteFactory({
			'username': localStorage.getItem('username'),
			'session': localStorage.getItem('session'),
			'scheduleId': scheduleId
		});
		req.$delete(function(res) {
			// $log.log(JSON.stringify(res));
			if (res.responseCode === 0) {
				$scope.schedules = $scope.schedules.filter(function(schedule) {
					return schedule.scheduleId != scheduleId;
				});
				$log.log('update filteredSchedules');
				$scope.filteredSchedules = getFilteredSchedule();
			} else {
				alert('Error(s) while deleting schedule data.');
			}
		});
	};

	$scope.close = function() {
		$modalInstance.close();
	};

});

app.controller('ScheduleStartTimeController', function($scope, $log) {

	// default
	$scope.hstep = 1;
	$scope.mstep = 5;

	$scope.startTimeEntered = new Date();

	$scope.init = function() {
		$scope.startTimeEntered.setHours($scope.schedule.startTime / 60);
		$scope.startTimeEntered.setMinutes($scope.schedule.startTime % 60);
	};

	$scope.changed = function() {
		$scope.schedule.startTime = $scope.startTimeEntered.getHours() * 60 + $scope.startTimeEntered.getMinutes();
		// $log.log('time changed to ' + $scope.schedule.startTime);
	};

});

app.controller('ScheduleTemperatureController', function($scope, $rootScope, $log, dataService) {

	$rootScope.$on('CustomerScaleChangedEvent', function(event, args) {
		setDisplayTemperatureBasedOnScale();
	});

	$scope.init = function() {
		setDisplayTemperatureBasedOnScale();
	};

	var setDisplayTemperatureBasedOnScale = function() {
		var scale = dataService.scale;
		// $log.log(scale);
		if (scale == 'C') {
			$scope.coolEntered = fahrenheitToCelsius($scope.schedule.coolTemperature);
			$scope.heatEntered = fahrenheitToCelsius($scope.schedule.heatTemperature);
			$scope.cycleEntered = fahrenheitToCelsius($scope.schedule.cycleTemperature);
		} else {
			$scope.coolEntered = $scope.schedule.coolTemperature;
			$scope.heatEntered = $scope.schedule.heatTemperature;
			$scope.cycleEntered = $scope.schedule.cycleTemperature;
		}
	};

	var setStoringTemperatureBasedOnScale = function() {
		var scale = dataService.scale;
		if (scale == 'C') {
			$scope.schedule.coolTemperature = celsiusToFahrenheit($scope.coolEntered);
			$scope.schedule.heatTemperature = celsiusToFahrenheit($scope.heatEntered);
			$scope.schedule.cycleTemperature = celsiusToFahrenheit($scope.cycleEntered);
		} else {
			$scope.schedule.coolTemperature = $scope.coolEntered;
			$scope.schedule.heatTemperature = $scope.heatEntered;
			$scope.schedule.cycleTemperature = $scope.cycleEntered;
		}
	};

	$scope.changed = function() {
		setStoringTemperatureBasedOnScale();
	};

});
