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
    function indexDescriptorController($scope,Restangular,Translate,toastr,$mdToast) {
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
            vm.descriptor=null
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
        $scope.deleteItem= function(index){
            vm.descriptores.splice(index, 1);
            //console.log($scope.proyectos);
        };

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            var descriptor = {
                id: $scope.id,
                titulo: $scope.titulo,
                descripcion:$scope.descripcion,
                catalogo:$scope.catalog,
                tipo:$scope.tipo,
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            };



            vm.descriptores.push(descriptor);


            $scope.id = null;
            $scope.titulo = null;
            $scope.descripcion = null;
            $scope.catalogo = null;
            $scope.tipo = null;
            $scope.creado = null;
            $scope.actualizado = null;
            $scope.registrarResultado.$setPristine();

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
