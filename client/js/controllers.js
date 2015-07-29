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
        description : "Provide feedback on office facilities suc-h as place, furniture, cleaning, etc.",
        questions: [{
            id: "1",
            text: "Do you like your seat chair?",
            answers: [
                "Yes it is awesome",
                "It is OK but my neighbour has better",
                "It sucks"
            ]},{
            id: "2",
            text: "What about air conditioning in your room?",
            answers: [
                "Works brilliant",
                "It works but not so good",
                "Air conditioning in my room? have not heard.."
            ]},{
            id: "3",
            text: "Is the room enough big and not too crowded?",
            answers: [
                "I have enough space",
                "More or less OK, but a bit crowded",
                "I can not stand my room it is very very small"
            ]}
        ]
    },{
        id : "2",
        name: "Finance services",
        description : "Provides feedback on finance department work - compensation and other stuff",
        questions: []
    },{
        id : "3",
        name: "IT service",
        description : "Provide feedback on IT department work, PC and laptops speed of resolving issues.",
        questions: []
    },{
        id : "4",
        name: "HR services",
        description : "Provides feedback on HR department work - people hiring and people partners work.",
        questions: []
    }];

    function getSurveyById(id){
        return _.find(surveyMock, function(item){
            return item.id === id;
        });
    }

    function getQuestionById(survey, id){
        return _.find(survey.questions, function(item){
            return item.id === id;
        });
    }

    function getQuestionIndex(survey, id){
        return _.findIndex(survey.questions, function(item){
            return item.id === id;
        });
    }

    function getProgress(survey, index){
        var progress = 100;
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

    angularModule.controller("surveysListController", function ($scope) {
        $scope.surveys = surveyMock;
    });

    angularModule.controller("surveyController", function($scope, $routeParams){
        $scope.survey = getSurveyById($routeParams.id);
    });

    angularModule.controller("questionController", function($scope, $routeParams){
        var survey = getSurveyById($routeParams.sid);
        var questionIndex = getQuestionIndex(survey, $routeParams.qid);
        $scope.surveyName = survey.name;
        $scope.surveyId = survey.id;
        $scope.prevQuestionId = getPrevQuestionId(survey, questionIndex);
        $scope.nextQuestionId = getNextQuestionId(survey, questionIndex);
        $scope.question = getQuestionById(survey, $routeParams.qid);
        $scope.progress = getProgress(survey, questionIndex);
        $scope.questionIndex = questionIndex;
    });

})();