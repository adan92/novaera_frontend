/**
 * Created by lockonDaniel on 10/18/15.
 */
/**
 * Created by lockonDaniel on 10/16/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('modalidadesProyectosController', modalidadesProyectosController);

    /* @ngInject */
    function modalidadesProyectosController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        $scope.proyecto = {};


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
                resultados:[
                    {
                        id:1,
                        nombre: 'Resultado 1',
                        descripcion: 'El Resultado',
                        palabras_clave: 'Resultado, Proyecto, Desarrollo',
                        area_aplicacion: 'Venta de Proyectos',
                        tipo: 'Proceso',
                        fecha: '12-10-2010',
                        avance: 'Completado',
                        status: 'Operativo',
                        plan_explotacion: 'El plan es que se registren las personas dentro del sistema'
                    },
                    {
                        id:1,
                        nombre: 'Resultado 2',
                        descripcion: 'El Resultado 2',
                        palabras_clave: 'Resultado, Proyecto, Desarrollo',
                        area_aplicacion: 'Venta de Proyectos',
                        tipo: 'Producto',
                        fecha: '12-10-2010',
                        avance: 'Completado',
                        status: 'Operativo',
                        plan_explotacion: 'El plan es que se registren las personas dentro del sistema'
                    }
                ],
                patentes:[
                    {
                        id:1,
                        titulo:'Título de la patente',
                        resumen: 'El sistema de registro de proyectos de emprendimiento es un sistema responsivo',
                        fecha_registro:'18-10-2015',
                        fecha_aprobacion:'19-10-2015',
                        numero_registro:'123456789',
                        paises_proteccion: 'Mexico, EUA, Canadá',
                        plan_explotacion: 'El plan es que se registren las personas dentro del sistema'
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
                resultados:[
                    {
                        id:1,
                        nombre: 'Resultado 1',
                        descripcion: 'El Resultado',
                        palabras_clave: 'Resultado, Proyecto, Desarrollo',
                        area_aplicacion: 'Venta de Proyectos',
                        tipo: 'Proceso',
                        fecha: '12-10-2010',
                        avance: 'Completado',
                        status: 'Operativo',
                        plan_explotacion: 'El plan es que se registren las personas dentro del sistema'
                    },
                    {
                        id:1,
                        nombre: 'Resultado 2',
                        descripcion: 'El Resultado 2',
                        palabras_clave: 'Resultado, Proyecto, Desarrollo',
                        area_aplicacion: 'Venta de Proyectos',
                        tipo: 'Producto',
                        fecha: '12-10-2010',
                        avance: 'Completado',
                        status: 'Operativo',
                        plan_explotacion: 'El plan es que se registren las personas dentro del sistema'
                    }
                ],
                patentes:[
                    {
                        id:1,
                        titulo:'Título de la patente',
                        resumen: 'El sistema de registro de proyectos de emprendimiento es un sistema responsivo',
                        fecha_registro:'18-10-2015',
                        fecha_aprobacion:'19-10-2015',
                        numero_registro:'123456789',
                        paises_proteccion: 'Mexico, EUA, Canadá',
                        plan_explotacion: 'El plan es que se registren las personas dentro del sistema'
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
                resultados:[
                    {
                        id:1,
                        nombre: 'Resultado 1',
                        descripcion: 'El Resultado',
                        palabras_clave: 'Resultado, Proyecto, Desarrollo',
                        area_aplicacion: 'Venta de Proyectos',
                        tipo: 'Proceso',
                        fecha: '12-10-2010',
                        avance: 'Completado',
                        status: 'Operativo',
                        plan_explotacion: 'El plan es que se registren las personas dentro del sistema'
                    },
                    {
                        id:1,
                        nombre: 'Resultado 2',
                        descripcion: 'El Resultado 2',
                        palabras_clave: 'Resultado, Proyecto, Desarrollo',
                        area_aplicacion: 'Venta de Proyectos',
                        tipo: 'Producto',
                        fecha: '12-10-2010',
                        avance: 'Completado',
                        status: 'Operativo',
                        plan_explotacion: 'El plan es que se registren las personas dentro del sistema'
                    }
                ],
                patentes:[
                    {
                        id:1,
                        titulo:'Título de la patente',
                        resumen: 'El sistema de registro de proyectos de emprendimiento es un sistema responsivo',
                        fecha_registro:'18-10-2015',
                        fecha_aprobacion:'19-10-2015',
                        numero_registro:'123456789',
                        paises_proteccion: 'Mexico, EUA, Canadá',
                        plan_explotacion: 'El plan es que se registren las personas dentro del sistema'
                    }
                ],
                modalidades:[
                    {
                        solicitud:"XXXXXX",
                        monto_solicitado: 200000,
                        monto_apoyado: 150000,
                        trl_inicial:  1,
                        trl_final: 2,
                        fecha_registro: '17-10-2015',
                        fecha_cierre: '19-10-2015',
                        nombre: 'Modalidad X',
                        requisitos: 'Ninguno',
                        criterios_evalaucion: 'Criterios',
                        entregables: 'Entrgable X',
                        figura_apoyo: 'Figura X'
                    }
                ],
                display:"Un proyecto mas"
            }
        ];


        //Variables para el md-autocomplete

        vm.proyectos          = $scope.proyectos;
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
                return (proyecto.titulo.indexOf(lowercaseQuery) === 0);
            };
        }

        /**
         * Columns for tables
         */

        $scope.showTable = false;
        vm.columns_resultados = [
            {
                title: 'id',
                field: 'id',
                sortable: true
            },{
                title: 'Nombre',
                field: 'nombre',
                sortable: true
            },{
                title: 'Fecha',
                field: 'fecha',
                sortable: true
            },{
                title: 'Palabras Clave',
                field: 'palabras_clave',
                sortable:false
            },{
                title: 'Avance',
                field: 'avance',
                sortable:false
            },{
                title: 'Status',
                field: 'status',
                sortable:false
            }
        ];
        vm.columns_patentes = [
            {
                title: 'id',
                field: 'id',
                sortable: true
            },{
                title: 'Titulo',
                field: 'titulo',
                sortable: false
            },{
                title: 'Registro',
                field: 'fecha_registro',
                sortable: true
            },{
                title: 'Aprobación',
                field: 'fecha_aprobacion',
                sortable: true
            },{
                title: 'Registro',
                field: 'numero_registro',
                sortable: false
            },{
                title: 'Paises',
                field: 'paises_proteccion',
                sortable: false
            }
        ];

        /**
         * Watch
         */


        /**
         * Funcion para agregar resultado
         */

        $scope.addResult = function()
        {
            $scope.resultado.id =Math.floor((Math.random() * 10) + 2);
            $scope.resultado.fecha= moment($scope.resultado.fecha).format('DD-MM-YYYY');
            vm.selectedItem.resultados.push($scope.resultado);
            $scope.resultado=null;
            $scope.agregarResultado.$setPristine();
        }

        /**
         * Funcion para agregar patente
         */
        $scope.addPatent = function()
        {
            $scope.patente.id =Math.floor((Math.random() * 10) + 2);
            $scope.patente.fecha_registro= moment($scope.patente.fecha_registro).format('DD-MM-YYYY');
            $scope.patente.fecha_aprobacion= moment($scope.patente.fecha_aprobacion).format('DD-MM-YYYY');
            vm.selectedItem.patentes.push($scope.patente);
            $scope.patente=null;
            $scope.agregarPatente.$setPristine();

        }

    }
})();
