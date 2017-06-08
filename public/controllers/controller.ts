let myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope','$http', '$timeout', function($scope, $http, $timeout) {
	let refresh = function() {
		$http.get('/interns').then(doneCallbacks, failCallbacks);
		function doneCallbacks(res) {
			$scope.internlist = res.data;
			$scope.intern = {};
		}
		function failCallbacks(err) {
			console.log(err.message);
		}
	}
	refresh();
	$scope.addIntern = function() {
		if (!$scope.intern.name) {
			$scope.showError = true;
			$scope.errorTitle = 'Name Parse Error';
			$scope.errorMessage = 'Make sure intern name isn\'t blank';
			$timeout(function(){
			$scope.showError = false;
			}, 4500);
			return;
		}
		else {
			console.log($scope.intern.name.length);
			if ($scope.intern.name.length > 64) {
				$scope.showError = true;
				$scope.errorTitle = 'Name Parse Error';
				$scope.errorMessage = 'Make sure intern name is less than 64 characters long';
				$timeout(function(){
				$scope.showError = false;
				}, 4500);
				return;
			}
		}

		if (!$scope.intern.points) {
			$scope.intern.points = 0;
		} else {
			if (/^[0-9.]+$/.test($scope.intern.points)) {
				$scope.intern.points = Number($scope.intern.points);
			}
			else {
				$scope.showError = true;
				$scope.errorTitle = 'Points Parse Error';
				$scope.errorMessage = 'Make sure points is a number';
				$timeout(function(){
				$scope.showError = false;
				}, 4500);
				return;
			}
		}
		$scope.intern.points
		$http.post('/interns', $scope.intern).then(sucessCallbacks, failCallbacks);
		function sucessCallbacks(res) {
			console.log(res.data);
			refresh();
		}
		function failCallbacks(err) {
			console.log(err.message);
		}
	 }
	$scope.remove = function(id) {
		console.log(id);
		$http.delete('/interns/' + id).then(successCallbacks, failCallbacks);
		function successCallbacks(res) {
			console.log(res.data);
			refresh();
		}
		function failCallbacks(err) {
			console.log(err.message);
		}
	}
	$scope.addOne = function(id, intern) {
		intern.points = intern.points + 1;
		$http.put('/interns/' + id, intern).then(successCallbacks, failCallbacks);
		function successCallbacks(res) {
			refresh();
		}
		function failCallbacks(err) {
			console.log(err.message);
		}
	}
	$scope.subOne = function(id, intern) {
		intern.points = intern.points - 1;
		$http.put('/interns/' + id, intern).then(successCallbacks, failCallbacks);
		function successCallbacks(res) {
			refresh();
		}
		function failCallbacks(err) {
			console.log(err.message);
		}
	}
}]);