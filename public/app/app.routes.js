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
				
			})
		
			.when('/product:id',{
				templateUrl:'app/views/pages/viewDetail.html',
				controller:'viewController'
		})
		.when('/login', {
                 templateUrl: 'app/views/pages/sign-in.html', 
                controller:'loginController'

		}) 
		.when('/register' , {
			templateUrl: 'app/views/pages/sign-up.html',
			controller: 'registerController'

		});
    $locationProvider.html5Mode(true);
});