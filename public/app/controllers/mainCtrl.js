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
 }).controller('loginController', ['$scope','$filter',function($scope, $filter){

$scope.characters = 5;
$scope.username = '';
$scope.password= '';
$scope.loginButton = function(){

};
$scope.signupButton = function (){

};

 }]);