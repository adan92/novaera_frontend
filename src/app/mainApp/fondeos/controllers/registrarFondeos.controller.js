(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('registrarFondeosController', registrarFondeosController);

    /* @ngInject */
    function registrarFondeosController($scope, $timeout, $rootScope, Fondeo, toastr, Restangular, $state, Translate) {

        var vm = this;
       //Var form

       //Var objeto
        vm.fondeo = {
            "id": null,
            "Titulo": null,
            "PublicoObjetivo": null,
            "FondoTotal": null,
            "Justificacion": null,
            "Descripcion": null,
            "RubrosDeApoyo": null,
            "CriteriosElegibilidad": null,
            "created_at": null,
            "updated_at": null
        };
        //arreglo de objetos Fondeo
        vm.Fondeos=null;
        //variables visibilidad o para controles
        vm.isDisabled         = false;
        vm.isNewFondeo = true;
            //Pasos wizard
        vm.steps                    = [
            'FONDEOS.WIZARD.FEATURES',
            'FONDEOS.FEATURES.FONDEO_DESCRIPTION',
            'FONDEOS.FEATURES.FONDEO_SUPPORT',
            'FONDEOS.FEATURES.FONDEO_SELECTED'];

        vm.completed=100;
        vm.selectedFondeo = null;
        vm.tmp = null;
        //Funciones del controller
        vm.registrarFondeo = registrarfondeo;
        vm.eliminarFondeo=eliminarFondeo;
        vm.getFondeo = getFondeo;
        vm.getFondeos = getFondeos;

        //////////////////
        //Funcion para buscar todos los Fondeos
        function getFondeos() {
            var promise = Fondeo.getAllFondeos();
            promise.then(function (value) {
                vm.tmp = value;
                vm.Fondeos=vm.tmp;
                console.log(vm.Fondeos)

            });
        }
        //Funcion para buscar Fondeos
        function getFondeo() {
            alert(vm.selectedFondeo)
            var promise = Fondeo.getFondeoById(vm.selectedFondeo);
            promise.then(function (value) {
                vm.fondeo = value;

            });
        }

        //Funcion Para eliminar Fondeos
        function eliminarFondeo() {

            var promise = Fondeo.deleteFondeo(vm.fondeo);
            promise.then(function (value) {
                toastr.success(vm.successDeleteText,vm.successDeleteText);
                vm.fondeo = {
                    "id": null,
                    "Titulo": null,
                    "PublicoObjetivo": null,
                    "FondoTotal": null,
                    "Justificacion": null,
                    "Descripcion": null,
                    "RubrosDeApoyo": null,
                    "CriteriosElegibilidad": null,
                    "created_at": null,
                    "updated_at": null
                };

            });
        }




        // Registro de programa de fondeo
        function registrarfondeo() {
            console.log("Entrando a la funcion");
            console.log(vm.fondeo)
            if (vm.fondeo.id == null) {
                console.log("Ya entre");
                var promise = Fondeo.crearFondeo(vm.fondeo);
                promise.then(function(res){
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.fondeo = res;
                    vm.fondeoLabel = vm.fondeo.Titulo;
                }).catch(function(err){
                    toastr.error(vm.failureText, vm.failureStoreText);
                });
            }
            else {
                console.log("Estoy editando");
                var promise = Fondeo.updateFondeo(vm.fondeo);
                promise.then(function(res){
                    toastr.success(vm.successText, vm.successUpdateText);
                    vm.fondeoLabel = vm.fondeo.Titulo;
                }).catch(function(err){
                    toastr.error(vm.failureText, vm.failureStoreText);
                });
            }
            console.log("Estoy Mostrando");
            var promise = Fondeo.getAllFondeos();
            promise.then(function (value) {
                vm.Fondeos = value;
            });
            //mensajes del toastr

            vm.sureText = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText = Translate.translate('DIALOGS.WARNING');
            vm.successText = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText = Translate.translate('DIALOGS.FAIL_DELETE');
        }









    }

})

();
