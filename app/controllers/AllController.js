app.controller('AllController', ['$scope', '$location', 'AllServices', 'TasklistServices', function($scope, $location, AllServices, TasklistServices){
  $scope.action=function(){
    AllServices.action(function(response){
      $scope.show(response.data);
    }, function(response){
      $scope.show("Failed");
    });
  }
   $scope.tasklist=function(){
    TasklistServices.action(function(response){
      $scope.list(response.data);
    }, function(response){
      $scope.list("Failed List");
    });
  }

  $scope.data="loading";
  $scope.real="loading";
  $scope.tasklists="List";
  $scope.sel='0';
  $scope.show = function(data)
  {
    $scope.data=data;
    var searchObject = $location.search();
    if(searchObject['id']==null)
      $scope.sel='0';
    else
      $scope.sel=searchObject['id'];
  }
  $scope.list = function(data)
  {
    $scope.tasklists=data;
  }
  $scope.tasklist();
  $scope.action();
}]);