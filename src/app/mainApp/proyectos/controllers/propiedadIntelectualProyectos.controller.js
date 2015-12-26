/**
 * Created by lockonDaniel on 10/16/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('propiedadIntelectualProyectosController', propiedadIntelectualProyectosController);

    /* @ngInject */
    function propiedadIntelectualProyectosController(Restangular,Translate,toastr,$mdDialog) {
        var vm = this;


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
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
                vm.proyectos = res.Proyectos;
            }).catch(function(err){

            });
            vm.sureText             = Translate.translate('PROJECT.DIALOGS.YOU_SURE');
            vm.acceptText           = Translate.translate('PROJECT.DIALOGS.ACCEPT');
            vm.cancelText           = Translate.translate('PROJECT.DIALOGS.CANCEL');
            vm.dialogText           = Translate.translate('PROJECT.DIALOGS.WARNING');
            vm.successText          = Translate.translate('PROJECT.DIALOGS.SUCCESS');
            vm.successStoreText     = Translate.translate('PROJECT.DIALOGS.SUCCESS_STORE');
            vm.successUpdateText    = Translate.translate('PROJECT.DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText    = Translate.translate('PROJECT.DIALOGS.SUCCESS_DELETE');
            vm.failureText          = Translate.translate('PROJECT.DIALOGS.FAILURE');
            vm.failureStoreText     = Translate.translate('PROJECT.DIALOGS.FAIL_STORE');
            vm.failureDeleteText    = Translate.translate('PROJECT.DIALOGS.FAIL_DELETE');
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

            if(vm.selectedPropiedad.id!=null)
            {
                Restangular.all('TransferenciaTecnologica').all('Update').customPOST(request).then(function(res)
                {
                    vm.selectedPropiedad = res.TransferenciaTecnologica;
                    toastr.success(vm.successText,vm.successUpdateText);
                }).catch(function(err)
                {
                    toastr.error(vm.failureText,vm.failureStoreText);
                })
            }
            else
            {
                Restangular.all('TransferenciaTecnologica').customPOST(request).then(function(res)
                {
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
            Restangular.one('TransferenciaTecnologica',vm.selectedPropiedad.id).customDELETE().then(function(res){
                toastr.success(vm.successText,vm.successDeleteText);
                Restangular.all('Proyecto').one('TransferenciaTecnologica',vm.selectedItem.id).customGET().then(function(res){
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

                Restangular.all('Proyecto').one('TransferenciaTecnologica',vm.selectedItem.id).customGET().then(function(res){
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
