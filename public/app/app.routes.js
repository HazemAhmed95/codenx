angular.module('app.routes', ['ngRoute'])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider
		
			.when('/', {
				templateUrl: 'app/views/pages/products.html',
				controller: 'productController'
			, controllerAs: 'main'
			})
		
			.when('/index', {
				templateUrl: 'app/views/pages/products.html',
				controller: 'productController'
				, controllerAs: 'main'
			})
		
			.when('/:id',{
				templateUrl:'app/views/pages/viewDetail.html',
				controller:'viewController'
		})
		.when('/index/login', {
                 templateUrl: 'app/views/pages/sign-in.html', 
                controller:'loginController'

		});
    $locationProvider.html5Mode(true);
});