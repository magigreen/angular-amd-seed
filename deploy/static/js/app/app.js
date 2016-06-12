angular.module('app', [
    /* 3-party module */
    'oc.lazyLoad',
    'ui.router',
    'pascalprecht.translate',

    /* core module */
    'app.common'
]);
angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/page1');
        $stateProvider
            .state('page1', {
                url: '/page1',
                controller: 'page1Controller',
                controllerAs: 'page1Ctrl',
                templateUrl: 'static/html/app/app-page1.html',
                resolve: {
                    page1Mdl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ['app-page1']
                        });
                    }]
                }
            })
            .state('page2', {
                url: '/page2',
                controller: 'page2Controller',
                controllerAs: 'page2Ctrl',
                templateUrl: 'static/html/app/app-page2.html',
                resolve: {
                    page2Mdl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            files: ['app-page2']
                        });
                    }]
                }
            })
            .state('page2.demo1', {
                url: '/demo1',
                controller: 'demo1Controller',
                controllerAs: 'demo1Ctrl',
                templateUrl: 'static/html/app/app-page2-demo1.html',
                resolve: {
                    page2Demo1Mdl: ['$ocLazyLoad', 'page2Mdl', function($ocLazyLoad, page2Mdl) {
                        return $ocLazyLoad.load({
                            files: ['app-page2-demo1']
                        });
                    }]
                }
            })
            .state('page2.demo2', {
                url: '/demo2',
                controller: 'demo2Controller',
                controllerAs: 'demo2Ctrl',
                templateUrl: 'static/html/app/app-page2-demo2.html',
                resolve: {
                    page2Demo2Mdl: ['$ocLazyLoad', 'page2Mdl', function($ocLazyLoad, page2Mdl) {
                        return $ocLazyLoad.load({
                            files: ['app-page2-demo2']
                        });
                    }]
                }
            })
    });

angular.module('app')
    .constant('appOption', {
        testOpt: 'I am test appOption!'
    });
angular.module('app')
    .config(function($translateProvider) {
        //default language
        $translateProvider.preferredLanguage('en');

        //fallback language if entry is not found in current language
        $translateProvider.fallbackLanguage('en');

        //load language entries from files
        $translateProvider.useStaticFilesLoader({
            prefix: 'static/i18n/messages.', //relative path Eg: /languages/
            suffix: '.json' //file extension
        });
    })
    .run(function($rootScope, $state) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                //do something ...
            });
    });

angular
    .module('app')
    .factory("appService", function(appOption, utilsService) {
        var i18n = utilsService.i18n;
        var data = {};
        return {
            data: data
        };
    });

angular.module('app')
    .controller('appController', function(appOption, appService, utilsService) {
        var i18n = utilsService.i18n;
        var appCtrl = this;
        appCtrl.data = appService.data;
        appCtrl.fn = {};

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

angular.module('app')
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
