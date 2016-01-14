/**
 * Created by lockonDaniel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.descriptor')
        .controller('tipoDescriptorController', tipoDescriptorController)
        .filter('matcher',matcher);

    /* @ngInject */
        function tipoDescriptorController($scope,Restangular,Translate,toastr,$mdDialog) {
        var vm = this;

        vm.tipos = [
            {
                "tipo" : "H",
                "descripcion":"Persona"
            },
            {
                "tipo" : "O",
                "descripcion":"Organizacion"
            },
            {
                "tipo" : "P",
                "descripcion":"Proyecto"
            },
            {
                "tipo" : "R",
                "descripcion":"Resultado"
            },
            {
                "tipo" : "F",
                "descripcion":"Programa de Fondeo"
            },
            {
                "tipo" : "A",
                "descripcion":"Todos"
            }
        ];

        vm.activate         = activate();
        //Variables
        vm.tipoDescriptor   = null;
        vm.addItem          = addItem;
        vm.createDialog     = createDialog;
        vm.deleteDescriptor = deleteDescriptor;
        vm.edit             = edit;
        vm.resetForm        = resetForm;

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
                vm.deleteDescriptor(item);
            }, function() {
                console.log("Cancelado");
            });
        }

        function resetForm()
        {
            vm.tipoDescriptor=null;
            $scope.agregarTipo.$setPristine();
        }

        function activate()
        {
            Restangular.all('TipoDescriptor').customGET().then(function(res){
                console.log(res.TipoDescriptor);
                vm.tiposDescriptor = res.TipoDescriptor;
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

        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;


        //////////////////
        function querySearch (query) {
            var results = query ? vm.tiposDescriptor.filter( createFilterFor(query) ) : vm.tiposDescriptor, deferred;
            return results;

        }


        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(tipoDescriptor) {
                return (tipoDescriptor.nombre.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        function deleteDescriptor(item){
            Restangular.one('TipoDescriptor',item.id).customDELETE().then(function(res){
                toastr.success(vm.successText,vm.successDeleteText);
                Restangular.all('TipoDescriptor').customGET().then(function(res){
                    vm.tiposDescriptor = res.TipoDescriptor;
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
                //IF Ternario
                vm.tipoDescriptor = item;
                item.Activo==1 ? vm.tipoDescriptor.Activo = true : vm.tipoDescriptor.Activo = false;
            }
        }


        /**
         * Create function to add item
         */

        function addItem()
        {
            //Restangular.all('TipoDescriptor') = http://127.0.0.1:8888/novaera_laravel/public/api/TipoDescriptor
            //Restangular.one('TipoDescriptor',1) = idem/TipoDescriptor/1
            if (vm.tipoDescriptor.id == null) {
                //Mandamos a grabar el tipo de descriptor
                console.log(vm.tipoDescriptor);
                Restangular.all('TipoDescriptor').customPOST(vm.tipoDescriptor).then(function(res){
                    //Mandamos el mensaje de éxito
                    toastr.success(vm.successText,vm.successStoreText);
                    //Limpiamos las variables ligadas a formulario
                    vm.tipoDescriptor.id = null;
                    vm.tipoDescriptor.Nombre = null;
                    vm.tipoDescriptor.Aplicable = null;
                    vm.tipoDescriptor.Activo = null;
                    vm.resetForm();
                    //Pedimos la lista de descriptores de la BD
                    Restangular.all('TipoDescriptor').customGET().then(function(res){
                        vm.tiposDescriptor = res.TipoDescriptor;
                    }).catch(function(err){

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
        }
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
