
/*global angular:true, d3pie: true */
(function () {
    "use strict";
    var directiveModule = angular.module("SRV.directives", ["SRV.services"]);

    directiveModule.directive("chartForResult", ['$timeout', 'surveyStore', function ($timeout, surveyStore) {
        var pie;
        return {
            restrict: "E",
            scope: {
                qid: "@",
                sid: "@"
            },
            link: function (scope){
                var question = surveyStore.getQuestion(scope.sid, scope.qid);
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


})();