/**
 * Created by lockonDaniel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('etapasProyectosController', etapasProyectosController);

    /* @ngInject */
    function etapasProyectosController($scope,Restangular,Translate,toastr,$mdDialog) {
        var vm = this;

        vm.activate                 = activate();
        //Variables
        vm.proyectos                = null;
        vm.data                     = [];
        vm.newEtapa                 = null;
        vm.newTarea                 = null;
        vm.selectedEtapa            = null;
        vm.taskContent              = '<i class="text-white fa fa-cog" ng-click="scope.clickTask(task.model)"></i>'+
                                      '<i class="text-white fa fa-times" ng-click="scope.removeTask(task.model)"></i>'+
                                      '<span class="text-white">{{task.model.name}}</span>';
        vm.taskColor                = '#78909C';
        vm.newTaskColor             = '#00BCD4';
        vm.editedTaskColor          = '#4CAF50';
        vm.disableRequest           = false;

        //Funciones que ejecuta el GANTT
        vm.saveEtapas               = saveEtapas;
        vm.createEtapa              = createEtapa;
        vm.drawTaskFactory          = drawTaskFactory;
        vm.updateFrom               = updateFrom;
        vm.updateTo                 = updateTo;
        //Variables para configurar GANTT
        vm.fromDate                 = moment().subtract(1,'M').toDate();
        vm.toDate                   = moment().add(1,'M').toDate();
        vm.headers                  = ['month','week'];

        //Otras funciones
        vm.deleteEtapa              = deleteEtapa;
        vm.selectedItemChange       = selectedItemChange;

        /**
         *Función que se ejecuta al inicio
         */
        function activate()
        {
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
                vm.proyectos = res.Proyectos;
            }).catch(function(err){

            });
            vm.sureText             = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText           = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText           = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText           = Translate.translate('DIALOGS.WARNING');
            vm.successText          = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText     = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText    = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText    = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText          = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText     = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText    = Translate.translate('DIALOGS.FAIL_DELETE');
        }

        function selectedItemChange(){
            Restangular.all('Proyecto').one('EtapaProyecto',vm.selectedItem.id).customGET().then(function(res){
                vm.data = res.EtapaProyecto;
                console.log(vm.data);
                formatEtapas(vm.taskColor);
                console.log(vm.data);


            }).catch(function(err){

            });
        }




        /**
         * Funciones para actualizar la fecha de la tarea seleccionada utilizando md-datepicker
         */

        function updateFrom()
        {
            vm.newTarea.from = moment(vm.newTarea.newFrom);
        }
        function updateTo()
        {
            vm.newTarea.to = moment(vm.newTarea.newTo);
        }

        /**
         * Función para eliminar etapa. Utiliza underscore para encontrar el índice de la tarea dado el id
         */


        function deleteEtapa()
        {
            if(vm.newEtapa!=null)
            {
                var index =_.findIndex(vm.data,function(obj)
                {
                    return obj.id = vm.newEtapa.id;
                });
                vm.data.splice(index,1);
            }
            vm.newEtapa = null;

        }

        /**
         * Factory para dibujar tareas con click
         * @returns {{name: string, content: string, color: string}}
         */


        function drawTaskFactory() {
            var newTask = {
                name: 'Nueva Tarea',
                content: vm.taskContent,
                color: vm.newTaskColor

                // Other properties
            };

            return newTask;
        }

        /**
         * Funciones para editar y remover tarea al dar click en el ícono de engrane o de X
         * Falta corregir detalle donde no permite utilizar la variable vm
         */

        $scope.clickTask = function(taskModel) {
            vm.newTarea = taskModel;
            vm.newTarea.newTo = vm.newTarea.to.toDate();
            vm.newTarea.newFrom = vm.newTarea.from.toDate();
            if(vm.newTarea.color==vm.taskColor)
            {
                vm.newTarea.color = vm.editedTaskColor;
            }
        };

        $scope.removeTask = function(taskModel) {
            vm.idTask=taskModel.id;
            for(var i=0;i<vm.data.length;i++)
            {
                var index = _.findIndex(vm.data[i].tasks,function(obj){
                    return obj.id ==vm.idTask;
                });
                if(index!=-1)
                {
                    vm.data[i].tasks.splice(index,1);
                    break;
                }

            }
            vm.idTask = null;

        };



        function createEtapa()
        {
            vm.newEtapa.tasks = [];
            vm.data.push(vm.newEtapa);
            vm.newEtapa = null;
        }


        /**
         * Función para darle formato a las etapas recien llegadas
         */

        function saveEtapas()
        {
            var request = {
                idProyecto:vm.selectedItem.id,
                EtapaProyecto:vm.data
            };
            vm.disableRequest =true;
            Restangular.all('EtapaProyecto').customPOST(request).then(function(res){
                vm.data = null;
                vm.data = res.EtapaProyecto;
                formatEtapas(vm.taskColor);
                toastr.success(vm.successText,vm.successStoreText);
                vm.disableRequest = false;
            }).catch(function(err){
                vm.disableRequest=false;
                toastr.error(vm.failureText,vm.failureStoreText);
            });

        }



        /**
         *
         *
         */
        function formatEtapas(color)
        {
            angular.forEach(vm.data,function(item,key){
                angular.forEach(item.tasks,function(task,key){
                    task.content = vm.taskContent;
                    task.color = color;
                });

            });
        }



        //

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
                return (proyecto.Titulo.indexOf(query) === 0);
            };
        }

    }






})

();
