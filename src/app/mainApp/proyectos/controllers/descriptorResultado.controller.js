/**
 * Created by lockonDaniel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('descriptorResultadoController', descriptorResultadoController)
        .filter('matcher',matcher);

    /* @ngInject */
    function descriptorResultadoController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;


        //Datos
        $scope.descriptor=[
            {
                id:0,
                titulo:"Nulo"
            },
            {
                id:1,
                titulo:"Bajo"
            },
            {
                id:2,
                titulo:"Medio"
            },
            {
                id:3,
                titulo:"Alto"
            },
            {
                id:4,
                titulo:"Completo"
            },
        ]

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
                display:"Un proyecto mas"
            }
        ];
        $scope.my_projects_labels= ['Electricidad','Agronomía','Calzado'];
        $scope.my_projects_data= ['3','5','6'];


        //

        vm.proyectos             = $scope.proyectos;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;


        //////////////////
        function querySearch (query) {
            var results = query ? vm.proyectos.filter( createFilterFor(query) ) : vm.proyectos, deferred;
            return results;

        }


        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(proyecto) {
                return (proyecto.titulo.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        $scope.deleteItem= function(index){
            vm.selectedItem.etapas.splice(index, 1);
            //console.log($scope.proyectos);
        }

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            var etapa = {

                id: $scope.id,
                "fechaInicio": $scope.fInicio,
                "fechaAprobado": $scope.fFin,
                "pct": $scope.clvPct,
                "idDescriptor": $scope.idDescriptor

            };



            vm.selectedItem.etapas.push(etapa);

            $scope.id=null;
            $scope.fInicio=null;
            $scope.fFin=null;
            $scope.clvPct=null;
            $scope.idDescriptor=null;
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
