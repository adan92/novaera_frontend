/**
 * Created by darkxavier on 12/30/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('validarProyectosController', validarProyectosController);

    /* @ngInject */
    function validarProyectosController(Fondeo,Convocatoria,$mdDialog) {
        var vm = this;
        vm.activate = activate();


        //Función para mandar a llamar las convocatorias
        vm.selectedItemChange = selectedItemChange;

        //Variables
        vm.convocatorias                =   null;
        vm.fondeos                      =   null;
        vm.selectedConvocatoria         =   null;
        vm.solicitudes                  =   null;
        vm.loadingSolicitudes           =   false;

        // Para el Autocomplete
        vm.selectedItem                 =   null;
        vm.searchText                   =   null;


        //Funciones
        vm.getSolicitudes               =  getSolicitudes;
        vm.querySearch                  =  querySearch;
        vm.openDialog                   =  openDialog;

        vm.estados = [
            {
                id: 1,
                value: "Aceptado"
            },
            {
                id: 2,
                value: "Rechazado"
            },
            {
                id: 3,
                value: "Pendiente"
            },
            {
                id: 4,
                value: "Culminado"
            }

        ];


        function activate()
        {
            var fondeosPromise = Fondeo.getAllFondeos();
            fondeosPromise.then(function(res){
                vm.fondeos = res;
            }).catch(function(err){

            });
        }

        function selectedItemChange()
        {
            vm.selectedConvocatoria = null;
            if(vm.selectedItem!=null)
            {
                var promiseConvocatorias = Fondeo.callAssosciated(vm.selectedItem);
                promiseConvocatorias.then(function(res){
                    vm.convocatorias = res.Convocatoria;
                }).catch(function(err)
                {

                });

            }
        }




        //////////////////
        //Busqueda de Programas de Fondeo
        function querySearch(query) {
            var results = query ? vm.fondeos.filter(createFilterFor(query)) : vm.fondeos, deferred;
            return results;
        }

        function createFilterFor(query) {

            return function filterFn(fondeo) {
                return (fondeo.Titulo.indexOf(query) === 0);

            };
        }

        function getSolicitudes()
        {
            vm.loadingSolicitudes = true;
            vm.solicitudesPromise = Convocatoria.getRegistrosByConvocatoria(vm.selectedConvocatoria);
            vm.solicitudesPromise.then(function(res){
               vm.solicitudes = res;
               vm.loadingSolicitudes = false;
            }).catch(function(err){
            });
        }

        function openDialog(event,solicitud)
        {
            var config = {
                controller: 'proyectoValidateDialogController',
                templateUrl:'app/mainApp/proyectos/validateDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent:event,
                clickOutsideToClose:true,
                fullscreen: true,
                locals:{selectedSolicitud:solicitud},
                controllerAs: 'vm'
            };

            $mdDialog.show(config).then(function(reply){

            },function()
            {

            });


        }



    }
})

();