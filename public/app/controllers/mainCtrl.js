 var container = {};
 angular.module('mainCtrl', ['app.services'])
 

 

	 
.controller('productController', ['$scope', 'Product', '$http', function($scope, Product, $http) {

     
	Product.get().then(function (res) {
         
		  $scope.products = res.data;
   
		  $scope.getImagePath = function (imageName) {
      
			return "images/" + imageName;
         
		};
      
		if (container !== null) {
      
			container = $scope.products;
        
		}
        
      
		$scope.addToCart = function (id) {
      
		
		
			if (container[id].quantity > 0) {
                
					$scope.products[id].quantity--;
               
					$http.post('http://localhost:8080/api/cart', container[id]).success(function (res) {
               
					console.log(res.message);
                
					});
             
				}
            
				else {
            
					alert("La2");
             }
         };
     });
 }])
     
.controller('viewController', ['$scope', '$location',  function ($scope, $location) {
     $scope.getId = $location.path().split(':').pop();
     $scope.getImagePath = function (imageName) {
         return "images/" + imageName;
     };
     $scope.container = container;
	

 }])
    
.controller('loginController', ['$scope', '$filter', '$location', 'users','Auth','$timeout',function ($scope, $filter, $location, users,Auth,$timeout) {
	
	 
	// calls the auth factory to make a login
	$scope.loginButton = function () {
			
		
		Auth.login($scope.username, $scope.password)	
			 .success(function (response) {
			
			 $scope.res = response;
			//if the login was success redirect the user to the index page		 
			 if($scope.res.success == true){							
						 $timeout(function(){
							 $location.path("/index");
						 },1000);
			 }
				
		});
		  			
		         
		 
		  
	};


	
	$scope.signupButton = function () {
		$location.path("/register");
      
	};



}])
 
.controller('userNavBar',['$scope','Auth','$rootScope','$location','AuthInterceptor',function($scope,Auth,$rootScope,$location,AuthInterceptor){

	//on every route change update the text in the user navbar	
	$rootScope.$on('$routeChangeStart', function(){				
		$scope.login = Auth.logInText;	
		$scope.signup = Auth.signUpText;	
		
	})

   //the sign up text only redirect if the user is not loged in  
	$scope.toSignup = function(){
		if(!Auth.logedIn)
			$location.path("/register");
	}
	//if the user is loged in call the logout function other wise redirect to login page  
	$scope.toLogin = function(){
     
		if(Auth.logedIn){
			Auth.logout();
			$location.path("/");
		}
		else 
			$location.path("/login");
	}

}]) 
 
.controller('registerController', ['$scope', '$filter', '$location', 'users', function ($scope, $filter, $location, users) {

	$scope.username = "";

			 
	$scope.loginButton = function () {						
		$location.path("/login"); 
	};

	
	$scope.signupButton = function () {					
		users.signUp($scope.username, $scope.password, $scope.email)
			.success(function (response) {
			$scope.res = response;
		});		  
	};

}])
 
 
 
 
 
 
.controller('checkCart', ['$scope', 'Carts', '$http', function ($scope, Carts, $http) {
    $scope.loadProductsInCart = function () {
        Carts.get().then(function (res) {
            $scope.carts = res.data;
            $scope.getImagePath = function (imageName) {
                return "images/" + imageName;
            };
              $scope.counter=0;
           $scope.totalPrice=0;
           for(var i=0;i<$scope.carts.length;i++){
               $scope.totalPrice+=parseInt($scope.carts[i].price);
                console.log($scope.carts[i].price);
               $scope.counter=i+1;
           }
            $scope.remove = function (id) {
                $http({
                    method: 'DELETE'
                    , url: 'http://localhost:8080/api/cart'
                    , data: {
                        id: id
                    }
                    , headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }).then(function successCallback(response) {
                    $scope.loadProductsInCart();
                    console.log(response.data.message);
                });
            };
        });
    };
 }])
 
 .controller('checkoutController',function($scope,Carts){
       Carts.get().then(function (res) {
            $scope.carts = res.data;
           $scope.counter=0;
           $scope.totalPrice=0;
           for(var i=0;i<$scope.carts.length;i++){
               $scope.totalPrice+=parseInt($scope.carts[i].price);
                console.log($scope.carts[i].price);
               $scope.counter=i+1;
           }
           
       });
 })
	
	 