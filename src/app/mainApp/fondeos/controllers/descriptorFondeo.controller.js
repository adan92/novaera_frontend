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
    function descriptorFondeoController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;

        $scope.descriptores = [
            {
                id: 1,
                titulo: "Descriptor 1",
                descripcion:"Este es el Descriptor 1",
                catalogo:"Catalogo 1",
                tipo:{
                    id: 1,
                    nombre: "Tipo 1",
                    aplicable:"S",
                    activo:true,
                    creado:"1970-01-01 00:00:01",
                    actualizado:"1970-01-01 00:00:01"
                },
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            },
            {
                id: 2,
                titulo: "Descriptor 2",
                descripcion:"Este es el Descriptor 2",
                catalogo:"Catalogo 5",
                tipo:{
                    id: 3,
                    nombre: "Tipo 3",
                    aplicable:"S",
                    activo:true,
                    creado:"1970-01-01 00:00:01",
                    actualizado:"1970-01-01 00:00:01"
                },
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            }
        ];

        $scope.fondeos = [
            {
                id:1,
                titulo:"Mi Proyecto",
                publico:"Jovenes 25-30",
                fondoTotal:"350,000.00 MXN",
                criterios:"Viable",
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01",
                descriptoresFondeos:[
                    {
                        id:15,
                        idDescriptor:3,
                        observaciones:"Proyecto basado en ..."
                    }
                ]
            }
        ];

        //

        vm.descriptores        = $scope.descriptores;
        vm.fondeos             = $scope.fondeos;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;


        //////////////////
        function querySearch (query) {
            var results = query ? vm.fondeos.filter( createFilterFor(query) ) : vm.fondeos, deferred;
            return results;

        }


        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(fondeos) {
                return (fondeos.titulo.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        $scope.deleteItem= function(index){
            vm.selectedItem.descriptoresFondeos.splice(index, 1);
            //console.log($scope.proyectos);
        };

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            var descriptor = {
                id: $scope.id,
                idDescriptor:$scope.tipo.id,
                observaciones:$scope.observaciones
            };



            vm.selectedItem.descriptoresFondeos.push(descriptor);

            $scope.id=null;
            $scope.tipo=null;
            $scope.observaciones=null;
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
