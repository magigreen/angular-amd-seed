angular.module('app')
    .config(function($translateProvider) {
        //default language
        $translateProvider.preferredLanguage('en');

        //fallback language if entry is not found in current language
        $translateProvider.fallbackLanguage('en');

        //load language entries from files
        $translateProvider.useStaticFilesLoader({
            prefix: 'app/i18n/messages.', //relative path Eg: /languages/
            suffix: '.json' //file extension
        });
    })
    .run(function($rootScope, $state) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                //do something ...
            });
    });
