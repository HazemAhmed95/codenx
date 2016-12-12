 var container = {};
 angular.module('mainCtrl', ['app.services']).controller('productController', function ($scope, Product) {
     Product.get().then(function (res) {
         $scope.products = res.data;
         $scope.getImagePath = function (imageName) {
             return "images/" + imageName;
         };
         $scope.add = function () {
             if (container !== null) {
                 container = $scope.products;
             }
         };
         $scope.counter=0;
         $scope.price=0;
         $scope.addToCart=function(price){
         $scope.counter+=1;
         $scope.price+=parseInt(price);
            
         };
     });
 }).controller('viewController', function ($scope, $location) {
     $scope.getId = $location.path().split('/').pop();
     $scope.getImagePath = function (imageName) {
         return "images/" + imageName;
     };
     $scope.container = container;
 }).controller('loginController', ['$scope','$filter','$location',function($scope, $filter,$location){

$scope.characters = 5;
$scope.username = '';
$scope.password= '';
$scope.loginButton = function(){

};
$scope.signupButton = function (){
$location.path("/register");
};

 }]).controller('registerController', ['$scope', '$filter','$location',function($scope, $filter,$location){

$scope.username = '';
$scope.password= '';
$scope.email = '';

$scope.loginButton = function(){
$location.path("/login");
};

$scope.signupButton = function (){

};

 }]);