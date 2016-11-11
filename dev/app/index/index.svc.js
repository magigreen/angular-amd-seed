angular
    .module('app')
    .factory("indexService", function(appOption, utilsService) {
        var i18n = utilsService.i18n;
        var data = {};
        return {
            data: data
        };
    });
