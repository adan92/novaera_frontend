/**
 * Created by lockonDaniel on 2/22/16.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('proyectoValidateDialogController', proyectoValidateDialogController);

    /* @ngInject */
    function proyectoValidateDialogController($mdDialog,selectedSolicitud,Admin,ROUTES) {
        var vm = this;
        vm.fileRoute        = ROUTES.FILE_ROUTE;
        vm.solicitud        = selectedSolicitud;
        vm.cancel           = cancel;
        vm.answer           = answer;
        vm.activate         = activate();
        /*Estilo*/

        /*Variables*/
        vm.ejecucion                    = null;
        vm.ejecucionFiles               = null;
        vm.impacto                      = null;
        vm.impactoFiles                 = null;
        vm.modeloNegocio                = null;
        vm.modeloNegocioFiles           = null;
        vm.propiedadIntelectual         = null;
        vm.propiedadIntelectualFiles    = null;
        vm.selectedPropiedad            = null;

        function cancel()
        {
            $mdDialog.cancel();
        }
        function answer(response)
        {
            $mdDialog.hide(response);
        }
        function activate()
        {   vm.style = vm.style+'min-width:800px; max-height:800px;';



            var ejecucionPromise = Admin.wizardOperation('Ejecucion',selectedSolicitud.idProyecto);
            ejecucionPromise.then(function(res){
                vm.ejecucion = res;
                Admin.wizardFiles('Ejecucion',selectedSolicitud.idProyecto).then(function(res){
                   vm.ejecucionFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            var impactoPromise = Admin.wizardOperation('Impacto',selectedSolicitud.idProyecto);
            impactoPromise.then(function(res){
                vm.impacto = res;
                Admin.wizardFiles('Impacto',selectedSolicitud.idProyecto).then(function(res){
                   vm.impactoFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            var modeloNegocioPromise = Admin.wizardOperation('ModeloNegocio',selectedSolicitud.idProyecto);
            modeloNegocioPromise.then(function(res){
                vm.modeloNegocio = res;
                Admin.wizardFiles('ModeloNegocio',selectedSolicitud.idProyecto).then(function(res){
                   vm.modeloNegocioFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            var propiedadIntelectualPromise = Admin.wizardOperation('TransferenciaTecnologica',selectedSolicitud.idProyecto);
            propiedadIntelectualPromise.then(function(res){
                vm.propiedadIntelectual = res.TransferenciaTecnologica;
                console.log(res);
                Admin.wizardFiles('TransferenciaTecnologica',selectedSolicitud.idProyecto).then(function(res){
                   vm.propiedadIntelectualFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });



        }






    }
})();
