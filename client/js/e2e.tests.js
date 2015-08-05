
/* global describe: true, beforeEach: true, inject: true, it: true, module: true, expect: true*/


(function () {
    "use strict";
    describe('survey homepage', function() {
        it('should redirect index.html to index.html#/surveys', function () {
            browser.get('http://localhost:8123/index.html');
            browser.getLocationAbsUrl().then(function (url) {
                expect(url).toEqual('/surveys');
            });
        });

        it('used menu item should redirect to index.html#/used', function(){

        });
    });

})();