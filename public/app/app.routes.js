angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl : 'app/views/pages/products.html',
			controller  : 'mainController',
			controllerAs: 'main'
		});

	$locationProvider.html5Mode(true);
});