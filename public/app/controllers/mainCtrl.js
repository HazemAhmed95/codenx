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
    
.controller('loginController', ['$scope', '$filter', '$location', 'users', function ($scope, $filter, $location, users) {
     $scope.characters = 5;
     $scope.username = '';
     $scope.password = '';
     $scope.loginButton = function () {};
     $scope.signupButton = function () {
         $location.path("/register");
     };
 }])

.controller('registerController', ['$scope', '$filter', '$location', 'users', function ($scope, $filter, $location, users) {
     $scope.username = "";
     $scope.loginButton = function () {
         $location.path("/login");
     };
     $scope.signupButton = function () {
         users.signUp($scope.username, $scope.password, $scope.email).success(function (response) {
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
 });