angular.module('app.services', [])
.factory('Product', function ($http) {
    return {
        get: function () {
            console.log("inside function");
            return $http.get('http://localhost:8080/api/products');
        }
    };
});