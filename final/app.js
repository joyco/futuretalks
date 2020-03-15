var app = angular.module('movieApp',["ngRoute",'lazy-scroll']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'home.html',
        controller: 'movieController'
    })
    .when('/detail', {
        templateUrl: '/details.html',
        // controller: 'movieController'
    }).otherwise({
        redirectTo: "/"
    });
})