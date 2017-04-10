app.controller('ReviewsController', ['$scope',  'ReviewsServices', function($scope, ReviewsServices){
  $scope.action=function(){
    ReviewsServices.action(function(response){
      $scope.show(response.data);
    }, function(response){
      $scope.show("Failed");
    });
  }
  $scope.data="loading";
  $scope.authorlist=new Array();
  $scope.yearlist=new Array();
  $scope.countrylist=new Array();
  $scope.grouplist=new Array();
  $scope.gr="0";
  $scope.co="0";
  $scope.au="0";
  $scope.ye="0";

  $scope.show = function(data)
  {
    $scope.data=data;
    var i,j;
    var length=0;

    for(i=0;i<$scope.data.length;i++)
    {
      for(j=0;j<i;j++)
        if(data[i].author==data[j].author)
          break;
      if(i==j)
        $scope.authorlist[length++]=data[i].author;
    }

    length=0;
    for(i=0;i<$scope.data.length;i++)
    {
      for(j=0;j<i;j++)
        if(data[i].year==data[j].year)
          break;
      if(i==j)
        $scope.yearlist[length++]=data[i].year;
    }

    length=0;
    for(i=0;i<$scope.data.length;i++)
    {
      for(j=0;j<i;j++)
        if(data[i].countryCode==data[j].countryCode)
          break;
      if(i==j)
        $scope.countrylist[length++]=data[i].countryCode;
    }

    length=0;
    for(i=0;i<$scope.data.length;i++)
    {
      for(j=0;j<i;j++)
        if(data[i].Group==data[j].Group)
          break;
      if(i==j)
        $scope.grouplist[length++]=data[i].Group;
    }

    $scope.myOrderBy="author";
  }

//myOrderBy au ye co gr
  $scope.action();
}]);