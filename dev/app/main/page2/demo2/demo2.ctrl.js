angular.module('app.page2.demo2')
    .controller('demo2Controller', function(appOption, utilsService, demo2Service) {
        var i18n = utilsService.i18n;
        var demo2Ctrl = this;
        demo2Ctrl.data = demo2Service.data;
        demo2Ctrl.fn = {};

        init();

        /*******************************************************************************
         *
         *  Function Definition
         *
         *******************************************************************************/
        function init() {
            console.log(demo2Ctrl.data.logText);
        }
    });
