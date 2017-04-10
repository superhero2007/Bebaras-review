app.factory('PresentationServices', function($http) {
  function action(onSuccess, onError){
    $http.post(baseurl+'templates/presentation',
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