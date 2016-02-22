(function () {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('indexProyectosController', indexProyectosController);

    /* @ngInject */
    function indexProyectosController(Proyecto, TRL, Translate, toastr) {
        var vm = this;
        vm.clickedProjects = null;
        vm.proyectos = null;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.simulateQuery = false;
        vm.isDisabled = false;
        vm.activate = activate();
        vm.clear = clear;
        vm.selectedItemChange = selectedItemChange;
        vm.querySearch = querySearch;
        vm.onClick = onClick;

        function activate() {
            getProyectos();
            vm.failureText = Translate.translate('DIALOGS.FAILURE');
            vm.failureLoad = Translate.translate('DIALOGS.FAIL_LOAD');
        }

        function clear() {
            vm.clickedProjects = null;
        }

        function onClick(element, evt) {
            var label = element[0].label;
            vm.clickedProjects = searchProjects(label);
        }

        function searchProjects(label) {
            return vm.proyectos;
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
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;
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
    }
})();
