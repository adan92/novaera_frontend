/**
 * Created by lockonDaniel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('etapasProyectosController', etapasProyectosController);

    /* @ngInject */
    function etapasProyectosController(Proyecto,$scope,Restangular,Translate,toastr,$mdDialog) {
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
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;
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
            var promise=Proyecto.getEtapasProject(vm.selectedItem.id);
            promise.then(function(res){
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
            var a=moment(vm.newTarea.newFrom);//.format('YYYY-MM-DD');

            console.log(toType(a));
            vm.newTarea.from = a;
        }
        function updateTo()
        {
            var b = moment(vm.newTarea.newTo);//.format('YYYY-MM-DD');
            console.log(b);
            vm.newTarea.to = b;
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
            /*console.log( toType( moment(new Date(vm.newTarea.to))));
            vm.newTarea.newTo = moment(vm.newTarea.to).format('DD/MMM/YYYY');
            vm.newTarea.newFrom =  moment(vm.newTarea.from).format('DD/MMM/YYYY');*/
            vm.newTarea.newTo = vm.newTarea.to.toDate();
            vm.newTarea.newFrom =   vm.newTarea.from.toDate();
            if(vm.newTarea.color==vm.taskColor)
            {
                vm.newTarea.color = vm.editedTaskColor;
            }
        };
        function toType(obj) {
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        }
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
            //convertFechas();
            var request = {
                idProyecto:vm.selectedItem.id,
                EtapaProyecto:vm.data
            };
            console.log(request);
            vm.disableRequest =true;
            var promise=Proyecto.saveEtapasProject(request);
            promise.then(function(res){
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
        function convertFechas(){
            angular.forEach(vm.data,function(item,key){
                var total=item.tasks.length;
                var tasks=[];

                angular.forEach(item.tasks,function(task,key){
                    console.log(key);

                    var to=moment(task.to).format('YYYY-MM-DD');
                    var from=moment(task.from).format('YYYY-MM-DD');
                    var tarea = {
                        to:to,
                        from:from,
                        name:task.name
                    };
                    console.log(JSON.stringify(tarea));
                    /*var tarea=new Object();
                    tarea.to=to;
                    tarea.from=from;
                    tarea.name=task.name;*/
                    tasks.push(JSON.stringify(tarea));
                });
                item.tasks=tasks;

            });
            console.log(vm.data);
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
