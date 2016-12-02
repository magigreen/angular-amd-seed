angular
    .module('app.page2.demo2')
    .factory("demo2Service", function(appOption, utilsService) {
        var i18n = utilsService.i18n;
        var data = {
            logText: 'Load demo2Controller!'
        };
        return {
            data: data
        };
    });