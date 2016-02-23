/**
 * Created by darkxavier on 12/30/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('validarProyectosController', validarProyectosController);

    /* @ngInject */
    function validarProyectosController(Fondeo,Convocatoria,Admin,$mdDialog,Translate,toastr) {
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
        vm.validacion                   =   null;
        vm.selectedSolicitud            =   null;

        // Para el Autocomplete
        vm.selectedItem                 =   null;
        vm.searchText                   =   null;


        //Funciones
        vm.getSolicitudes               =  getSolicitudes;
        vm.querySearch                  =  querySearch;
        vm.openDialog                   =  openDialog;
        vm.validarSolicitud             =  validarSolicitud;

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
            vm.successStore = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdate = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successTitle = Translate.translate('DIALOGS.SUCCESS');
            vm.failTitle = Translate.translate('DIALOGS.FAILURE');
            vm.failMessage = Translate.translate('DIALOGS.FAIL_STORE');

        }

        function selectedItemChange()
        {
            vm.selectedConvocatoria = null;
            vm.selectedSolicitud = null;
            vm.showValidate = false;
            vm.solicitudes = null;
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
            vm.solicitudes = null;
            vm.selectedSolicitud = null;
            vm.loadingSolicitudes = true;
            vm.showValidate = false;
            vm.solicitudesPromise = Convocatoria.getRegistrosByConvocatoria(vm.selectedConvocatoria);
            vm.solicitudesPromise.then(function(res){
               vm.solicitudes = res;
               vm.loadingSolicitudes = false;
            }).catch(function(err){
            });
        }

        function validarSolicitud()
        {
            var promiseValidate = Admin.validateSolicitud(vm.validacion,vm.selectedSolicitud.id);
            promiseValidate.then(function(res){
                toastr.success(vm.successTitle,vm.successUpdate);
                getSolicitudes();

            }).catch(function(err){
                toastr.error(vm.failTitle,vm.failMessage);
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
                vm.showValidate = reply;
                vm.selectedSolicitud = solicitud;
                vm.validacion.MontoApoyado = vm.selectedSolicitud.MontoApoyado;
                vm.validacion.Validado = vm.selectedSolicitud.Validado;




            },function()
            {
                vm.showValidate=false;
                vm.selectedSolicitud=null;
            });


        }



    }
})

();