angular.module('app.services', []).factory('Product', function ($http) {
    return {
        get: function () {
            return $http.get('http://localhost:8080/api/products');
        }
    };
});