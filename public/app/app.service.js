angular.module('app.services', [])
	
	
	
.factory('Product', function ($http) {
    return {
        get: function () {
            return $http.get('http://localhost:8080/api/products');
        }
    };
})


.factory('users',function($http){
	
	var usersFactory = {}
	
	usersFactory.signUp = function (username,password ,email) {
		
	
		return $http.post('http://localhost:8080/api/signup',{
		
			username : username,
			
			password : password,
			
			email : email
		 
		})
		
			.success(function(response) {
		  
			return response;	
		
		});
	
	
	
	}
	
	return usersFactory;

})


.factory('Carts', function ($http) {
    return {
        get: function () {
            return $http.get('http://localhost:8080/api/cart');
        }
    };
})


.factory('Auth', function($http, $q, AuthToken) {
	
	
	var authFactory = {};
	
	authFactory.signUpText = "Sign up";    
	authFactory.logInText = "Log in"; 
	authFactory.logedIn= false;
	
	authFactory.login = function(username, password) {
	
		return $http.post('http://localhost:8080/api/login', {
			username : username,			
			password : password
		})
			.success(function(response){
			
			AuthToken.setToken(response.token);
			
			if(response.success == true){
				authFactory.signUpText = username;
				authFactory.logInText = "Log out";
				authFactory.logedIn= true;		
			}    
			
			return response;
		})
	
	}
	
	
	
	authFactory.logout = function() { 
		AuthToken.setToken();
		authFactory.signUpText = "Sign up";    
		authFactory.logInText = "Log in"; 
		authFactory.logedIn= false;
	}
	
	return authFactory;
})
			
// factory for handling tokens
// inject $window to store token client-side
.factory('AuthToken', function($window) {

	
	var authTokenFactory = {};

	 // get the token

	authTokenFactory.getToken = function() {
	
		return $window.localStorage.getItem('token');
  
	}
	 // set the token or clear the token
  
	authTokenFactory.setToken = function(token){
	
		if(token){
		
			$window.localStorage.setItem('token', token);
		  
			console.log("saved");
	  
		}
		
		else 
		
			$window.localStorage.removeItem('token');
  
	}
  
 
	
	return authTokenFactory;

 
})
			
// application configuration to integrate token into requests
.factory('AuthInterceptor', function($q, AuthToken,$location){


	var interceptorFactory = {};


	// this will happen on all HTTP requests
 
	interceptorFactory.request = function(config) {
	
		//get the tokken from the localstorage
	
		var token = AuthToken.getToken();
	 
		// if the token exists, add it to the header as x-access-token
 	
		if (token){
	 
			config.headers['x-access-token'] = token;
	    
		
		}
		return config;
	 
 
	}
 
 
	interceptorFactory.responseError = function(response) {

	
		// if our server returns a 403 forbidden response
	 
		if (response.status == 403)
	 	
			$location.path('/login');

	 
		// return the errors from the server as a promise
	 
		return $q.reject(response);
 
 
	};
	
 
	return interceptorFactory;


});		
