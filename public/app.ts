namespace app {
    const myApp = angular.module('myApp', ['chart.js', 'ngRoute']);

    myApp.config(['$routeProvider', function($routeProvider: any) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/graph.html',
            controller: 'GraphCtrl'
        })
        .when('/manage', {
            templateUrl: 'views/manage.html',
            controller: 'InternCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);
}
