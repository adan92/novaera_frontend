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
    function indexDescriptorController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;

        $scope.tiposDescriptor = [
            {
                id: 1,
                nombre: "Tipo de Descriptor 1",
                aplicable:"S",
                activo:true,
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            },
            {
                id: 2,
                nombre: "Tipo de Descriptor 2",
                aplicable:"S",
                activo:true,
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            }
        ];

        $scope.descriptores = [
            {
                id: 1,
                titulo: "Descriptor 1",
                descripcion:"Este es el Descriptor 1",
                catalogo:"Catalogo 1",
                tipo:{
                    id: 1,
                    nombre: "Descriptor 1",
                    aplicable:"S",
                    activo:true,
                    creado:"1970-01-01 00:00:01",
                    actualizado:"1970-01-01 00:00:01"
                },
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            }
        ];

        //

        vm.descriptores       = $scope.descriptores;
        vm.tiposDescriptor             = $scope.tiposDescriptor;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;


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
