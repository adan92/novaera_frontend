(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('registrarFondeosController', registrarFondeosController);

    /* @ngInject */
    function registrarFondeosController($scope, $timeout, $mdToast, $rootScope, $state, Fondeo) {

        var vm = this;
       //Var form

       //Var objeto
        vm.fondeo = {
            "id": null,
            "Titulo": null,
            "PublicoObjetivo": null,
            "FondoTotal": null,
            "Justificacion": null,
            "CriteriosElegibilidad": null,
            "created_at": null,
            "updated_at": null
        };
        //arreglo de objetos Fondeo
        vm.Fondeos=null;
        //variables visibilidad o para controles
        vm.isDisabled         = false;

            //Pasos wizard
        vm.steps                    = [
            'FONDEOS.WIZARD.FEATURES',
            'FONDEOS.FEATURES.FONDEO_DESCRIPTION',
            'FONDEOS.FEATURES.FONDEO_SUPPORT',
            'FONDEOS.FEATURES.FONDEO_SELECTED'];

        vm.completed=100;
        vm.registrarFondeo = registrarfondeo;
        //////////////////

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
