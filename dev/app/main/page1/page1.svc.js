angular
    .module('app.page1')
    .factory("page1Service", function(appOption, utilsService) {
        var i18n = utilsService.i18n;
        var data = {
            logText: 'Load page1Controller!'
        };
        return {
            data: data
        };
    });