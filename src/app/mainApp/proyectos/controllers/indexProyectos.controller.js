(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('indexProyectosController', indexProyectosController);

    /* @ngInject */
    function indexProyectosController($scope,Restangular,Proyecto,TRL) {
        var vm = this;
        vm.clickedProjects = null;
        vm.clear= clear;
        vm.activate = activate();



        function activate(){
            getProyectos();
        }




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
        vm.proyectos            = null;
        vm.my_projects_labels   = ['Electricidad','Agronomía','Calzado'];
        vm.my_projects_data     = ['3','5','6'];

        //
        vm.selectedItem       = null;
        vm.selectedItemChange = selectedItemChange;
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

        function getProyectos()
        {
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                console.log(res);
                vm.proyectos = res;
            });
        }

        function selectedItemChange(item)
        {
            if(item!=null)
            {
                var proms=TRL.getTRLByProject(item.id);
                proms.then(function (res) {
                    console.log(res.TRL);
                    vm.selectedItem.TRL = res.TRL;
                }).catch(function (err) {

                });
            }

        }



    }
})();
