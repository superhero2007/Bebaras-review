app.controller('GeneralController', ['$scope', '$location', 'GeneralServices', 'TasklistServices',function($scope,$location, GeneralServices,TasklistServices){
  $scope.action=function(){
    GeneralServices.action(function(response){
      $scope.show(response.data);
    }, function(response){
      $scope.show("Failed Content");
    });
  }

  $scope.grlist=function(){
    GeneralServices.grlist(function(response){
      $scope.gr(response.data);
    }, function(response){
      $scope.gr("Failed List");
    });
  }

  $scope.gr = function(data)
  {
    $scope.grouplists=data;
  }

  $scope.tasklist=function(){
    TasklistServices.action(function(response){
      $scope.list(response.data);
    }, function(response){
      $scope.list("Failed List");
    });
  }
  $scope.real="loading";
  $scope.tasklists="List";
  $scope.check=true;
  $scope.grouplists="a";
  $scope.sel='0';
  $scope.list = function(data)
  {
    $scope.tasklists=data;
  }
  $scope.show = function(data)
  {
    $scope.real=data;
    var searchObject = $location.search();
    if($scope.sel=='0'&&searchObject['id']!=null)
      $scope.sel=searchObject['id'];
      
    var year=$scope.sel.substring(0,4);
    $scope.check=$scope.check&&!isNaN(year);
    var symbol=$scope.sel.substring(4,5);
    $scope.check=$scope.check&&(symbol=='-');
    var countrycode=$scope.sel.substring(5,7);
    $scope.check=$scope.check&&(isNaN(countrycode));
    symbol=$scope.sel.substring(7,8);
    $scope.check=$scope.check&&(symbol=='-');
    var number=$scope.sel.substring(8,10);
    $scope.check=$scope.check&&(!isNaN(number));
  }

  $scope.lastsave = function(data) {
    alert("click"+JSON.stringify(data));
    GeneralServices.lastsave(data, function(response){
      alert("controller"+JSON.stringify(response.data));
      $scope.show(response.data);
    },function(response){
      $scope.show("Failed");
    });
    $scope.action();
  }

  $scope.tasklist();
  $scope.action();
  $scope.grlist();
  
}]);