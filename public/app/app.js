angular.module('myApp', ['app.routes', 'mainCtrl','app.services','ngAnimate'])
	
	.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
	$httpProvider.interceptors.push('AuthInterceptor');

});