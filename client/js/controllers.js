/**
 * Created by pavlo.halan on 7/28/2015.
 */
/*global app:true, tools:true */
(function () {
    "use strict";

    var angularModule = angular.module("SRV");

    var surveyMock = [{
        id : "1",
        name: "Office facilities",
        description : "Provide feedback on office facilities such as place, furniture, cleaning, etc."
    },{
        id : "2",
        name: "Finance services",
        description : "Provides feedback on finance department work - compensation and other stuff"
    },{
        id : "3",
        name: "IT service",
        description : "Provide feedback on IT department work"
    },{
        id : "4",
        name: "HR services",
        description : "Provides feedback on HR department work - people hiring and people partners work."
    }];

    angularModule.controller("surveysListController", function ($scope) {
        $scope.surveys = surveyMock;
    });

    angularModule.controller("surveyController", function($scope, $routeParams){
        $scope.survey = _.find(surveyMock, function(item){
            return item.id === $routeParams.id;
        });
    });

})();