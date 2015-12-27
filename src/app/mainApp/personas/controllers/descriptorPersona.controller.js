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
    function descriptorPersonasController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;

        $scope.personas = [
            {
                id: 1,
                nombre: "Jorge Erik",
                apellidoP:"Montiel",
                apellidoM:"Arguijo",
                Notas:"Amm",
                Descripcion:"Alto",
                idUser:2542,
                descriptorPersona:[
                ],
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            },
            {
                id: 2,
                nombre: "Francisco Javier",
                apellidoP:"Cerda",
                apellidoM:"Martinez",
                Notas:"Emm",
                Descripcion:"Inteligente",
                idUser:2543,
                descriptorPersona:[
                    {
                        id:120,
                        idDescriptor:1,
                        fechaInicio:"02/05/2015",
                        fechaTermino:"10/08/2015",
                        tipoResultado:"Satisfactorio",
                        noRegistro:"12684",
                        creado:"1970-01-01 00:00:01",
                        actualizado:"1970-01-01 00:00:01"
                    }
                ],
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            }
        ]

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
        ]

        vm.descriptores       = $scope.descriptores;
        vm.personas           = $scope.personas;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;


        //////////////////
        function querySearch (query) {
            var results = query ? vm.personas.filter( createFilterFor(query) ) : vm.personas, deferred;
            return results;

        }


        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(persona) {
                return (persona.nombre.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        $scope.deleteItem= function(index){
            vm.selectedItem.descriptorPersona.splice(index, 1);
            //console.log($scope.proyectos);
        }

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            var etapa = {
                id: $scope.etapa.id,
                tarea: $scope.etapa.tarea,
                tareaPrecedente: $scope.etapaPrecedente,
                entregable: $scope.entregable
            };



            vm.selectedItem.descriptorPersona.push(etapa);

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
