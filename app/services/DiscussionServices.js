app.factory('DiscussionServices', function($http) {
  function action(onSuccess, onError){
    $http.post(baseurl+'templates/Discussion',
    {
      data:'action'
    }).
    then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  }

  function sendmess(taskID, mess, onSuccess, onError){
    var dat = $.param({
                taskID, mess
            });
    var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
    };
    $http.post(baseurl+'templates/discussionsend',dat,config)
    .then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  }

  function changemess(ID, mess, onSuccess, onError){
    var dat = $.param({
                ID, mess
            });
    var config = {
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;'
        }
    };
    $http.post(baseurl+'templates/discussionchange',dat,config)
    .then(function(response) {
      onSuccess(response);
    }, function(response) {
      onError(response);
    });
  }

  return {
    action: action,
    sendmess : sendmess,
    changemess:changemess
  }
});