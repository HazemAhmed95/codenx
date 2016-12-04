angular.module('app.routes', ['ngRoute']).config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/index', {
        templateUrl: 'app/views/pages/products.html',
        controller: 'productController'
        , controllerAs: 'main'
    }).when('/:id',{
        templateUrl:'app/views/pages/viewDetail.html',
        controller:'viewController'
    });
    $locationProvider.html5Mode(true);
});