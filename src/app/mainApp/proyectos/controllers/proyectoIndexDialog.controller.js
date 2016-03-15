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
    function proyectoIndexDialogController($mdDialog,selectedProyecto,Proyecto,Operation,ROUTES) {
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


            var ejecucionPromise = Operation.getCustomOperation('Ejecucion',selectedProyecto.id);
            var modeloNegocioPromise = Operation.getCustomOperation('ModeloNegocio',selectedProyecto.id);
            var impactoPromise = Operation.getCustomOperation('Impacto',selectedProyecto.id);
            var propiedadIntelectualPromise = Operation.getCustomOperation('TransferenciaTecnologica',selectedProyecto.id);
            var resultadosPromise = Proyecto.getResultado(selectedProyecto.id,'Todos');
            var patentesPromise = Proyecto.getResultado(selectedProyecto.id,'Patente');


            ejecucionPromise.then(function(res){
                vm.ejecucion = res;
                Operation.getCustomFileOperation('Ejecucion',selectedProyecto.id).then(function(res){
                    vm.ejecucionFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            impactoPromise.then(function(res){
                vm.impacto = res;
                Operation.getCustomFileOperation('Impacto',selectedProyecto.id).then(function(res){
                    vm.impactoFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            modeloNegocioPromise.then(function(res){
                vm.modeloNegocio = res;
                Operation.getCustomFileOperation('ModeloNegocio',selectedProyecto.id).then(function(res){
                    vm.modeloNegocioFiles = res;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            propiedadIntelectualPromise.then(function(res){
                vm.propiedadIntelectual = res.TransferenciaTecnologica;
                Operation.getCustomFileOperation('TransferenciaTecnologica',selectedProyecto.id).then(function(res){
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
