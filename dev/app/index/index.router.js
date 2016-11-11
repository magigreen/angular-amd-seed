angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/page1');
        $stateProvider
            .state('page1', {
                url: '/page1',
                controller: 'page1Controller',
                controllerAs: 'page1Ctrl',
                templateUrl: 'app/page1/page1.html',
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
                templateUrl: 'app/page2/page2.html',
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
                templateUrl: 'app/page2/demo1/demo1.html',
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
                templateUrl: 'app/page2/demo2/demo2.html',
                resolve: {
                    page2Demo2Mdl: ['$ocLazyLoad', 'page2Mdl', function($ocLazyLoad, page2Mdl) {
                        return $ocLazyLoad.load({
                            files: ['app-page2-demo2']
                        });
                    }]
                }
            })
    });