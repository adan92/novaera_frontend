(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('indexProyectosController', indexProyectosController);

    /* @ngInject */
    function indexProyectosController($scope,Auth,Restangular, $timeout, $mdToast, $rootScope, $state,$log) {
        var vm = this;


        vm.test = test();


        function test()
        {
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
                console.log(res);
            }).catch(function(err)
            {
                console.log(err);
            })
        }





        vm.clickedProjects = null;
        vm.clear= clear;

        function clear()
        {
            vm.clickedProjects=null;
        }



        $scope.onClick = function (element, evt) {
            var label = element[0].label;
            vm.clickedProjects = searchProjects(label);

        };


        function searchProjects(label){

            return vm.proyectos;
        }



        //Datos
        vm.proyectos=[
            {
                titulo:"Sistema de Registro de Emprendimiento en Guanajuato",
                descripcion: "Esta plataforma",
                objetivos: "<ul><li>Objetivo 1</li><li>Objetivo 2</li></ul>",
                etapas: [
                    "Etapa 1",
                    "Etapa 2"
                ],
                trl:[
                    {descripcion:"Empezando", fecha:"10-10-2015"},
                    {descripcion:"En Proceso", fecha:"11-10-2015"}
                ],
                display:"Sistema de Registro",
                label:"Electricidad"

            },
            {
                titulo:"Otro proyecto",
                descripcion: "El proyecto a realizar",
                objetivos: "<ul><li>Objetivo 1</li><li>Objetivo 2</li></ul>",
                etapas: [
                    "Etapa 1",
                    "Etapa 2"
                ],
                trl:[
                    {descripcion:"Empezando", fecha:"10-10-2015"},
                    {descripcion:"En Proceso", fecha:"11-10-2015"}
                ],
                display:"Otro proyecto",
                label:"Agronomía"
            },
            {
                titulo:"Un proyecto mas",
                descripcion: "Es nuevo proyecto",
                objetivos: "<ul><li>Objetivo 1</li><li>Objetivo 2</li></ul>",
                etapas: [
                    "Etapa 1",
                    "Etapa 2"
                ],
                trl:[
                    {descripcion:"Empezando", fecha:"10-10-2015"},
                    {descripcion:"En Proceso", fecha:"11-10-2015"}
                ],
                display:"Un proyecto mas",
                label:"Calzado"
            }
        ];
        vm.my_projects_labels= ['Electricidad','Agronomía','Calzado'];
        vm.my_projects_data= ['3','5','6'];


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
                return (proyecto.titulo.indexOf(query) === 0);
            };
        }



    }
})();
