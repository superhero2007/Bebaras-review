app.controller('PresentationController', ['$scope',  'PresentationServices', function($scope, PresentationServices){
  $scope.action=function(){
    PresentationServices.action(function(response){
      $scope.show(response.data);
    }, function(response){
      $scope.show("Failed");
    });
  }
  $scope.data="loading";
  $scope.show = function(data)
  {
    $scope.data=data;
  }

  $scope.action();
}]);