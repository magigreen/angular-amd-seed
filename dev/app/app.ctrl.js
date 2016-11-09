angular.module('app')
    .controller('appController', function(appOption, appService, utilsService) {
        var i18n = utilsService.i18n;
        var appCtrl = this;
        appCtrl.data = appService.data;
        appCtrl.fn = {};

        init();

        /*******************************************************************************
         *
         *  Function Definition
         *
         *******************************************************************************/
        function init() {
            console.log('load appController!');
            console.log(appOption);
        }
    });