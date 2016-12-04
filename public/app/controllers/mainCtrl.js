angular.module('mainCtrl', ['app.services']).controller('productController', function ($scope, Product) {
    Product.get().then(function (res) {
        $scope.products = res.data;
        $scope.getImagePath = function (imageName) {
            return "images/" + imageName;
        };
        
    });
}).controller('viewController',function($scope,Product,$location){
   Product.get().then(function (res) {
        $scope.products = res.data;
        $scope.getImagePath = function (imageName) {
            return "images/" + imageName;
        };
        $scope.getId=$location.path().split('/').pop();
        $scope.getId=parseInt($scope.getId);
        $scope.getId--;
});
});