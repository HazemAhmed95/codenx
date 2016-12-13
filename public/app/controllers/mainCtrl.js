 var container = {};
var cart={};
 angular.module('mainCtrl', ['app.services'])
	 
	 .controller('productController', function ($scope, Product) {
			Product.get().then(function (res) {
				$scope.products = res.data;
				$scope.getImagePath = function (imageName) {
					return "images/" + imageName;
				};
			
					if (container !== null) {
						container = $scope.products;
					}
				
				
				$scope.addToCart = function (id) {
					cart= container[id];
                    console.log(cart);
				};
			});
 })
	 
 .controller('viewController', function ($scope, $location) {
			  $scope.getId = $location.path().split(':').pop();   
			  $scope.getImagePath = function (imageName) {
					return "images/" + imageName;
			  };
			  $scope.container = container;
            
 })
	 
	 
 .controller('loginController', ['$scope','$filter','$location','users',function($scope, $filter,$location,users){

		$scope.characters = 5;
		$scope.username = '';
		$scope.password = '';
		$scope.loginButton = function () {};
		$scope.signupButton = function () {
			$location.path("/register");
		};

 }])
 
 
.controller('registerController', ['$scope', '$filter','$location','users',function($scope, $filter,$location,users){

$scope.username ="";


	
$scope.loginButton = function () {
	$location.path("/login");
};
	
$scope.signupButton = function () {


	users.signUp($scope.username, $scope.password, $scope.email)
		.success(function (response) {
			$scope.res = response;
		});
	
};
	

 }]);