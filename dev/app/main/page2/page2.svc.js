angular
    .module('app.page2')
    .factory("page2Service", function(appOption, utilsService) {
        var i18n = utilsService.i18n;
        var data = {
            logText: 'Load page2Controller!'
        };
        return {
            data: data
        };
    });