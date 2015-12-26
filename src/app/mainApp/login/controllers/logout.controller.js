/**
 * Created by lockonDaniel on 12/13/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('LogoutController', LogoutController);

    /* @ngInject */
    function LogoutController(Auth, User,$state) {
        var vm = this;
        vm.title = 'LogoutController';

        activate();

        ////////////////

        function activate() {
            Auth.logout();
            $state.go('auth.login');
        }
    }
})();