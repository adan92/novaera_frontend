/**
 * Created by lockonDaniel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('etapasProyectosController', etapasProyectosController)
        .filter('matcher',matcher);

    /* @ngInject */
    function etapasProyectosController($scope) {
        var vm = this;

        vm.newEtapa         = null;
        vm.newTarea         = null;
        vm.selectedEtapa    = null;
        vm.logData          = logData;
        vm.createEtapa      = createEtapa;
        vm.pushTarea        = pushTarea;
        vm.drawTaskFactory  = drawTaskFactory;
        vm.clickTask        = clickTask;
        vm.doubleClick      = doubleClick;

        function doubleClick()
        {
            console.log('DoubleClick');
        }


        function drawTaskFactory() {
            var newTask = {
                name: 'New Task',
                content: '<span class="text-white">{{task.model.name}}</span>'+
                '<i class="text-white fa fa-cog" ng-click="scope.clickTask(task)"></i>' +
                '<i class="text-white fa fa-times" ng-click="scope.removeTask(task.model)"></i>',
                color:'#00BCD4'

                // Other properties
            };

            return newTask;
        }

        $scope.clickTask = function(taskModel) {
            console.log(taskModel);
            vm.newTarea = taskModel.model;
        };

        $scope.removeTask = function(taskModel) {
            vm.idTask=taskModel.id;
            console.log("Searching for: "+taskModel.id);
            for(var i=0;i<vm.data.length;i++)
            {
                console.log(vm.data[i].tasks);
                var index = _.findIndex(vm.data[i].tasks,function(obj){
                    return obj.id ==vm.idTask;
                });
                console.log(index);
                if(index!=-1)
                {
                    vm.data[i].tasks.splice(index,1);
                    break;
                }

            }
            vm.idTask = null;

        };

        function clickTask(task)
        {
            console.log("Hola");
        }


        function logData()
        {
            console.log(vm.data);
        }

        function createEtapa()
        {
            vm.newEtapa.tasks = [];
            vm.data.push(vm.newEtapa);
            vm.newEtapa = null;
        }

        function pushTarea()
        {


            vm.selectedEtapa.tasks.push(vm.newTarea);
        }



        vm.data = [
        /*
            {
                name: 'row1', tasks: [
            ]},
            {name: 'row2', tasks: [
                {name: 'task3', from:'2015-11-02', to: '2015-11-03'},
                {name: 'task4', from: '2015-11-04', to: '2015-11-05'}
            ]
            }, {name: 'Development', children: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4']},
            {name: 'Sprint 1', tooltips: false, tasks: [
                {name: 'Product list view', color: '#F1C232', from: new Date(2015, 12, 21, 8, 0, 0), to: new Date(2015, 12, 25, 15, 0, 0),
                    progress: 25}
            ]}*/
        ];


        $scope.resultados = [
            {
                id: 1,
                tarea:'Tarea',
                FechaRegistro:'10/05/2015',
                FechaAprobacion:'15/05/2015',
                TPC:'5',
                entregable: 'Entregable'
            },
            {
                id: 2,
                tarea:'Tarea2',
                tareaPrecedente:'Tarea2',
                entregable: 'Entregable2'
            },
            {
                id: 3,
                tarea:'Tarea3',
                tareaPrecedente:'Tarea3',
                entregable: 'Entregable3'
            }
        ];

        //Datos
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
                id: $scope.etapa.id,
                tarea: $scope.etapa.tarea,
                tareaPrecedente: $scope.etapaPrecedente,
                entregable: $scope.entregable
            };



            vm.selectedItem.etapas.push(etapa);

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
