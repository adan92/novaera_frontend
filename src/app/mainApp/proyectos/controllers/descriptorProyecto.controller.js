/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('descriptorProyectoController', descriptorProyectoController)
        .filter('matcher',matcher);

    /* @ngInject */
    function descriptorProyectoController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        $scope.proyectos=[
            {
                titulo:"Sistema de Registro de Emprendimiento en Guanajuato",
                descripcion: "Esta plataforma",
                objetivos: "<ul><li>Objetivo 1</li><li>Objetivo 2</li></ul>",
                etapas: [
                    {
                        id: 1,
                        "fechaInicio": "05/01/2012",
                        "fechaAprobado": "10/01/2012",
                        "pct": "10",
                        "idDescriptor": "50125"
                        //Descriptor?
                    },
                    {
                        id: 2,
                        "fechaInicio": "15/01/2012",
                        "fechaAprobado": "20/01/2012",
                        "pct": "25",
                        "idDescriptor": "50130"
                        //Descriptor?
                    },
                    {
                        id: 3,
                        "fechaInicio": "30/01/2012",
                        "fechaAprobado": "05/02/2012",
                        "pct": "30",
                        "idDescriptor": "50132"
                        //Descriptor?
                    }
                ],
                trl:[
                    {descripcion:"Empezando", fecha:"10-10-2015"},
                    {descripcion:"En Proceso", fecha:"11-10-2015"}
                ],
                descriptorProyecto:[],
                display:"Sistema de Registro"

            },
            {
                titulo:"Otro proyecto",
                descripcion: "El proyecto a realizar",
                objetivos: "<ul><li>Objetivo 1</li><li>Objetivo 2</li></ul>",
                etapas: [
                    {
                        id: 1,
                        "fechaInicio": "05/01/2012",
                        "fechaAprobado": "10/01/2012",
                        "pct": "10",
                        "idDescriptor": "50125"
                    },
                    {
                        id: 2,
                        "fechaInicio": "15/01/2012",
                        "fechaAprobado": "20/01/2012",
                        "pct": "25",
                        "idDescriptor": "50130"
                    },
                    {
                        id: 3,
                        "fechaInicio": "30/01/2012",
                        "fechaAprobado": "05/02/2012",
                        "pct": "30",
                        "idDescriptor": "50132"
                    }

                ],
                trl:[
                    {descripcion:"Empezando", fecha:"10-10-2015"},
                    {descripcion:"En Proceso", fecha:"11-10-2015"}
                ],
                descriptorProyecto:[
                    {
                        id: 15,
                        idDescriptor:1,
                        observaciones:"Descriptor que significa..."
                    }
                ],
                display:"Otro proyecto"
            },
            {
                titulo:"Un proyecto mas",
                descripcion: "Es nuevo proyecto",
                objetivos: "<ul><li>Objetivo 1</li><li>Objetivo 2</li></ul>",
                etapas: [
                    {
                        id: 1,
                        "fechaInicio": "05/01/2012",
                        "fechaAprobado": "10/01/2012",
                        "pct": "10",
                        "idDescriptor": "50125"
                    },
                    {
                        id: 2,
                        "fechaInicio": "15/01/2012",
                        "fechaAprobado": "20/01/2012",
                        "pct": "25",
                        "idDescriptor": "50130"
                    },
                    {
                        id: 3,
                        "fechaInicio": "30/01/2012",
                        "fechaAprobado": "05/02/2012",
                        "pct": "30",
                        "idDescriptor": "50132"
                    }

                ],
                trl:[
                    {descripcion:"Empezando", fecha:"10-10-2015"},
                    {descripcion:"En Proceso", fecha:"11-10-2015"}
                ],
                descriptorProyecto:[],
                display:"Un proyecto mas"
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

        //

        vm.descriptores        = $scope.descriptores;
        vm.fondeos             = $scope.proyectos;
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
            vm.selectedItem.descriptorProyecto.splice(index, 1);
            //console.log($scope.proyectos);
        }

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



            vm.selectedItem.descriptorProyecto.push(descriptor);

            $scope.id=null;
            $scope.tipo=null;
            $scope.observaciones=null;
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
