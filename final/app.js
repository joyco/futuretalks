var app = angular.module('movieApp', ["ngRoute", 'lazy-scroll']);

//routes
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html",
            controller: 'movieController'
        })
        .when("/detail", {
            templateUrl: "details.html",
            controller: 'detailsController'
        });

});

//factory to store data
app.factory("moviedetail", function () {
    return {
        data: {},
    };
});