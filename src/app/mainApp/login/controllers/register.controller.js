/**
 * Created by lockonDaniel on 12/20/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('registerController', registerController);

    /* @ngInject */
    function registerController($state,toastr,Restangular) {
        var vm = this;


        vm.user = null;

        vm.signup=signup;

        function signup()
        {
            Restangular.all('Register').customPOST(vm.user).then(function (res) {
                toastr.success('Éxito','Se ha registrado exitosamente');
                $state.go('auth.login');
            }).catch(function (err) {
                toastr.error('Error','Error al registrar usuario');
            })
        }

    }
})();