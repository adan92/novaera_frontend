/**
 * Created by lockonDaniel on 2/26/16.
 */
/**
 * Created by lockonDaniel on 2/22/16.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('proyectoIndexDialogController', proyectoIndexDialogController);

    /* @ngInject */
    function proyectoIndexDialogController($mdDialog,selectedProyecto,Admin,ROUTES) {
        var vm = this;
        vm.fileRoute        = ROUTES.FILE_ROUTE;
        vm.proyecto         = selectedProyecto;
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
        vm.resultados                   = null;
        vm.patentes                     = null;
        vm.selectedResultado            = null;
        vm.selectedPatente              = null;


        function cancel()
        {
            $mdDialog.cancel();
        }
        function answer(response)
        {
            $mdDialog.hide();
        }
        function activate()
        {   vm.style = vm.style+'min-width:800px; max-height:800px;';


            var ejecucionPromise = Admin.wizardOperation('Ejecucion',selectedProyecto.id);
            var modeloNegocioPromise = Admin.wizardOperation('ModeloNegocio',selectedProyecto.id);
            var impactoPromise = Admin.wizardOperation('Impacto',selectedProyecto.id);
            var propiedadIntelectualPromise = Admin.wizardOperation('TransferenciaTecnologica',selectedProyecto.id);
            var resultadosPromise = Admin.getResults('Todos',selectedProyecto.id);
            var patentesPromise = Admin.getResults('Patente',selectedProyecto.id);


            ejecucionPromise.then(function(res){
                vm.ejecucion = res;
                Admin.wizardFiles('Ejecucion',selectedProyecto.id).then(function(res){
                    vm.ejecucionFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            impactoPromise.then(function(res){
                vm.impacto = res;
                Admin.wizardFiles('Impacto',selectedProyecto.id).then(function(res){
                    vm.impactoFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            modeloNegocioPromise.then(function(res){
                vm.modeloNegocio = res;
                Admin.wizardFiles('ModeloNegocio',selectedProyecto.id).then(function(res){
                    vm.modeloNegocioFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            propiedadIntelectualPromise.then(function(res){
                vm.propiedadIntelectual = res.TransferenciaTecnologica;
                Admin.wizardFiles('TransferenciaTecnologica',selectedProyecto.id).then(function(res){
                    vm.propiedadIntelectualFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });

            resultadosPromise.then(function(res){
                vm.resultados = res;
                console.log(res);
            }).catch(function(err){

            });

            patentesPromise.then(function(res){
                vm.patentes = res;
                console.log(res);
            }).catch(function(err){

            });


        }






    }
})();
