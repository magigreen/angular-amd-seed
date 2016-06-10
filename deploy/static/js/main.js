requirejs.config({
    baseUrl: 'static/',
    urlArgs: '',
    waitSeconds: 0,

    /**
     *  [css loader]
     */
    map: {
        '*': {
            'css': 'js/plugin/require-css/require-css.min'
        }
    },

    /**
     *  [defined path]
     */
    paths: {
        /**
         *  [css path]
         */

        //base plugin
        'font-awesome<css>': 'css/plugin/fontawesome/css/font-awesome.min',

        //app module
        'app<css>': 'css/app/app',
        'app-page1<css>': 'css/app/app-page1',
        'app-page2<css>': 'css/app/app-page2',
        'app-page2-demo1<css>': 'css/app/app-page2-demo1',
        'app-page2-demo2<css>': 'css/app/app-page2-demo2',

        /**
         *  [js path]
         */

        //base plugin
        'angular': 'js/plugin/angular/angular.min',

        //angular 3-party module
        'ocLazyLoad-require': 'js/plugin/ocLazyLoad/ocLazyLoad.require.min',
        'angular-ui-router': 'js/plugin/angular-ui-router/angular-ui-router.min',
        'angular-translate': 'js/plugin/angular-translate/angular-translate.min',
        'angular-translate-loader-static-files': 'js/plugin/angular-translate-loader-static-files/angular-translate-loader-static-files.min',

        //app module
        'app': 'js/app/app',
        'app-common': 'js/app/app-common',

        'app-page1': 'js/app/app-page1',
        'app-page2': 'js/app/app-page2',
        'app-page2-demo1': 'js/app/app-page2-demo1',
        'app-page2-demo2': 'js/app/app-page2-demo2',

    },

    /**
     *  [defined load dependance]
     */
    shim: {
        //angular 3-party module
        'ocLazyLoad-require': ['angular'],
        'angular-ui-router': ['angular'],
        'angular-translate': ['angular'],
        'angular-translate-loader-static-files': ['angular-translate'],
        'app-common': ['angular'],

        //app module
        'app': [
            /* css module */
            'css!font-awesome<css>',
            'css!app<css>',

            /* js 3-party module */
            'ocLazyLoad-require',
            'angular-ui-router',
            'angular-translate',
            'angular-translate-loader-static-files',
            /* js core module */
            'app-common',
        ],
        'app-common': [],
        'app-page1': ['css!app-page1<css>'],
        'app-page2': ['css!app-page2<css>'],
        'app-page2-demo1': ['css!app-page2-demo1<css>'],
        'app-page2-demo2': ['css!app-page2-demo2<css>'],
    }
});


/**
 *  [Start the main app logic]
 */
require(['app'], function() {
    angular.bootstrap(document.querySelector("html"), ['app']);
});
