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
