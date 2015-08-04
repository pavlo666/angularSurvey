/* global angular : true, d3pie: true*/
(function () {
    "use strict";

    var serviceModule = angular.module("SRV.services", []);

    serviceModule.factory("surveyStore", function(){
        var surveyMock = [{
            name: "Office facilities",
            description : "Provide feedback on office facilities suc-h as place, furniture, cleaning, etc.",
            questions: [{
                text: "Do you like your seat chair?",
                answers: [{
                    text: "It is awesome!",
                    answerCount: 5
                },{
                    text: "This is not important for me",
                    answerCount: 3
                },{
                    text: "It is OK but my neighbour has better",
                    answerCount: 6
                }, {
                    text: "It sucks",
                    answerCount: 1
                }]
            },{
                text: "What about air conditioning in your room?",
                answers: [{
                    text: "Works brilliant!",
                    answerCount: 3
                },{
                    text: "It works but not so good",
                    answerCount: 1
                },{
                    text: "Not important for me",
                    answerCount: 3
                },{
                    text: "Not working at all",
                    answerCount: 8
                }]
            }, {
                text: "Is you working space enough for you?",
                answers: [{
                    text: "I have enough space",
                    answerCount: 12
                }, {
                    text: "More or less OK, but a bit crowded",
                    answerCount: 0
                }, {
                    text: "Not important for me",
                    answerCount: 3
                }, {
                    text: "I cant stand my room!",
                    answerCount: 1
                }]
            }]
        },{
            name: "Finance services",
            description : "Provides feedback on finance department work - compensation and other stuff",
            questions: [{
                text: "Do you like your seat chair?",
                answers: [{
                    text: "Yes it is awesome",
                    answerCount: 0
                },{
                    text: "It is OK but my neighbour has better",
                    answerCount: 0
                },{
                    text: "It sucks",
                    answerCount: 0
                }]
            },{
                text: "What about air conditioning in your room?",
                answers: [{
                    text: "Works brilliant",
                    answerCount: 0
                },{
                    text: "It works but not so good",
                    answerCount: 0
                },{
                    text: "Air conditioning in my room? have not heard..",
                    answerCount: 0
                }]
            }, {
                text: "Is the room enough big and not too crowded?",
                answers: [{
                    text: "I have enough space",
                    answerCount: 0
                }, {
                    text: "More or less OK, but a bit crowded",
                    answerCount: 0
                }, {
                    text: "I can not stand my room it is very very small",
                    answerCount: 0
                }]
            }]
        },{
            name: "IT service",
            description : "Provide feedback on IT department work, PC and laptops speed of resolving issues.",
            questions: [{
                text: "Do you like your seat chair?",
                answers: [{
                    text: "Yes it is awesome",
                    answerCount: 0
                },{
                    text: "It is OK but my neighbour has better",
                    answerCount: 0
                },{
                    text: "It sucks",
                    answerCount: 0
                }]
            },{
                text: "What about air conditioning in your room?",
                answers: [{
                    text: "Works brilliant",
                    answerCount: 0
                },{
                    text: "It works but not so good",
                    answerCount: 0
                },{
                    text: "Air conditioning in my room? have not heard..",
                    answerCount: 0
                }]
            }, {
                text: "Is the room enough big and not too crowded?",
                answers: [{
                    text: "I have enough space",
                    answerCount: 0
                }, {
                    text: "More or less OK, but a bit crowded",
                    answerCount: 0
                }, {
                    text: "I can not stand my room it is very very small",
                    answerCount: 0
                }]
            }]
        },{
            name: "HR services",
            description : "Provides feedback on HR department work - people hiring and people partners work.",
            questions: [{
                text: "Do you like your seat chair?",
                answers: [{
                    text: "Yes it is awesome",
                    answerCount: 0
                },{
                    text: "It is OK but my neighbour has better",
                    answerCount: 0
                },{
                    text: "It sucks",
                    answerCount: 0
                }]
            },{
                text: "What about air conditioning in your room?",
                answers: [{
                    text: "Works brilliant",
                    answerCount: 0
                },{
                    text: "It works but not so good",
                    answerCount: 0
                },{
                    text: "Air conditioning in my room? have not heard..",
                    answerCount: 0
                }]
            }, {
                text: "Is the room enough big and not too crowded?",
                answers: [{
                    text: "I have enough space",
                    answerCount: 0
                }, {
                    text: "More or less OK, but a bit crowded",
                    answerCount: 0
                }, {
                    text: "I can not stand my room it is very very small",
                    answerCount: 0
                }]
            }]
        }
        ];

        function getSurvey(index){
            return surveyMock[index];
        }

        function getQuestion(surveyIndex, questionIndex){
            return getSurvey(surveyIndex).questions[questionIndex];
        }

        function getProgress(surveyIndex, index){
            var progress = 100;
            var survey = getSurvey(surveyIndex);
            if (survey.questions.length){
                progress = parseInt((index + 1) * 100 / survey.questions.length, 10);
            }
            return progress;
        }

        function updateUserAnswer(surveyId, questionId, userAnswer, prevAnswer) {
            var question = getQuestion(surveyId, questionId);
            question.answers[userAnswer].answerCount++;
            if (typeof prevAnswer !== "undefined"){
                question.answers[prevAnswer].answerCount--;
            }
        }

        function addSurveyToList(survey) {
            surveyMock.push(survey);
        }

        return {
            getSurveyList: function(){
                return surveyMock;
            },
            getSurvey: getSurvey,
            getQuestion: getQuestion,
            getProgress: getProgress,
            updateUserAnswer: updateUserAnswer,
            addSurveyToList: addSurveyToList

        };
    });

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