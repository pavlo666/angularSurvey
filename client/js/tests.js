/* global describe: true, beforeEach: true, inject: true, it: true, module: true, expect: true*/

(function () {
    "use strict";
        describe('questionController', function() {
            beforeEach(module('SRV'));

            var $controller;

            beforeEach(inject(function(_$controller_){
                $controller = _$controller_;
            }));

            describe('$scope.getProgress', function() {
                it('returns 0 for the first question of survey', function() {
                    var $scope = {};
                    var $routeParams = {sid : 0, qid: 0};
                    $controller('questionController', { $scope: $scope, $routeParams: $routeParams });
                    expect($scope.getProgress()).toEqual(0);
                });
            });
        });
})();