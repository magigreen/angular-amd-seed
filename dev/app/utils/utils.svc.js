angular
    .module('app.utils')
    .factory("utilsService", function($filter) {
        var utils = {
            i18n: i18n,
        };

        return utils;
        /*******************************************************************************
         *
         *  Angular plugin utils Function Definition
         *
         *******************************************************************************/

        /**
         * [i18n description]
         * @Fixme : only parse single char formatters eg. %s
         * @param  {string} message want to translate text
         * @return {object}         reurn 'angular-translate' plugin object
         */
        function i18n(message) {
            //return $filter('translate')(message);
            var message = $filter('translate')(message);
            if (arguments.length > 1) {
                // Explicit ordered parameters
                for (var i = 1; i < arguments.length; i++) {
                    var r = new RegExp("%" + i + "\\$\\w", "g");
                    message = message.replace(r, arguments[i]);
                }
                // Standard ordered parameters
                for (var i = 1; i < arguments.length; i++) {
                    message = message.replace(/%\w/, arguments[i]);
                }
            }
            // Decode encoded %% to single %
            message = message.replace("\0%\0", "%");
            // Imbricated messages
            var imbricated = message.match(/&\{.*?\}/g);
            if (imbricated) {
                for (var i = 0; i < imbricated.length; i++) {
                    var imbricated_code = imbricated[i].substring(2, imbricated[i].length - 1).replace(/^\s*(.*?)\s*$/, "$1");
                    message = message.replace(imbricated[i], i18nMessages[imbricated_code] || "");
                }
            }
            return message;
        }
    });
