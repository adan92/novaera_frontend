(function () {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('indexProyectosController', indexProyectosController);

    /* @ngInject */
    function indexProyectosController(Proyecto,Descriptor, TRL, Translate, toastr) {
        var vm = this;

        /* Variables */

        vm.tipoDescriptores             = null;
        vm.selectedTipoDescriptor       = null;
        vm.selectedDescriptor           = null;
        vm.descriptores                 = null;
        vm.loadingProyectos             = false;
        vm.Chart                        = null;


        vm.clickedProjects              = null;
        vm.proyectos                    = null;
        vm.selectedItem                 = null;
        vm.searchText                   = null;
        vm.simulateQuery                = false;
        vm.isDisabled                   = false;

        /*Funciones */

        vm.activate                     = activate();
        vm.clear                        = clear;
        vm.selectedItemChange           = selectedItemChange;
        vm.querySearch                  = querySearch;
        vm.onClick                      = onClick;
        vm.getDescriptores              = getDescriptores;
        vm.getProyectosByDescriptor     = getProyectosByDescriptor;
        vm.getProyectos                 = getProyectos;

        function activate() {
            getProyectos();
            getTipoDescriptores();


            vm.failureText = Translate.translate('DIALOGS.FAILURE');
            vm.failureLoad = Translate.translate('DIALOGS.FAIL_LOAD');
        }

        function clear() {
            vm.clickedProjects = null;
        }

        function onClick(element, evt) {

            var label = element[0].label;
            var descriptor =  searchDescriptores(label);
            vm.selectedDescriptor = descriptor.id;
            getProyectosByDescriptor();

        }

        function searchDescriptores(label) {

            var element = _.findWhere(vm.descriptores,{Titulo:label})
            if(element!=undefined)
                return element;
            return null;
        }


        vm.my_projects_labels = ['Electricidad', 'Agronomía', 'Calzado'];
        vm.my_projects_data = ['3', '5', '6'];

        //////////////////
        function querySearch(query) {
            var results = query ? vm.proyectos.filter(createFilterFor(query)) : vm.proyectos, deferred;
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

        function getProyectos() {
            vm.loadingProyectos = true;

            vm.selectedDescriptor = null;
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;
                vm.loadingProyectos = false;

            }).catch(function (err) {
                toastr.error(vm.failureLoad, vm.failureText);
            });
        }

        function selectedItemChange(item) {
            if (item != null) {
                var proms = TRL.getTRLByProject(item.id);
                proms.then(function (res) {
                    vm.selectedItem.TRL = res.TRL;
                }).catch(function (err) {
                    toastr.error(vm.failureLoad, vm.failureText);
                });
            }
        }

        function getTipoDescriptores()
        {
            var promise = Descriptor.getTipoDescriptorByClasificacion('Proyecto');
            promise.then(function(res){
                vm.tipoDescriptores = res;
            }).catch(function(err){

            });
        }


        function getDescriptores()
        {
            var promise = Descriptor.callAssosciated(vm.selectedTipoDescriptor);
            promise.then(function(res){
                console.log(res);
               vm.descriptores = res.Descriptor;
            }).catch(function(err){

            });

            var promiseChart = Proyecto.countByTipoDescriptor(vm.selectedTipoDescriptor);

            promiseChart.then(function(res){
               vm.Chart = res;
            }).catch(function(err){

            });
        }

        function getProyectosByDescriptor()
        {
            vm.loadingProyectos = true;
            var promise = Proyecto.getByDescriptor(vm.selectedDescriptor);
            promise.then(function(res){
                vm.loadingProyectos = false;
                vm.proyectos = res;
            }).catch(function(err){

            });


        }

    }
})();
