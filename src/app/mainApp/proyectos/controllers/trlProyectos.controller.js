/**
 * Created by lockonDaniel on 10/16/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('trlProyectosController', trlProyectosController);

    /* @ngInject */
    function trlProyectosController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;

        $scope.newTRL = null;
        $scope.newTRLDate = null;

        //Lista de TRL
        $scope.trl = [
            {id:1,descripcion:"Principios básicos observados y reportados"},
            {id:2,descripcion:"Concepto y/o aplicación tecnológica formulado"},
            {id:3,descripcion:"Prueba de concepto y/o función crítica analítica y experimental "},
            {id:4,descripcion:"Validación de componentes o subsistemas en entorno de laboratorio"},
            {id:5,descripcion:"Validación de sistema/subsistema/componentes en el entorno relevante"},
            {id:6,descripcion:"Prototipado en un entorno relevante de principio a fin"},
            {id:7,descripcion:"Prototipado  y demostración en un entorno operacional"},
            {id:8,descripcion:"Sistema completo y calificado para utilizarse en el entorno operacional"},
            {id:9,descripcion:"Sistema probado a través de operaciones exitosas"}];

        //Lists de estadísticas
        $scope.estadisticas ={
            data:[4,2,7,9,1,3,0,1,0],
            labels:['TRL1','TRL2','TRL3','TRL4','TRL5','TRL6','TRL7','TRL8','TRL9']
        }

        //Lista de proyectos
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


        //Config for tables

        vm.columns = [
            {
            title: 'TRL',
            field: 'id',
            sortable: true
        },
            {
            title: 'Descripcion',
            field: 'descripcion',
            sortable: false
        },
            {
            title: 'Fecha',
            field: 'fecha',
            sortable: true
        }];

        /**
         * Create Function to Add Item
         */

        $scope.addItem = function()
        {
            var addTRL = angular.fromJson($scope.newTRL);
            addTRL.fecha= moment($scope.newTRLDate).format('DD-MM-YYYY');
            vm.selectedItem.trl.push(addTRL);
            $scope.newTRL=null;
            $scope.newTRLDate=null;
        }



    }





})


();
