/**
 * Created by Jorge Montiel on 12/25/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.descriptor')
        .controller('indexDescriptorController', indexDescriptorController)
        .filter('matcher',matcher);

    /* @ngInject */
    function indexDescriptorController($scope,$mdDialog,Restangular,Translate,toastr,$mdToast) {
        var vm = this;

        vm.activate           = activate();
        vm.descriptores       = null;
        vm.tiposDescriptor    = null;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;
        vm.resetForm          = resetForm;
        vm.createDialog = createDialog;
        vm.deleteItem = deleteItem;

        function activate(){
            Restangular.all('Descriptor').customGET().then(function(res){
                vm.descriptores = res.Descriptor;
                Restangular.all('TipoDescriptor').customGET().then(function(res){
                    console.log(res.TipoDescriptor);
                    vm.tiposDescriptor = res.TipoDescriptor;
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


        function resetForm()
        {
            vm.descriptor=null;
            $scope.agregarTipo.$setPristine();
        }



        //////////////////
        function querySearch (query) {
            var results = query ? vm.descriptores.filter( createFilterFor(query) ) : vm.descriptores, deferred;
            return results;

        }


        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(tipoDescriptor) {
                return (descriptores.titulo.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        function deleteItem(item){
            Restangular.one('Descriptor',item.id).customDELETE().then(function(res){
                toastr.success(vm.successText,vm.successDeleteText);
                Restangular.all('Descriptor').customGET().then(function(res){
                    vm.descriptores = res.Descriptor;
                }).catch(function(err){

                });
            }).catch(function(err){
                toastr.error(vm.failureText,vm.failureDeleteText);
            })
        };

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
         * Create function to edit item
         */
        function edit(item)
        {
            if(item!=undefined)
            {
                vm.descriptor = item;
            }
        }

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            if (vm.descriptor.id == null) {
                Restangular.all('Descriptor').customPOST(vm.descriptor).then(function(res){
                    toastr.success(vm.successText,vm.successStoreText);
                    vm.descriptor.id = null;
                    vm.descriptor.Titulo = null;
                    vm.descriptor.Descripcion = null;
                    vm.descriptor.idTipoDescriptor = null;
                    //Pedimos la lista de descriptores de la BD
                    vm.resetForm();
                    Restangular.all('Descriptor').customGET().then(function(res){
                        vm.descriptores = res.Descriptor;
                    }).catch(function(err){

                    });
                }).catch(function(err){
                    toastr.error(vm.failureText,vm.failureStoreText);
                });

            }
            else
            {
                //Mandamos a grabar el tipo de descriptor
                Restangular.one('Descriptor',vm.descriptor.id).customPUT(vm.descriptor).then(function(res){
                    //Mandamos el mensaje de éxito
                    toastr.success(vm.successText,vm.successUpdateText);
                    vm.descriptor.id = null;
                    vm.descriptor.Titulo = null;
                    vm.descriptor.Descripcion = null;
                    vm.descriptor.idTipoDescriptor = null;
                    Restangular.all('Descriptor').customGET().then(function(res){
                        vm.descriptores = res.Descriptor;
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
