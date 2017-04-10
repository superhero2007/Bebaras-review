app.controller('UsersController', ['$scope', '$location',  'UsersServices', function($scope, $location, UsersServices){
  //users
  $scope.action=function(){
    UsersServices.action(function(response){
      $scope.show(response.data);
    }, function(response){
      $scope.show("Failed");
    });
  }
//tasklist
  $scope.listtasks=function(data){
    UsersServices.listtasks(data,function(response){
      $scope.listtas(data,response.data);
    }, function(response){
      $scope.listtas("Failed");
    });
  }
  $scope.list=[];
  $scope.listtas = function(a,data)
  {
    $scope.list[a]=data;
  }
  $scope.data="loading";
  $scope.councode="France";
  $scope.myOrderBy="firstName";

  //userid->tasks
  $scope.show = function(data)
  {
    $scope.data=data;
    var i=0;
    for(i=0;i<data.length;i++)
    {
      $scope.listtasks(data[i]['ID']);
    }
    var searchObject = $location.search();
    if(searchObject['id']==null)
      $scope.sel='0';
    else
      $scope.sel=searchObject['id'];
    
  }

  $scope.listts = function (data)
  {
    $location.url("Tasks/General?id="+data);
  }

  $scope.ch = function (id,member,data)
  {
    UsersServices.update(id,member,data,function(response){
    }, function(response){
    });
  }

  $scope.action();

}]);