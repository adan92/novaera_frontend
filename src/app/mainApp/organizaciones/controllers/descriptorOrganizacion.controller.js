/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.organizaciones')
        .controller('descriptorOrganizacionController', descriptorOrganizacionController)
        .filter('matcher',matcher);

    /* @ngInject */
    function descriptorOrganizacionController($scope,Restangular,Translate,toastr,$mdDialog) {
        var vm = this;

        vm.activate           = activate();

        //LISTA DE TODOD LOS TIPOS DE DESCRIPTOR
        vm.descriptores       = null;

        //LISTA DE ORGANIZACIONES
        vm.organizaciones     = null;

        //DESCRIPTOR ACTUAL
        vm.descriptor          = null;

        //DESCRIPTORES DE ORGANIZACION ACTUAL
        vm.descriptorPersonas = null;

        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;
        vm.createDialog       = createDialog;
        vm.edit               = edit;
        vm.deleteItem         = deleteItem;
        vm.resetForm          = resetForm;
        vm.selectedItemChange = selectedItemChange;

        function activate(){
            Restangular.all('Organizacion').customGET().then(function(res){
                vm.organizaciones = res.Organizacion;
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
            if(vm.selectedItem.id != null) {
                Restangular.all('Organizacion').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                    vm.descriptorPersonas = res.Descriptor;
                }).catch(function (err) {

                });
            }
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

        function resetForm()
        {
            vm.descriptor = null;
            $scope.registrarDescriptor.$setPristine();
        }

        function querySearch (query) {
            var results = query ? vm.organizaciones.filter( createFilterFor(query) ) : vm.organizaciones, deferred;
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(organizacion) {
                return (organizacion.Titulo.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        function deleteItem(item){
            Restangular.all('Organizacion').one('Descriptor',item.pivot.idOrganizacion).all(item.pivot.id).customDELETE().then(function(res){
                toastr.success(vm.successText,vm.successDeleteText);
                Restangular.all('Organizacion').one('Descriptor',vm.selectedItem.id).customGET().then(function(res){
                    vm.descriptorPersonas = res.Descriptor;
                }).catch(function(err){

                });
            }).catch(function(err){
                toastr.error(vm.failureText,vm.failureDeleteText);
            })
        }

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            vm.descriptor.idOrganizacion = vm.selectedItem.id;
            if (vm.descriptor.id == null) {
                Restangular.all('Organizacion').all('Descriptor').customPOST(vm.descriptor).then(function(res){
                    toastr.success(vm.successText,vm.successStoreText);
                    //Limpiamos las variables ligadas a formulario
                    vm.descriptor.idDescriptor = null;
                    vm.descriptor.FechaInicio = null;
                    vm.descriptor.FechaTermino = null;
                    vm.descriptor.NumeroRegistro = null;
                    vm.descriptor.TipoResultado = null;
                    vm.resetForm();
                    //Pedimos la lista de descriptores de la BD
                    Restangular.all('Organizacion').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                        vm.descriptorPersonas = res.Descriptor;
                    }).catch(function (err) {

                    });
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                });
            }
            else
            {
                Restangular.all('Organizacion').one('Descriptor',vm.descriptor.id).customPUT(vm.descriptor).then(function(res){
                    toastr.success(vm.successText,vm.successStoreText);
                    //Limpiamos las variables ligadas a formulario
                    vm.descriptor.idDescriptor = null;
                    vm.descriptor.FechaInicio = null;
                    vm.descriptor.FechaTermino = null;
                    vm.descriptor.NumeroRegistro = null;
                    vm.descriptor.TipoResultado = null;
                    vm.resetForm();
                    //Pedimos la lista de descriptores de la BD
                    Restangular.all('Organizacion').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                        vm.descriptorPersonas = res.Descriptor;
                    }).catch(function (err) {

                    });
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                });
            }
        }

        function edit(item)
        {
            if(item!=undefined)
            {
                vm.descriptor = item.pivot;
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
