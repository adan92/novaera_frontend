/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('descriptorFondeoController', descriptorFondeoController)
        .filter('matcher',matcher);

    /* @ngInject */
    function descriptorFondeoController($scope,Restangular,Translate,toastr,$mdDialog) {
        var vm = this;

        //

        vm.descriptores       = null;
        vm.fondeos            = null;
        vm.descriptoresFondeo = null;
        vm.fondeoDescriptor   = null;
        vm.descriptor         = null;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;
        vm.resetForm          = resetForm;
        vm.activate           = activate();
        vm.deleteItem         = deleteItem;
        vm.createDialog       = createDialog;
        vm.selectedItemChange = selectedItemChange;


        function activate(){
            Restangular.all('ProgramaFondeo').customGET().then(function(res){
                vm.fondeos = res.ProgramaFondeo;
                console.log(vm.fondeos);
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
            //console.log(vm.selectedItem);
            if(vm.selectedItem.id != undefined  && vm.selectedItem != null) {
                //console.log("Pre-Descriptores:");
                Restangular.all('ProgramaFondeo').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                    console.log("Descriptoreindesds:");
                    vm.descriptoresFondeo = res.Descriptor;
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
            var results = query ? vm.fondeos.filter( createFilterFor(query) ) : vm.fondeos, deferred;
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

            return function filterFn(fondeos) {
                return (fondeos.Titulo.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        function deleteItem(item){
            console.log("Eliminar Descriptor");
            console.log(item);
            Restangular.all('ProgramaFondeo').one('Descriptor',item.pivot.idProgramaFondeo).all(item.pivot.id).customDELETE().then(function(res){
                console.log(res.Descriptor);
                toastr.success(vm.successText,vm.successDeleteText);
                Restangular.all('ProgramaFondeo').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                    vm.descriptoresFondeo = res.Descriptor;
                }).catch(function (err) {

                });
            }).catch(function(err){
                toastr.error(vm.failureText,vm.failureDeleteText);
            })
        };

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {

            vm.descriptor.idProgramaFondeo = vm.selectedItem.id;
            if (vm.descriptor.id == null) {
                //console.log('Agregar Descriptor Programa de Fondeo');
                //console.log(vm.descriptor);
                Restangular.all('ProgramaFondeo').all('Descriptor').customPOST(vm.descriptor).then(function(res){
                    //Mandamos el mensaje de éxito
                    toastr.success(vm.successText,vm.successStoreText);
                    //Limpiamos las variables ligadas a formulario
                    vm.descriptor.id           = null;
                    vm.descriptor.idDescriptor = null;
                    vm.descriptor.observaciones= null;
                    vm.resetForm();
                    //Pedimos la lista de descriptores de la BD
                    Restangular.all('ProgramaFondeo').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                        vm.descriptoresFondeo = res.Descriptor;
                    }).catch(function (err) {

                    });
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                });

            }
            else
            {
                //Mandamos a grabar el tipo de descriptor
                Restangular.one('TipoDescriptor',vm.tipoDescriptor.id).customPUT(vm.tipoDescriptor).then(function(res){
                    //Mandamos el mensaje de éxito
                    toastr.success(vm.successText,vm.successUpdateText);
                    //Limpiamos las variables ligadas a formulario
                    vm.tipoDescriptor.id = null;
                    vm.tipoDescriptor.Nombre = null;
                    vm.tipoDescriptor.Aplicable = null;
                    vm.tipoDescriptor.Activo = null;
                    //Pedimos la lista de descriptores de la BD
                    Restangular.all('TipoDescriptor').customGET().then(function(res){
                        vm.tiposDescriptor = res.TipoDescriptor;
                    }).catch(function(err){

                    });
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                });
            }

        };





    }

    function matcher()
    {
        return function(arr1,arr2){
            if(arr2===null)
                return true;

            return arr1.filter(function(val){

                var returnable=null;
                angular.forEach(arr2,function(item){
                    if(item.id==val.id)
                        returnable = false;
                },val);

                if(returnable===null)
                    return true;
                else return false;
            });
        };
    }
})

();
