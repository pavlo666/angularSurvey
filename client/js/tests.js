

(function () {
    "use strict";
        describe('questionController', function() {
            beforeEach(module('SRV'));

            var $controller;

            beforeEach(inject(function(_$controller_){
                // The injector unwraps the underscores (_) from around the parameter names when matching
                $controller = _$controller_;
            }));

            describe('$scope.getProgress', function() {
                it('returns 0 for the first question of survey', function() {
                    var $scope = {};
                    var $routeParams = {sid : 0, qid: 0};
                    var controller = $controller('questionController', { $scope: $scope, $routeParams: $routeParams });
                    expect($scope.getProgress()).toEqual(0);
                });
            });
        });
})();