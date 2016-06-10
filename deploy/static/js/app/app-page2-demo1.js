angular.module('app.page2.demo1', []);

angular
    .module('app.page2.demo1')
    .factory("demo1Service", function(appOption, utilsService) {
        var i18n = utilsService.i18n;
        var data = {
            logText: 'Load demo1Controller!'
        };
        return {
            data: data
        };
    });

angular.module('app.page2.demo1')
    .controller('demo1Controller', function(appOption, utilsService, demo1Service) {
        var i18n = utilsService.i18n;
        var demo1Ctrl = this;
        demo1Ctrl.data = demo1Service.data;
        demo1Ctrl.fn = {};

        init();

        /*******************************************************************************
         *
         *  Function Definition
         *
         *******************************************************************************/
        function init() {
            console.log(demo1Ctrl.data.logText);
        }
    });
