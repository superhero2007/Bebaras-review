app.factory('TasklistServices', function($http) {
  function action(onSuccess, onError){
    $http.post(baseurl+'templates/tasklist',
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