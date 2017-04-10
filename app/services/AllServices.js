app.factory('AllServices', function($http) {
  function action(onSuccess, onError){
    $http.post(baseurl+'templates/All',
    {
      data:'action'
    }).
    then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  }

  return {
    action: action
  }
});