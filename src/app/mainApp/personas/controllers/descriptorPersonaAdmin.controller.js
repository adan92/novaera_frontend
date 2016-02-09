/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.personas')
        .controller('descriptorPersonasAdminController', descriptorPersonasAdminController)
        .filter('matcher',matcher);

    /* @ngInject */
    function descriptorPersonasAdminController($scope,Restangular,Translate,toastr,$mdDialog) {
        var vm = this;


        vm.descriptor         = null;
        vm.personas           = null;
        vm.descriptorPersonas = null;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;
        vm.resetForm          = resetForm;
        vm.activate           = activate();
        vm.selectedItemChange = selectedItemChange;
        vm.deleteItem         = deleteItem;
        vm.createDialog       = createDialog;
        vm.edit               = edit;

        function activate(){
            Restangular.all('Persona').customGET().then(function(res){
                vm.personas = res.Personas;
                console.log(vm.personas);
                Restangular.all('Descriptor').customGET().then(function(res){
                    vm.descriptores = res.Descriptor;
                }).catch(function(err){

                });

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

        function selectedItemChange()
        {
            console.log("El Item cambio a: ");
            console.log(vm.selectedItem);
            if(vm.selectedItem.id != null) {

                Restangular.all('Persona').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                    vm.descriptorPersonas = res.Descriptor;
                    console.log(res.Descriptor);
                }).catch(function (err) {

                });
            }
        }

        function resetForm()
        {
            vm.descriptor=null;
            $scope.agregarDescriptor.$setPristine();
        }
        //////////////////
        function querySearch (query) {
            var results = query ? vm.personas.filter( createFilterFor(query) ) : vm.personas, deferred;
            return results;
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
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(persona) {
                return (persona.Nombre.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        function deleteItem(item){
            console.log("Eliminar Descriptor");
            console.log(item);
            //console.log("Persona/Descriptor/"+item.pivot.id+item.pivot.idPersona);

            Restangular.all('Persona').one('Descriptor',item.pivot.id).all(item.pivot.idPersona).customDELETE().then(function(res){
            //Restangular.all('Persona').one('Descriptor',item.pivot.id).customDELETE().then(function(res){
                    console.log(res.Descriptor);
                toastr.success(vm.successText,vm.successDeleteText);
                Restangular.all('Persona').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                    vm.descriptorPersonas = res.Descriptor;
                    console.log(res.Descriptor);
                }).catch(function (err) {

                });
            }).catch(function(err){
                toastr.error(vm.failureText,vm.failureDeleteText);
            })

        }

        function edit(item)
        {
            if(item!=undefined)
            {
                console.log(item.pivot);
                vm.descriptor = item.pivot;
            }
        }

        $scope.addItem = function()
        {
            vm.descriptor.idPersona = vm.selectedItem.id;
            if (vm.descriptor.id == null) {
                Restangular.all('Persona').all('Descriptor').customPOST(vm.descriptor).then(function(res){
                    toastr.success(vm.successText,vm.successStoreText);
                    vm.descriptor.idDescriptor      = null;
                    vm.descriptor.FechaInicio       = null;
                    vm.descriptor.FechaTermino      = null;
                    vm.descriptor.TipoResultado     = null;
                    vm.descriptor.NumeroRegistro    = null;
                    vm.resetForm();
                    Restangular.all('Persona').one('Descriptor',vm.selectedItem.id).customGET().then(function(res){
                        vm.descriptorPersonas = res.Descriptor;
                        console.log(res.Descriptor);
                    }).catch(function(err){

                    });
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                });
            }
            else
            {
                //Mandamos a grabar el tipo de descriptor
                console.log(vm.persona);
                Restangular.all('Persona').one('Descriptor', vm.selectedItem.id).customPUT(vm.descriptor).then(function(res){
                    //Mandamos el mensaje de éxito
                    toastr.success(vm.successText,vm.successUpdateText);
                    vm.descriptor.idDescriptor      = null;
                    vm.descriptor.FechaInicio       = null;
                    vm.descriptor.FechaTermino      = null;
                    vm.descriptor.TipoResultado     = null;
                    vm.descriptor.NumeroRegistro    = null;
                    //Pedimos la lista de descriptores de la BD
                    vm.resetForm();
                    Restangular.all('Persona').one('Descriptor',vm.selectedItem.id).customGET().then(function(res){
                        vm.descriptorPersonas = res.Descriptor;
                        console.log(res.Descriptor);
                    }).catch(function(err){

                    });
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                });
            }
        }





    }

    function matcher()
    {
        return function(arr1,arr2){
            if(arr2==null)
                return true;

            return arr1.filter(function(val){

                var returnable=null;
                angular.forEach(arr2,function(item){
                    if(item.id==val.id)
                        returnable = false;
                },val);

                if(returnable==null)
                    return true;
                else return false;
            })
        }
    }
})

();
