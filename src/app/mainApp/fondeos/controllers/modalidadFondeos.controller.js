(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('modalidadFondeosController', modalidadFondeosController);

    /* @ngInject */

    function  modalidadFondeosController( $timeout ,$mdDialog,$rootScope,Modalidad,Fondeo, toastr, Restangular, $state, Translate) {
        var vm = this;
        vm.activate = activate();
        //Inicializacion objetos
        //Programas de Fondeo
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
        //Objeto de Modalidad.
        vm.Modalidad ={
            "id": null,
            "idProgramaFondeo":null,
            "Nombre":null,
            "Montos":null,
            "FigurasApoyo":null,
            "CriteriosEvaluacion":null,
            "Entregables":null,
            "created_at":null,
            "updated_at":null
        }


        //arreglo de modalidades
        vm.Modalidades=null;
        vm.ModalidadesFondeo=null;
        //variables
        vm.selectedFondeo = null;
        vm.tmp = null;
        vm.selectedModalidad =null;

        //controles GUIS
        vm.isDisabled = false;
        vm.isNewModalidad = true;

        //Declaracion de Funciones
        vm.registrarModalidad = registrarModalidad;
        vm.eliminarModalidad=eliminarModalidad;
        vm.getModalidad = getModalidad;
        vm.getModalidades = getModalidades;
        vm.createDialog = createDialog;
        vm.getFondeos = getFondeos;
        vm.cancel =cancel;

        function activate()
        {
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
            getFondeos();
            getModalidades();

        }


        //Funcionalidades

        //Obtener todos los fondeos
        function getFondeos() {
            var promise = Fondeo.getAllFondeos();
            promise.then(function (value) {
                vm.Fondeos = value;
                console.log(vm.Fondeos)

            });
        }

        //Obtener todos las Modalidades
        function getModalidades() {
            var promise = Modalidad.getAllModalidades();
            promise.then(function (value) {
                vm.tmp = value;
                vm.Modalidades=vm.tmp;

                console.log(vm.Modalidades)

            });
        }
        //Funcion para Seleccionar 1 Modalidad
        function getModalidad() {
            console.log("Ya seleccione");
            console.log(vm.selectedModalidad);
          vm.Modalidad=vm.selectedModalidad;
            console.log("Modalidad Seleccionada:");
            console.log(vm.Modalidad);
            var i=0;
            vm.Fondeos.forEach(
                function BuscaFondos(fondo,index){
                if(fondo.id==vm.Modalidad.idProgramaFondeo){
                    vm.selectedFondeo=fondo;
                    console.log(vm.selectedFondeo);
                }
                else{
                    console.log("No hice nada aumentare i");
                }

            });
        }
        function cancel() {

            vm.selectedFondeo=null;
            vm.fondeo = null;
            vm.isNewFondeo=true;
            vm.Modalidad=null;
            vm.selectedModalidad=null;
            vm.isNewModalidad=null;



        }

        //Funcion Para eliminar Modalidades
        function eliminarModalidad() {

            var promise = Modalidad.deleteModalidad(vm.Modalidad);
            promise.then(function (value) {
                toastr.success(vm.successDeleteText,vm.successDeleteText);
                vm.Modalidad = {
                    "id": null,
                    "idProgramaFondeo":null,
                    "Nombre":null,
                    "Montos":null,
                    "CriteriosEvaluacion":null,
                    "Entregables":null,
                    "FigurasApoyo":null,
                    "created_at":null,
                    "updated_at":null
                };
                getModalidades();
            });

        }




        // Registro de Modalidad
        function registrarModalidad() {
            vm.Modalidad.idProgramaFondeo=vm.selectedFondeo.id;
            console.log("Entrando a la funcion");
            console.log(vm.Modalidad)
            if (vm.Modalidad.id == null) {
                console.log("Creando Modalidad");
                var promise = Modalidad.crearModalidad(vm.Modalidad);
                promise.then(function(res){
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.Modalidad = res;
                    vm.ModalidadLabel = vm.Modalidad.Nombre;
                }).catch(function(err){
                    toastr.error(vm.failureText, vm.failureStoreText);
                    console.log(err);
                });
            }
            else {
                console.log("Estoy editando");
                var promise = Modalidad.updateModalidad(vm.Modalidad);
                promise.then(function(res){
                    toastr.success(vm.successText, vm.successUpdateText);
                    vm.ModalidadLabel = vm.Modalidad.Nombre;
                }).catch(function(err){
                    toastr.error(vm.failureText, vm.failureStoreText);
                    console.log(err);
                });
            }

            console.log("Estoy Actualizando Lista de Modalidades");
            var promise = Modalidad.getAllModalidades();
            promise.then(function (value) {
                vm.Modalidades = value;
            });
       }

        function createDialog(ev)
        {
            vm.ev = ev;
            console.log("Entre al dialog");
            var confirm = $mdDialog.confirm()
                .title(vm.sureText)
                .content(vm.dialogText)
                .ariaLabel(vm.sureText)
                .targetEvent(ev)
                .ok(vm.acceptText)
                .cancel(vm.cancelText);

            $mdDialog.show(confirm).then(function() {
                vm.eliminarModalidad();
            }, function() {
                console.log("Cancelado");
            });
        }


    }})();
