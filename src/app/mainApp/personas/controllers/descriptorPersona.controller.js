/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.personas')
        .controller('descriptorPersonasController', descriptorPersonasController)
        .filter('matcher',matcher);

    /* @ngInject */
    function descriptorPersonasController($scope,Restangular,Translate,toastr,$mdDialog) {
        var vm = this;


        vm.descriptores       = null;
        vm.persona            = null;
        vm.descriptorPersonas = null;
        vm.searchText         = null;
        vm.descriptor         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;
        vm.resetForm          = resetForm;
        vm.activate           = activate();
        vm.deleteItem         = deleteItem;
        vm.createDialog       = createDialog;
        vm.edit               = edit;

        function activate(){
            Restangular.all('Persona').all('Current').customGET().then(function(res){
                vm.persona = res.Persona;
                Restangular.all('Descriptor').customGET().then(function(res){
                    vm.descriptores = res.Descriptor;
                    Restangular.all('Persona').one('Descriptor',vm.persona.id).customGET().then(function(res){
                        vm.descriptorPersonas = res.Descriptor;
                    }).catch(function(err){

                    });
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
                vm.descriptor = item.pivot;
            }
        }

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
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
            var etapa = {
                id: $scope.etapa.id,
                tarea: $scope.etapa.tarea,
                tareaPrecedente: $scope.etapaPrecedente,
                entregable: $scope.entregable
            };



            $scope.etapa=null;
            $scope.etapaPrecedente=null;
            $scope.tarea=null;
            $scope.entregable =null;
            $scope.registrarResultado.$setPristine();

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
