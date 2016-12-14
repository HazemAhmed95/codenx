 var container = {};
 angular.module('mainCtrl', ['app.services']).controller('productController', function ($scope, Product, $http) {
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
                 container[id].quantity--;
                 $http.post('http://localhost:8080/api/cart', container[id]).success(function (res) {
                     alert(res.message);
                 });
             }
             else {
                 alert("La2");
             }
         };
     });
 }).controller('viewController', function ($scope, $location) {
     $scope.getId = $location.path().split(':').pop();
     $scope.getImagePath = function (imageName) {
         return "images/" + imageName;
     };
     $scope.container = container;
 }).controller('loginController', ['$scope', '$filter', '$location', 'users', function ($scope, $filter, $location, users) {
     $scope.characters = 5;
     $scope.username = '';
     $scope.password = '';
     $scope.loginButton = function () {};
     $scope.signupButton = function () {
         $location.path("/register");
     };
 }]).controller('registerController', ['$scope', '$filter', '$location', 'users', function ($scope, $filter, $location, users) {
     $scope.username = "";
     $scope.loginButton = function () {
         $location.path("/login");
     };
     $scope.signupButton = function () {
         users.signUp($scope.username, $scope.password, $scope.email).success(function (response) {
             $scope.res = response;
         });
     };
 }]).controller('checkCart', function ($scope, $http) {
     $http.get('http://localhost:8080/api/cart').success(function (res) {
         $scope.carts = res;
         $scope.getImagePath = function (imageName) {
             return "images/" + imageName;
         };
     });
     $scope.remove = function (id) {
         console.log(id);
         $http.delete('http://localhost:8080/api/cart', {
             id: id
         }).success(function (res) {
             console.log(res.message);
         });
     };
 });    