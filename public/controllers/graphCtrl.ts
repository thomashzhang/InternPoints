namespace GraphController {
	const myApp = angular.module('myApp');
	myApp.controller('GraphCtrl', ['$scope','$http', '$timeout', function($scope, $http, $timeout, $location) {
		const refresh = function() {
			$http.get('/interns').then(doneCallbacks, failCallbacks);
			function doneCallbacks(res) {
				$scope.options = {
					scales: {
						xAxes: [{
						stacked: true,
						}],
						yAxes: [{
						stacked: true
						}]
					}
				};
				$scope.labels = res.data.map(function (i) { return i.name });
				$scope.series = ['GitHub Points', 'Trello Points'];

				$scope.data = [
					res.data.map(function (i) { return i.points }),
					res.data.map(function (i) { return i.points })
				];
				$scope.colors= ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
			}
			function failCallbacks(err) {
				console.log(err.message);
			}
		}
		refresh();
	}]);
}