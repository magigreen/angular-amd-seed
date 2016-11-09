angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/page1');
        $stateProvider
            .state('page1', {
                url: '/page1',
                controller: 'page1Controller',
                controllerAs: 'page1Ctrl',
                templateUrl: 'app/page1.tpl.html',
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
                templateUrl: 'app/page2.tpl.html',
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
                templateUrl: 'app/page2/demo1.tpl.html',
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
                templateUrl: 'app/page2/demo2.tpl.html',
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
