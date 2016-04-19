/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.personas')
        .controller('descriptorPersonasController', descriptorPersonasController);

    /* @ngInject */
    function descriptorPersonasController($translate,$scope,Descriptor,Restangular,Translate,toastr,$mdDialog,moment) {
        var vm = this;

        vm.language="en";
        vm.language=$translate.use();

        vm.tipoDescriptores             = null;
        vm.descriptores                 = null;
        vm.selectedTipoDescriptor       = null;
        vm.selectedDescriptor           = null;
        vm.loadingTipoDescriptorData    = true;
        vm.loadingDescriptorData        = false;

        vm.descriptores                 = null;
        vm.persona                      = null;
        vm.descriptorPersonas           = null;
        vm.searchText                   = null;
        vm.descriptor                   = null;
        vm.isDisabled                   = false;

        /*Funciones*/

        vm.resetForm                    = resetForm;
        vm.activate                     = activate();
        vm.deleteItem                   = deleteItem;
        vm.createDialog                 = createDialog;
        vm.edit                         = edit;
        vm.addItem                      = addItem;
        vm.getDescriptores              = getDescriptores;

        function activate(){
            Restangular.all('Persona').all('Current').customGET().then(function(res){
                vm.persona = res.Persona;
                Restangular.all('Persona').one('Descriptor', vm.persona.id).customGET().then(function (res) {
                    vm.descriptorPersonas = res.Descriptor;
                }).catch(function (err) {

                });
                getTipoDescriptores();

            }).catch(function(err){

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

        function getTipoDescriptores()
        {
            var promise = Descriptor.getTipoDescriptorByClasificacion('Persona');
            promise.then(function(res){
                vm.tipoDescriptores = res;
                vm.loadingTipoDescriptorData =false;
            }).catch(function(err){

            });
        }

        function getDescriptores() {
            vm.loadingDescriptorData = true;
            vm.descriptores = null;
            var promise = Descriptor.callAssosciated(vm.selectedTipoDescriptor);
            promise.then(function (res) {
                vm.descriptores = res.Descriptor;
                vm.loadingDescriptorData = false;
            }).catch(function (err) {

            });
        }

            function resetForm()
        {
            vm.descriptor=null;
            vm.selectedTipoDescriptor = null;
            $scope.agregarDescriptor.$setPristine();
        }


        function createDialog(ev,item)
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
                vm.deleteItem(item);
            }, function() {
                console.log("Cancelado");
            });
        }


        /**
         * Create function to delete item
         */
        function deleteItem(item){
            Restangular.all('Persona').one('Descriptor',item.pivot.id).customDELETE().then(function(res){
                toastr.success(vm.successText,vm.successDeleteText);
                Restangular.all('Persona').one('Descriptor',vm.persona.id).customGET().then(function(res){
                    vm.descriptorPersonas = res.Descriptor;
                }).catch(function(err){

                });
            }).catch(function(err){
                toastr.error(vm.failureText,vm.failureDeleteText);
            })
        }

        function edit(item)
        {
            if(item!=undefined)
            {
                vm.selectedTipoDescriptor = item.idTipoDescriptor;
                getDescriptores();
                vm.descriptor = item.pivot;
                vm.descriptor.FechaInicio=moment(vm.descriptor.FechaInicio,"DD-MM-YYYY");
                vm.descriptor.FechaTermino=moment(vm.descriptor.FechaTermino,"DD-MM-YYYY");

            }
        }

        /**
         * Create function to add item
         */

        function addItem()
        {

            vm.descriptor.FechaInicio  = moment(vm.descriptor.FechaInicio).format('YYYY-MM-DD');
            vm.descriptor.FechaTermino = moment(vm.descriptor.FechaTermino).format('YYYY-MM-DD');

            if (vm.descriptor.id == null) {
                Restangular.all('Persona').all('Descriptor').customPOST(vm.descriptor).then(function(res){
                    toastr.success(vm.successText,vm.successStoreText);
                    vm.descriptor.idDescriptor      = null;
                    vm.descriptor.FechaInicio       = null;
                    vm.descriptor.FechaTermino      = null;
                    vm.descriptor.TipoResultado     = null;
                    vm.descriptor.NumeroRegistro    = null;
                    //Pedimos la lista de descriptores de la BD
                    vm.resetForm();
                    Restangular.all('Persona').one('Descriptor',vm.persona.id).customGET().then(function(res){
                        vm.descriptorPersonas = res.Descriptor;
                    }).catch(function(err){

                    });
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                });

            }
            else
            {
                //Mandamos a grabar el tipo de descriptor
                Restangular.all('Persona').one('Descriptor', vm.persona.id).customPUT(vm.descriptor).then(function(res){
                    //Mandamos el mensaje de éxito
                    toastr.success(vm.successText,vm.successUpdateText);
                    vm.descriptor.idDescriptor      = null;
                    vm.descriptor.FechaInicio       = null;
                    vm.descriptor.FechaTermino      = null;
                    vm.descriptor.TipoResultado     = null;
                    vm.descriptor.NumeroRegistro    = null;
                    //Pedimos la lista de descriptores de la BD
                    vm.resetForm();
                    Restangular.all('Persona').one('Descriptor',vm.persona.id).customGET().then(function(res){
                        vm.descriptorPersonas = res.Descriptor;
                    }).catch(function(err){

                    });
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                });
            }




        }





    }

})

();
