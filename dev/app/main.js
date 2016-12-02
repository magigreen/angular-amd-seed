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
        'bootstrap<css>': 'plugin/css/bootstrap/bootstrap.min',

        //angular plugin
        'angular-notify<css>': 'plugin/css/angular-notify/angular-notify.min',

        //app module
        'app<css>': 'main/app.min',
        'app-page1<css>': 'main/page1/page1.min',
        'app-page2<css>': 'main/page2/page2.min',
        'app-page2-demo1<css>': 'main/page2/demo1/demo1.min',
        'app-page2-demo2<css>': 'main/page2/demo2/demo2.min',

        /**
         *  [js path]
         */

        //base plugin
        'jquery': 'plugin/js/jquery/jquery.min',
        'bootstrap': 'plugin/js/bootstrap/bootstrap.min',
        'angular': 'plugin/js/angular/angular.min',
        'underscore': 'plugin/js/underscore/underscore-min',
        'moment': 'plugin/js/moment/moment.min',

        //angular 3-party module
        'ocLazyLoad-require': 'plugin/js/ocLazyLoad/ocLazyLoad.require.min',
        'angular-ui-router': 'plugin/js/angular-ui-router/angular-ui-router.min',
        'angular-translate': 'plugin/js/angular-translate/angular-translate.min',
        'angular-translate-loader-static-files': 'plugin/js/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
        'angular-messages': 'plugin/js/angular-messages/angular-messages.min',
        'angular-animate': 'plugin/js/angular-animate/angular-animate.min',
        'angular-notify': 'plugin/js/angular-notify/angular-notify.min',
        'angular-bootstrap': 'plugin/js/angular-bootstrap/ui-bootstrap-tpls.min',

        //app module
        'app': 'main/app.min',
        'app-common': 'main/common/app-common.min',
        'app-layout': 'main/layout/app-layout.min',

        'app-page1': 'main/page1/app-page1.min',
        'app-page2': 'main/page2/app-page2.min',
        'app-page2-demo1': 'main/page2/demo1/app-page2-demo1.min',
        'app-page2-demo2': 'main/page2/demo2/app-page2-demo2.min',

    },

    /**
     *  [defined load dependance]
     */
    shim: {
        //base plugin
        'bootstrap': ['jquery'],
        'moment': ['jquery'],
        'angular': [
            /* css module */
            'css!bootstrap<css>',
            'css!app<css>',

            'bootstrap'
        ],

        //angular 3-party module
        'ocLazyLoad-require': ['angular'],
        'angular-messages': ['angular'],
        'angular-ui-router': ['angular'],
        'angular-bootstrap': ['angular'],
        'angular-translate': ['angular'],
        'angular-translate-loader-static-files': ['angular-translate'],
        'angular-notify': ['css!angular-notify<css>', 'angular'],

        //app module
        'app': [
            /* angular 3-party module */
            'ocLazyLoad-require',
            'angular-messages',
            'angular-ui-router',
            'angular-bootstrap',
            'angular-translate',
            'angular-translate-loader-static-files',
            'angular-notify',

            /* angular core module */
            'app-common',
            'app-layout',
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
