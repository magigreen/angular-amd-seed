angular.module('app')
    .controller('mainController', function(appOption,utilsService) {
        var i18n = utilsService.i18n;
        var mainCtrl = this;
        mainCtrl.fn = {};

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