(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('registrarFondeosController', registrarFondeosController);

    /* @ngInject */
    function registrarFondeosController($scope, $timeout, $mdToast, $rootScope, $state) {

        var vm = this;
       //Var form

       //Var objeto
        vm.Fondeo=null;
        //arreglo de objetos Fondeo
        vm.Fondeos=null;
        //variables visibilidad o para controles
        vm.isDisabled         = false;

            //Pasos wizard
        vm.steps                    = [
            'FONDEOS.WIZARD.FEATURES',
            'FONDEOS.FEATURES.FONDEO_DESCRIPTION',
            'FONDEOS.FEATURES.FONDEO_SUPPORT',
            'FONDEOS.FEATURES.FONDEO_SELECTED',];

        vm.completed=100;
        vm.registrarFondeo = registrarfondeo;
        //////////////////

        // Registro de programa de fondeo
        function registrarfondeo() {
            if (vm.Fondeo.id != undefined) {
                Restangular.all('Fondeo').customPUT(vm.Fondeo).then(function (res) {
                    vm.Fondeo = res;
                    toastr.success("Los datos han sido actualizados correctamente");
                }).catch(function (err) {

                })
            }
            else {
                Restangular.all('Fondeo').customPOST(vm.Fondeo).then(function (res) {
                    vm.Fondeo = res;
                    toastr.success("Los datos han sido guardados correctamente");
                    }).catch(function (err) {

                })
            }
        }








    }

})

();
