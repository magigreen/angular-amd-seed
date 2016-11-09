angular
    .module('app')
    .factory("appService", function(appOption, utilsService) {
        var i18n = utilsService.i18n;
        var data = {};
        return {
            data: data
        };
    });
