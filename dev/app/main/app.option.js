angular.module('app')
    .constant('appOption', {
        API_ROOT_URL: window.location.origin, //!!!not change it 
        DEFAULT: {
            language: 'en'
        }
    });
