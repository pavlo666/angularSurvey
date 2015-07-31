/**
 * Created by pavlo.halan on 7/28/2015.
 */
/*global app:true, tools:true */
(function () {
    "use strict";

    var angularModule = angular.module("SRV");

    var surveyMock = [{
        name: "Office facilities",
        description : "Provide feedback on office facilities suc-h as place, furniture, cleaning, etc.",
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

    var results = [];

    function getSurvey(index){
       return surveyMock[index];
    }

    function getQuestionById(survey, id){
        return _.find(survey.questions, function(item){
            return item.id === id;
        });
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

    function getPrevQuestionId(survey, index) {
        return index > 0 ? survey.questions[index - 1].id : null;
    }

    function getNextQuestionId(survey, index) {
        return index + 1 < survey.questions.length ? survey.questions[index + 1].id : null;
    }

    function getLastResult(surveyId){
        var resultsBySurvey = _.filter(results, function(item){
            return item.surveyId === surveyId;
        });

        return _.last(resultsBySurvey);
    }

    function getResultsBySurvey(surveyId){
        return  _.filter(results, function(item){
            return item.surveyId === surveyId;
        });
    }

    function getAnswerByQuestionId(answers, qid){
        return _.find(answers, function(item){
            return item.qid === qid;
        });
    }

    angularModule.controller("surveysListController", function ($scope) {
        $scope.surveys = surveyMock;
        $scope.startSurvey = function(id){
            results.push({
                surveyId : id,
                answers : []
            });
        }
    });

    angularModule.controller("questionController", function($scope, $routeParams){
        var surveyId = parseInt($routeParams.sid, 10);
        var questionId = parseInt($routeParams.qid, 10);
        var survey = getSurvey(surveyId);
        $scope.surveyName = survey.name;
        $scope.surveyId = surveyId;
        $scope.questionIndex = questionId;
        $scope.question = getQuestion(surveyId,questionId);
        $scope.progress = getProgress(surveyId, questionId);
        $scope.isAnswerValid = function(){
            return (typeof $scope.userAnswer !== 'undefined');
        };
        $scope.addAnswer = function(){
            var result = getLastResult(surveyId);
            var answer = getAnswerByQuestionId(result.answers, questionId);

            if (answer){
                answer.value = $scope.userAnswer;
            } else {
                result.answers.push({
                    qid : questionId,
                    value: $scope.userAnswer
                });
            }
        };
    });

    function getAnswerTextByIndex(index) {
        return "Hello";
    }

    angularModule.controller("resultsController", function($scope, $routeParams){
        var survey = getSurvey($routeParams.id);
        $scope.surveyName = survey.name;
        $scope.surveyResults = getResultsBySurvey($routeParams.id);

        $scope.createPieChart = function (qid, answers){
            var chartColors = [
                "#7e3838", "#7e6538", "#7c7e38", "#587e38", "#387e45", "#387e6a", "#386a7e"
            ];
            var dataContent = answers.map(function(answer, index){
                return {
                    "label": getAnswerTextByIndex(index),
                    "value": answer.value,
                    "color": chartColors[index]
                };
            });

            new d3pie("pieChart", {
                "header": {
                    "title": {
                        "text": getQuestionById(qid).text,
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
                    "canvasHeight": 400,
                    "canvasWidth": 590,
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
        };

    })

})();