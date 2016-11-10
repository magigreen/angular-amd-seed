requirejs.config({
    baseUrl: 'app/',
    urlArgs: '',
    waitSeconds: 0,

    /**
     *  [css loader]
     */
    map: {
        '*': {
            'css': 'plugin/js/require-css/require-css.min'
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
        'font-awesome<css>': 'plugin/css/fontawesome/css/font-awesome.min',

        //app module
        'app<css>': 'app',
        'app-page1<css>': 'page1/page1',
        'app-page2<css>': 'page2/page2',
        'app-page2-demo1<css>': 'page2/demo1/demo1',
        'app-page2-demo2<css>': 'page2/demo2/demo2',

        /**
         *  [js path]
         */

        //base plugin
        'angular': 'plugin/js/angular/angular.min',

        //angular 3-party module
        'ocLazyLoad-require': 'plugin/js/ocLazyLoad/ocLazyLoad.require.min',
        'angular-ui-router': 'plugin/js/angular-ui-router/angular-ui-router.min',
        'angular-translate': 'plugin/js/angular-translate/angular-translate.min',
        'angular-translate-loader-static-files': 'plugin/js/angular-translate-loader-static-files/angular-translate-loader-static-files.min',

        //app module
        'app': 'app.min',
        'app-common': 'common/common.min',
        'app-layout': 'layout/layout.min',

        'app-page1': 'page1/page1.min',
        'app-page2': 'page2/page2.min',
        'app-page2-demo1': 'page2/demo1/demo1.min',
        'app-page2-demo2': 'page2/demo2/demo2.min',

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
            'app-layout'
        ],
        'app-common': ['angular'],
        'app-layout': ['angular'],
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
