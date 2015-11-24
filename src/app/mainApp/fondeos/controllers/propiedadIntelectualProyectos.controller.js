/**
 * Created by lockonDaniel on 10/16/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('propiedadIntelectualProyectosController', propiedadIntelectualProyectosController);

    /* @ngInject */
    function propiedadIntelectualProyectosController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;

        //Lista de Proyectos

        $scope.show_add=true;
        $scope.show_info=true;
        $scope.proyecto = null;
        $scope.selectedPropiedad=null;
        $scope.proyectos=[
            {
                titulo:"Sistema de Registro de Emprendimiento en Guanajuato",
                descripcion: "Esta plataforma",
                objetivos: "<ul><li>Objetivo 1</li><li>Objetivo 2</li></ul>",
                etapas: [
                    {
                        id: 1,
                        tarea:'Tarea',
                        tareaPrecedente:'Tarea',
                        entregable: 'Entregable'
                    },
                    {
                        id: 2,
                        tarea:'Tarea2',
                        tareaPrecedente:'Tarea2',
                        entregable: 'Entregable2'
                    }

                ],
                trl:[
                    {id:1,descripcion:"Principios básicos observados y reportados", fecha:"10-10-2015"},
                    {id:2,descripcion:"Concepto y/o aplicación tecnológica formulado", fecha:"11-10-2015"}
                ],
                pi_tt:[
                    {
                        id: 1,
                        productos:"<h3>Productos de Propiedad</h3><br><ul><li>Producto 1</li></ul>",
                        procesos: "Procesos de transferencia",
                        valuacion:"<h3>Los procesos de Valuación fueron los Siguientes:</h3><ul><li>Se validó el uso de la tecnología con respecto a la competencia</li><li>Se validó que la tecnología fuera económicamente factible</li><li>Se validó el impacto que se tiene en el medio ambiente</li></ul><p>Cabe destacar que <b><u>ésta tecnología es nueva.</u></b></p><blockquote><p>Éste es solamente otro apartado</p></blockquote>"
                    },
                    {
                        id: 2,
                        productos:"Productos de propiedad",
                        procesos: "Procesos de transferencia",
                        valuacion:"La valoracion de la tecnología"
                    }
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
                        tarea:'Tarea',
                        tareaPrecedente:'Tarea',
                        entregable: 'Entregable'
                    },
                    {
                        id: 2,
                        tarea:'Tarea',
                        tareaPrecedente:'Tarea2',
                        entregable: 'Entregable2'
                    }

                ],
                trl:[
                    {id:1,descripcion:"Principios básicos observados y reportados", fecha:"10-10-2015"},
                    {id:2,descripcion:"Concepto y/o aplicación tecnológica formulado", fecha:"11-10-2015"}
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
                        tarea:'Tarea',
                        tareaPrecedente:'Tarea',
                        entregable: 'Entregable'
                    },
                    {
                        id: 2,
                        tarea:'Tarea2',
                        tareaPrecedente:'Tarea2',
                        entregable: 'Entregable2'
                    }

                ],
                trl:[
                    {id:1,descripcion:"Principios básicos observados y reportados", fecha:"10-10-2015"},
                    {id:2,descripcion:"Concepto y/o aplicación tecnológica formulado", fecha:"11-10-2015"}
                ],
                display:"Un proyecto mas"
            }
        ];

        //Variables para el md-autocomplete

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
         *
         * Create functions to add or delete elements
         */
        $scope.addElement = function()
        {
            $scope.proyecto.id =Math.floor((Math.random() * 10) + 2);

            vm.selectedItem.pi_tt.push($scope.proyecto);
            $scope.proyecto =null;
        }

        $scope.deleteItem= function(index){
            vm.selectedItem.pi_tt.splice(index, 1);
            //console.log($scope.proyectos);
        }

        /**
         * Watch para flex
         */

        $scope.$watchGroup(['selectedPropiedad'], function(newValues, oldValues, scope) {
            if(newValues[0]==null)
            {
                $scope.show_info=false;
            }
            else{
                $scope.show_info=true;
            }


        });


    }
})();
