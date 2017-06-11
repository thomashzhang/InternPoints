"use strict";
var app;
(function (app) {
    var myApp = angular.module('myApp', ['chart.js', 'ngRoute']);
    myApp.config(['$routeProvider', function ($routeProvider) {
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
})(app || (app = {}));
