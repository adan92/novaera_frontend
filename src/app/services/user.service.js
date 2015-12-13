/**
 * Created by lockonDaniel on 12/12/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('User', User);

    /* @ngInject */
    function User() {
        return {
            isLoggedIn : localStorage.isLoggedIn || false
        };

    }


})();
