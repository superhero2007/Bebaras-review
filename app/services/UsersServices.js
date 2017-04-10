app.factory('UsersServices', function($http) {
  function action(onSuccess, onError){
    $http.post(baseurl+'templates/users',
    {
      data:'action'
    }).
    then(function(response) {
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

  function update(id,member,data,onSuccess,onError){

    var dat = $.param({
                id,member,data
            });
    var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
    };
    $http.post(baseurl+'templates/userupdate',dat,config)
    .then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  }

  return {
    action: action,
    listtasks:listtasks,
    update:update
  }
});