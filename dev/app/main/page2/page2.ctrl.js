angular.module('app.page2')
    .controller('page2Controller', function(appOption, utilsService, page2Service) {
        var i18n = utilsService.i18n;
        var page2Ctrl = this;
        page2Ctrl.data = page2Service.data;
        page2Ctrl.fn = {};

        init();

        /*******************************************************************************
         *
         *  Function Definition
         *
         *******************************************************************************/
        function init() {
            console.log(page2Ctrl.data.logText);
        }
    });