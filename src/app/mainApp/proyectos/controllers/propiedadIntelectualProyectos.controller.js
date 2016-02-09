/**
 * Created by lockonDaniel on 10/16/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('propiedadIntelectualProyectosController', propiedadIntelectualProyectosController);

    /* @ngInject */
    function propiedadIntelectualProyectosController(propiedadIntelectual,Proyecto,Operation,Translate,toastr,$mdDialog) {
        var vm = this;

        Operation.setTypeOperation("TransferenciaTecnologica");
        activate();
        //Variables para los registros de transferencia tecnologica
        vm.transferenciaRegisters        = null;
        vm.selectedPropiedad             = null;
        vm.addRegister                   = addRegister;
        vm.deleteRegister                = deleteRegister;
        vm.createDialog                  = createDialog;

        //Variables para el md-autocomplete

        vm.proyectos                     = null;
        vm.selectedItem                  = null;
        vm.searchText                    = null;
        vm.querySearch                   = querySearch;
        vm.simulateQuery                 = false;
        vm.isDisabled                    = false;
        vm.selectedItemChange            = selectedItemChange;




        function activate()
        {
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;
            });
            vm.sureText             = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText           = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText           = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText           = Translate.translate('DIALOGS.WARNING');
            vm.successText          = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText     = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText    = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText    = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText          = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText     = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText    = Translate.translate('DIALOGS.FAIL_DELETE');
        }


        /**
         * Función para agregar un nuevo registro de propiedad Intelectual
         */

        function addRegister()
        {
            var request = {
                idProyecto:vm.selectedItem.id,
                TransferenciaTecnologica:vm.selectedPropiedad
            };
            var promise = null;
            if(vm.selectedPropiedad.id==null || vm.selectedPropiedad.id==undefined)
            {
                promise = Operation.saveOperation(request);
                promise.then(function (res) {
                    vm.selectedPropiedad = res.TransferenciaTecnologica;
                    toastr.success(vm.successText,vm.successUpdateText);
                }).catch(function(err)
                {
                    toastr.error(vm.failureText,vm.failureStoreText);
                })
            }
            else
            {
                promise = Operation.updateOperation(request);
                promise.then(function (res) {
                    vm.selectedPropiedad = res.TransferenciaTecnologica;
                    toastr.success(vm.successText,vm.successStoreText);
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                })
            }
        }

        /**
         * Función para crear un dialogo
         * @param ev
         */


        function createDialog(ev)
        {

            vm.ev = ev;

            var confirm = $mdDialog.confirm()
                .title(vm.sureText)
                .content(vm.dialogText)
                .ariaLabel(vm.sureText)
                .targetEvent(ev)
                .ok(vm.acceptText)
                .cancel(vm.cancelText);
            $mdDialog.show(confirm).then(function() {
                vm.deleteRegister();
            }, function() {
                console.log("Cancelado");
            });


        }


        /**
         *Función para eliminar registro
         */

        function deleteRegister()
        {
            var promise=propiedadIntelectual.deletePropiedadIntelectual(vm.selectedPropiedad.id);
            promise.then(function(res){
                toastr.success(vm.successText,vm.successDeleteText);
                var proms=Proyecto.getProjectTransTecById(vm.selectedItem.id);
                proms.then(function(res){
                    vm.transferenciaRegisters = res.TransferenciaTecnologica;
                }).catch(function(err){

                });
            }).catch(function(err){
                toastr.error(vm.failureText,vm.failureDeleteText);
            });
        }


        /**
         * Funcion para cuando cambiamos el vm.selectedItem
         */

        function selectedItemChange()
        {
            if(vm.selectedItem!=null)
            {
                var proms=Proyecto.getProjectTransTecById(vm.selectedItem.id);
                proms.then(function(res){
                    vm.transferenciaRegisters = res.TransferenciaTecnologica;
                }).catch(function(err){

                })
            }
            else
            {
                vm.selectedPropiedad = null;
            }

        }


        /**
         * Función para buscar en el md-autocomplete
         * @param query
         * @returns {null|*}
         */

        function querySearch (query) {
            var results = query ? vm.proyectos.filter( createFilterFor(query) ) : vm.proyectos, deferred;
            return results;

        }


        /**
         * Función filtro
         */
        function createFilterFor(query) {

            return function filterFn(proyecto) {
                return (proyecto.Titulo.indexOf(query) === 0);
            };
        }






    }
})();
