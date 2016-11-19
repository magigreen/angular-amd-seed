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
        'jquery': "plugin/js/jquery/jquery.min",
        'bootstrap': 'plugin/js/bootstrap/bootstrap.min',
        'angular': 'plugin/js/angular/angular.min',

        //angular 3-party module
        'ocLazyLoad-require': 'plugin/js/ocLazyLoad/ocLazyLoad.require.min',
        'angular-ui-router': 'plugin/js/angular-ui-router/angular-ui-router.min',
        'ui-bootstrap': 'plugin/js/ui-bootstrap/ui-bootstrap-tpls.min',
        'angular-animate': 'plugin/js/angular-animate/angular-animate.min',
        'angular-messages': 'plugin/js/angular-messages/angular-messages.min',
        'angular-translate': 'plugin/js/angular-translate/angular-translate.min',
        'angular-translate-loader-static-files': 'plugin/js/angular-translate-loader-static-files/angular-translate-loader-static-files.min',

        //app module
        'app': 'main/app.min',
        'app-common': 'main/common/common.min',
        'app-layout': 'main/layout/layout.min',

        'app-page1': 'main/page1/page1.min',
        'app-page2': 'main/page2/page2.min',
        'app-page2-demo1': 'main/page2/demo1/demo1.min',
        'app-page2-demo2': 'main/page2/demo2/demo2.min',

    },

    /**
     *  [defined load dependance]
     */
    shim: {
        //base plugin
        'bootstrap': ['css!bootstrap<css>', 'jquery'],
        'angular': ['bootstrap'],

        //angular 3-party module
        'ocLazyLoad-require': ['angular'],
        'angular-ui-router': ['angular'],
        'ui-bootstrap': ['angular'],
        'angular-animate': ['angular'],
        'angular-messages': ['angular'],
        'angular-translate': ['angular'],
        'angular-translate-loader-static-files': ['angular-translate'],

        //app module
        'app': [
            /* css module */
            'css!app<css>',

            /* js 3-party module */
            'ocLazyLoad-require',
            'angular-ui-router',
            'ui-bootstrap',
            'angular-animate',
            'angular-messages',
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
