angular.module('app.page1', []);

angular
    .module('app.page1')
    .factory("page1Service", function(appOption, utilsService) {
        var i18n = utilsService.i18n;
        var data = {
            logText: 'Load page1Controller!'
        };
        return {
            data: data
        };
    });

angular.module('app.page1')
    .controller('page1Controller', function(appOption, utilsService, page1Service) {
        var i18n = utilsService.i18n;
        var page1Ctrl = this;
        page1Ctrl.data = page1Service.data;
        page1Ctrl.fn = {};

        init();

        /*******************************************************************************
         *
         *  Function Definition
         *
         *******************************************************************************/
        function init() {
            console.log(page1Ctrl.data.logText);
        }
    });
