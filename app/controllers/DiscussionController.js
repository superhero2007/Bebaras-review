app.controller('DiscussionController', ['$scope', '$location' , 'DiscussionServices', 'TasklistServices', function($scope, $location, DiscussionServices, TasklistServices){
  $scope.action=function(){
    DiscussionServices.action(function(response){
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
  $scope.sel='0';
  $scope.mess="";
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

  $scope.messagesend = function()
  {
    DiscussionServices.sendmess($scope.sel, $scope.mess,function(response){
      $scope.mess="";
        DiscussionServices.action(function(response){
          $scope.data=response.data;
        }, function(response){
        });
    }, function(response){
    });
  }

  $scope.changemess = function(a,b)
  {
    DiscussionServices.changemess(a,b,function(response){
      $scope.action();
    }, function(response){
    });
  }
  $scope.tasklist();
  $scope.action();
}]);