app.controller('YourController', ['$scope', '$location', 'YourServices', 'TasklistServices', function($scope,$location, YourServices, TasklistServices){
  $scope.action=function(){
    YourServices.action(function(response){
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

  $scope.chg = function(id,a,b ,comment)
  {
    YourServices.reviewchange(id, a,b,comment, function(response){
    }, function(response){
    });
  }
  $scope.tasklist();
  $scope.action();
  
  
}]);