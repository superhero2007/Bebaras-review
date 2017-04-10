var app =  angular.module('main-App',['ngRoute','ngSanitize', 'toggle-switch']);

var baseurl="http://localhost/bebras-review/";
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/Presentation', {
                templateUrl: baseurl+'templates/view/Presentation.html',
                controller: 'PresentationController'
            }).
            when('/Tasks', {
                templateUrl: baseurl+'templates/view/Tasks.html',
                controller: 'TasksController'
            }).
            when('/Tasks/General', {
                templateUrl: baseurl+'templates/view/tasksgeneral.html',
                controller: 'GeneralController'
            }).
            when('/Tasks/Html', {
                templateUrl: baseurl+'templates/view/tasksHtml.html',
                controller: 'HtmlController'
            }).
            when('/Tasks/Odt', {
                templateUrl: baseurl+'templates/view/tasksOdt.html',
                controller: 'OdtController'
            }).
            when('/Tasks/PDF', {
                templateUrl: baseurl+'templates/view/tasksPDF.html',
                controller: 'PDFController'
            }).
            when('/Tasks/Your', {
                templateUrl: baseurl+'templates/view/tasksYour.html',
                controller: 'YourController'
            }).
            when('/Tasks/All', {
                templateUrl: baseurl+'templates/view/tasksAll.html',
                controller: 'AllController'
            }).
            when('/Tasks/Discussion', {
                templateUrl: baseurl+'templates/view/tasksDiscussion.html',
                controller: 'DiscussionController'
            }).
            when('/Reviews', {
                templateUrl: baseurl+'templates/view/Reviews.html',
                controller: 'ReviewsController'
            }).
            when('/Users', {
                templateUrl: baseurl+'templates/view/Users.html',
                controller: 'UsersController'
            }).
            when('/Profile', {
                templateUrl: baseurl+'templates/view/Profile.html',
                controller: 'ProfileController'
            });
}]);