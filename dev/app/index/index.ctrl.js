angular.module('app')
    .controller('indexController', function(appOption, indexService,utilsService) {
        var i18n = utilsService.i18n;
        var indexCtrl = this;
        indexCtrl.data = indexService.data;
        indexCtrl.fn = {};

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