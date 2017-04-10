app.controller('OdtController', ['$scope','$sce', '$location', 'OdtServices', 'TasklistServices', function($scope,$sce, $location, OdtServices, TasklistServices){
  $scope.action=function(){
    OdtServices.action(function(response){
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

  $scope.tasklists="List";
  $scope.data="loading";

  $scope.httpflag="false";
  $scope.sel='0';
  $scope.show = function(data)
  {
    $scope.data=data;
    var searchObject = $location.search();
    if(searchObject['id']==null)
      $scope.sel='0';
    else
      $scope.sel=searchObject['id'];
    $scope.httpflag=($scope.data.localCheckoutFolder.substring(0,4)=='http');
  }
  $scope.list = function(data)
  {
    $scope.tasklists=data;
  }
  $scope.action();
  $scope.tasklist();
  
  $scope.flag=0;
  $scope.toggleflag=false;

  $scope.trust = function(url)
  {
    return $sce.trustAsResourceUrl(url);
  }


  $scope.loadchange = function(){
    $scope.data.autoLoadTasks='true';
    HtmlServices.autosave(function(response){
    }, function(response){
    });
  }
  
}]);