angular.module('mainCtrl', ['app.services'])

.controller('productController', function($scope, Product) {
  Product.get()
       .then(function(res){
          $scope.products = res.data; 
      $scope.getImagePath = function(imageName) {
return "images/" + imageName;
};
        });
});

