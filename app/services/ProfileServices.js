app.factory('ProfileServices', ['$http', function($http) {
  function action(onSuccess, onError){
    $http.post(baseurl+'templates/profile',
    {
      data:'action'
    }).
    then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  }

  function update(data,onSuccess,onError){
    var dat = $.param({
                data
            });
    var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
    };
    $http.post(baseurl+'templates/profileupdate',dat,config)
    .then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  }

  function listtasks(data,onSuccess,onError){
    var dat = $.param({
                data
            });
    var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
    };
    $http.post(baseurl+'templates/profilelisttasks',dat,config)
    .then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  }

  return {
    action: action,
    update: update,
    listtasks: listtasks
  }
}]);
