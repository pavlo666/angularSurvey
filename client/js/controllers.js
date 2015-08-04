/* global angular : true, d3pie: true*/
(function () {
    "use strict";

    var angularModule = angular.module("SRV.controllers", ["SRV.services"]);

    angularModule.controller("surveysListController", ["$scope", "surveyStore", function ($scope, surveyStore) {
        $scope.surveys = surveyStore.getSurveyList();
    }]);

    angularModule.controller("questionController", ["$scope", "surveyStore", function($scope, surveyStore, $routeParams){
        var surveyId = parseInt($routeParams.sid, 10);
        var questionId = parseInt($routeParams.qid, 10);
        var survey = surveyStore.getSurvey(surveyId);
        $scope.userAnswer = null;
        $scope.surveyName = survey.name;
        $scope.surveyId = surveyId;
        $scope.questionIndex = questionId;
        $scope.question = surveyStore.getQuestion(surveyId,questionId);
        $scope.progress = surveyStore.getProgress(surveyId, questionId);
        $scope.isAnswerValid = function(){
            return (typeof $scope.userAnswer !== 'undefined');
        };
        $scope.recordAnswer = function(){
            surveyStore.updateUserAnswer(surveyId, questionId, $scope.userAnswer, $scope.prevAnswer);
            $scope.prevAnswer = $scope.userAnswer;
        };
    }]);

    angularModule.directive("chartForResult", ['$timeout', function ($timeout) {
        var pie;
        return {
            restrict: "E",
            scope: {
                qid: "@",
                sid: "@"
            },
            link: function (scope){
                var question = getQuestion(scope.sid, scope.qid);
                var chartColors = [
                    "#7e3838", "#7e6538", "#7c7e38", "#587e38", "#387e45", "#387e6a", "#386a7e"
                ];
                var dataContent = question.answers.map(function(answer, index){
                    return {
                        "label": answer.text,
                        "value": answer.answerCount,
                        "color": chartColors[index]
                    };
                });


                $timeout(function(){
                    pie = new d3pie("pieChart" + scope.qid, {
                        "header": {
                            "title": {
                                "text": question.text,
                                "fontSize": 22,
                                "font": "verdana"
                            }
                        },
                        "footer": {
                            "text": "by d3pie",
                            "color": "#999999",
                            "fontSize": 11,
                            "font": "open sans",
                            "location": "bottom-center"
                        },
                        "size": {
                            "canvasHeight": 420,
                            "canvasWidth": 640,
                            "pieInnerRadius": "11%",
                            "pieOuterRadius": "86%"
                        },
                        "data": {
                            "content": dataContent
                        },
                        "labels": {
                            "inner": {
                                "format": "value"
                            },
                            "mainLabel": {
                                "font": "verdana"
                            },
                            "percentage": {
                                "color": "#e1e1e1",
                                "font": "verdana",
                                "decimalPlaces": 0
                            },
                            "value": {
                                "color": "#e1e1e1",
                                "font": "verdana"
                            },
                            "lines": {
                                "enabled": true,
                                "color": "#cccccc"
                            },
                            "truncation": {
                                "enabled": true
                            }
                        },
                        "effects": {
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            }
                        }
                    });
                });

            }
        };
    }]);

    angularModule.controller("resultsController", ["$scope", "surveyStore", function($scope, surveyStore, $routeParams){
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