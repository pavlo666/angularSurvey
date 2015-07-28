
/*global app:true, tools:true */
(function () {
    "use strict";

    var angularModule = angular.module('SRV', [ 'ngRoute']);

    angularModule.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
            when("/surveys", {templateUrl: "partials/surveyList.html"}).
            when("/surveys/:id", {templateUrl: "partials/surveyPage.html"}).
            when("/surveys/:sid/question/:qid", {templateUrl: "partials/questionPage.html"}).
            when("/results/:id", {templateUrl: "partials/results.html"}).
            when("/edit/:id", {templateUrl: "partials/addSurvey.html"}).
            when("/create", {templateUrl: "partials/addSurvey.html"}).
            when("/used", {templateUrl: "partials/used.html"}).
            otherwise({redirectTo: '/surveys'});
    }]);

})();