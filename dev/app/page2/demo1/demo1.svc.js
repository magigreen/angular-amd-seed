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