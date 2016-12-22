var app = angular.module("operation", ["ngRoute"]);
///controlador del programa
app.controller("Ctrl_administra", function($scope) {
    
});

///rutas para el programa
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "template/main.html"
        controller : "mainCtrl"
    })
    .when("/inventario", {
        templateUrl : "template/inventario.html",
        controller : "listarCtrl"
    });
});