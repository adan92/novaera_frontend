/**
 * Created by lockonDaniel on 12/13/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('LogoutController', LogoutController);

    /* @ngInject */
    function LogoutController(Auth, $state) {
        var vm = this;
        vm.title = 'LogoutController';

        activate();

        ////////////////

        function activate() {
            Auth.logout();
            // localStorage.isLoggedIn = false;
            // User.isLoggedIn = false;
            $state.go('auth.login');
        }
    }
})();