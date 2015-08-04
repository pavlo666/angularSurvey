/*global angular:true */
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

})();