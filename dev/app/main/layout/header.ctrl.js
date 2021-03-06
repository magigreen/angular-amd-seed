angular.module('app.layout')
    .controller('headerController', function(appOption, utilsService, $translate) {
        var i18n = utilsService.i18n;
        var headerCtrl = this;
        headerCtrl.data = {};
        headerCtrl.fn = {
            changeLang: changeLang
        };

        init();

        /*******************************************************************************
         *
         *  Function Definition
         *
         *******************************************************************************/
        function init() {
            console.log('load headerController!');
        }

        function changeLang(lang) {
            $translate.use(lang);
        }
    });
