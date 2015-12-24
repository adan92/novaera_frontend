/**
 * Created by lockonDaniel on 12/24/15.
 */
/**
 * Created by lockonDaniel on 12/12/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('Translate', Translate);

    /* @ngInject */
    function Translate($translate,localStorageService) {
        var service ={
            translate:translate
        }

        function translate(key)
        {
            $translate(key).then(function(text) {
                localStorageService.set(key, text);
            });

            var text = localStorageService.get(key) || null;
            console.log(text);
            localStorageService.remove(key);
            return text;
        }

        return service;



    }


})();
