/**
 * Created by pavlo.halan on 7/28/2015.
 */
/*global app:true, tools:true */
(function () {
    "use strict";

    var angularModule = angular.module("SRV");

    angularModule.controller("surveysListController", function ($scope) {
        $scope.surveys = [{
                name: "Office facilities",
                description : "Provide feedback on office facilities such as place, furniture, cleaning, etc."
            },{
                name: "Finance services",
                description : "Provides feedback on finance department work - compensation and other stuff"
            },{
                name: "IT service",
                description : "Provide feedback on IT department work"
            },{
                name: "HR services",
                description : "Provides feedback on HR department work - people hiring and people partners work."
        }];
    });

})();