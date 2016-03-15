(function() {
    'use strict';

    angular
        .module('app.mainApp.personas')
        .controller('indexPersonasController', indexPersonasController);

    /* @ngInject */

    function indexPersonasController($scope,Persona,Descriptor, $mdDialog, Translate, toastr) {
        var vm = this;
        vm.tipoDescriptores             = null;
        vm.selectedTipoDescriptor       = null;
        vm.selectedDescriptor           = null;
        vm.descriptores                 = null;
        vm.loadingPersonas             = false;
        vm.loadingDescriptorData        = false;
        vm.Chart                        = null;
        vm.Chart2                        = null;
        vm.texto                        =null;
        vm.clickedPersons              = null;
        vm.personas                    = null;
        vm.selectedItem                 = null;
        vm.querySearch = querySearch;
        vm.searchText                   = null;
        vm.simulateQuery                = false;
        vm.isDisabled                   = false;
        /*Funciones */

        vm.activate                     = activate();
        vm.clear                        = clear;
        vm.onClick                      = onClick;
        vm.querySearch                  =querySearch;
        vm.getDescriptores              = getDescriptores;
        vm.getOrganizations             =getOrganizations;
        vm.getPersonasByDescriptor     = getPersonasByDescriptor;
        vm.getPersonasByName           =getPersonasByName;


        function activate() {
            getTipoDescriptores();
            getOrganizations();

            vm.failureText = Translate.translate('DIALOGS.FAILURE');
            vm.failureLoad = Translate.translate('DIALOGS.FAIL_LOAD');
        }
        //Busqueda de personas
        function querySearch (query) {
            var results = query ? vm.personas.filter( createFilterFor(query) ) : vm.proyectos, deferred;
            return results;

        }
        //Filtrar Persona
        function createFilterFor(query) {

            return function filterFn(persona) {
                return (persona.Nombre.indexOf(query) === 0);
            };
        }
        function clear() {
            vm.clickedProjects = null;
        }

        function onClick(element, evt) {

            var label = element[0].label;
            var descriptor =  searchDescriptores(label);
            vm.selectedDescriptor = descriptor.id;
            getDescriptores();
            getPersonasByDescriptor();
            console.log(vm.personas);

        }

        function searchDescriptores(label) {

            var element = _.findWhere(vm.descriptores,{Titulo:label})
            if(element!=undefined)
                return element;
            return null;
        }


        function getTipoDescriptores()
        {
            var promise = Descriptor.getTipoDescriptorByClasificacion('Persona');
            promise.then(function(res){
                vm.tipoDescriptores = res;
            }).catch(function(err){

            });
        }

        function getPersonasByName(){
            if(vm.searchText!=''){
                console.log("Lo que obtuve del autocomplete es:");
                console.log(vm.searchText)
                var promise = Persona.getByName(vm.searchText);
                promise.then(function(res){
                    vm.personas=res;
                }).catch(function (err){

                });
            }
        }


        /**
         *
         */

        function getDescriptores()
        {
            vm.loadingDescriptorData = true;
            var promise = Descriptor.callAssosciated(vm.selectedTipoDescriptor);
            promise.then(function(res){
                console.log(res);
                vm.descriptores = res.Descriptor;
            }).catch(function(err){

            });

            var promiseChart = Persona.countByTipoDescriptor(vm.selectedTipoDescriptor);

            promiseChart.then(function(res){
                vm.loadingDescriptorData = false;
                vm.Chart = res;
            }).catch(function(err){

            });
        }

        function getOrganizations()
        {
            vm.loadingOrganizationData = true;

            var promiseChart = Persona.countByOrganization();

            promiseChart.then(function(res){
                vm.loadingOrganizationData = false;
                vm.Chart2 = res;
            }).catch(function(err){

            });
        }


        function getPersonasByDescriptor()
        {
            vm.loadingPersonas = true;
            var promise = Persona.getDescriptoresPersona(vm.selectedDescriptor);
            promise.then(function(res){
                vm.loadingPersonas = false;
                vm.personas = res;
                console.log(vm.personas);
            }).catch(function(err){

            });
        }


        /**
         *
         */



    }



})();