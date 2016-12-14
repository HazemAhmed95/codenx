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