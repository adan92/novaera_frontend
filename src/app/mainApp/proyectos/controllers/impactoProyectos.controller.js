/**
 * Created by lockonDaniel on 12/17/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('impactoProyectosController', impactoProyectosController);

    /* @ngInject */
    function impactoProyectosController(toastr,Restangular,$state) {

        var vm              = this;
        vm.proyectos        = null;
        vm.getProjectImpact = getProjectImpact;
        vm.Impacto          = null;
        vm.saveImpact       = saveImpact;
        vm.activate         = activate();
        vm.steps            = [
            'PROJECT.IMPACT.PROJECT_SELECT',
            'PROJECT.IMPACT.ENVIORNMENTAL_IMPACT',
            'PROJECT.IMPACT.SCIENTIFIC_IMPACT',
            'PROJECT.IMPACT.TECHNOLOGICAL_IMPACT',
            'PROJECT.IMPACT.SOCIAL_IMPACT',
            'PROJECT.IMPACT.ECONOMIC_IMPACT',
            'PROJECT.IMPACT.VALUE_PROPOSAL',
            'PROJECT.IMPACT.CLIENT_SEGMENTS',
            'PROJECT.IMPACT.PROPOSED_SOLUTION',
            'PROJECT.IMPACT.METRICS',
            'PROJECT.IMPACT.CURRENT_SOLUTION'];

        function activate()
        {
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
               vm.proyectos = res.Proyectos;
            }).catch(function(err){

            });
        }

        function saveImpact()
        {
            if(vm.Impacto.id==null)
            {
                Restangular.all('Proyecto').all('Impacto').customPOST(vm.Impacto).then(function(res){
                    toastr.success('Se han guardado correctamente los datos','Éxito')
                }).catch(function(err){
                    toastr.error('Error Al Guardar los Datos','Error');
                })
            }
            else
            {
                Restangular.all('Proyecto').all('Impacto').customPUT(vm.Impacto).then(function(res){
                    toastr.success('Se han actualizado correctamente los datos','Éxito')
                }).catch(function(err){
                    toastr.error('Error Al Guardar los Datos','Error');
                })
            }

        }

        function getProjectImpact()
        {
            Restangular.all('Proyecto').one('Impacto',vm.Impacto.idProyecto).customGET().then(function(res){
                vm.Impacto = res;
            }).catch(function(err){
            })
        }


    }
})();
