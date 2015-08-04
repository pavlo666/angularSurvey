/* global angular : true, d3pie: true*/
(function () {
    "use strict";

    var angularModule = angular.module("SRV.controllers", ["SRV.services", "SRV.directives"]);

    angularModule.controller("surveysListController", ["$scope", "surveyStore", function ($scope, surveyStore) {
        $scope.surveys = surveyStore.getSurveyList();
    }]);

    angularModule.controller("questionController", ["$scope", "surveyStore",  "$routeParams", function($scope, surveyStore, $routeParams){
        var surveyId = parseInt($routeParams.sid, 10);
        var questionId = parseInt($routeParams.qid, 10);
        var survey = surveyStore.getSurvey(surveyId);
        $scope.userAnswer = null;
        $scope.surveyName = survey.name;
        $scope.surveyId = surveyId;
        $scope.questionIndex = questionId;
        $scope.question = surveyStore.getQuestion(surveyId,questionId);
        $scope.getProgress = function (){
            var progress = 100;
            if (survey.questions.length){
                progress = parseInt((questionId + 1) * 100 / survey.questions.length, 10);
            }
            return progress;
        };


        $scope.isAnswerValid = function(){
            return (typeof $scope.userAnswer !== 'undefined');
        };
        $scope.recordAnswer = function(){
            surveyStore.updateUserAnswer(surveyId, questionId, $scope.userAnswer, $scope.prevAnswer);
            $scope.prevAnswer = $scope.userAnswer;
        };
    }]);

    angularModule.controller("resultsController", ["$scope", "surveyStore",  "$routeParams",  function($scope, surveyStore, $routeParams){
        var survey = surveyStore.getSurvey($routeParams.id);
        $scope.surveyName = survey.name;
        $scope.questions = survey.questions;
        $scope.sid = $routeParams.id;
    }]);

    angularModule.controller("addSurveyController", ["$scope", "surveyStore", "$routeParams", function($scope, surveyStore, $routeParams){
        var surveyId = $routeParams.id;
        $scope.survey = (typeof surveyId !== "undefined") ? surveyStore.getSurvey(surveyId) : {name: "", description: "", questions: []};
        $scope.title = (typeof surveyId !== "undefined") ? "Edit survey" : "Add survey";
        $scope.newQuestion = "";
        $scope.addSurvey = function(){
            surveyStore.addSurveyToList($scope.survey);
        };

        $scope.addQuestion = function(){
            $scope.survey.questions.push({
                text: $scope.newQuestion,
                answers : [{
                    text: "Yes!",
                    answerCount: 0
                },{
                    text: "No!",
                    answerCount: 0
                },{
                    text: "I do not know",
                    answerCount: 0
                }]
            });
        };

    }]);

})();