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
    function tipoDescriptorController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;

        $scope.tiposDescriptor = [
            {
                id: 1,
                nombre: "Descriptor 1",
                aplicable:"S",
                activo:true,
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            },
            {
                id: 2,
                nombre: "Descriptor 2",
                aplicable:"S",
                activo:true,
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            }
        ];
        //

        vm.tiposDescriptor             = $scope.tiposDescriptor;
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
        $scope.deleteItem= function(index){
            vm.tiposDescriptor.splice(index, 1);
            //console.log($scope.proyectos);
        };

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            var tipo = {
                id: $scope.id,
                nombre: $scope.nombre,
                aplicable:$scope.nombre,
                activo:$scope.activo,
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            };



            vm.tiposDescriptor.push(tipo);


            $scope.id = null;
            $scope.nombre = null;
            $scope.aplicable = null;
            $scope.activo = null;
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
