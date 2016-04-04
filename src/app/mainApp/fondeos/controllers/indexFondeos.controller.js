(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('indexFondeosController', indexFondeosController);

    /* @ngInject */
    function indexFondeosController(Fondeo,Modalidad) {
        var vm                  = this;

        vm.fondeos              = null;
        vm.selectedFondeo       = null;
        vm.convocatorias        = null;
        vm.modalidades          = null;
        vm.selectedModalidad    = null;
        vm.query = {
            order: 'id',
            limit: 5,
            page: 1
        };
        /*Funciones*/

        vm.getFondeos           = getFondeos;
        vm.getConvocatorias     = getConvocatorias;
        vm.getModalidades       = getModalidades;

        activate();


        function activate()
        {
            vm.getFondeos();
        }


        function getFondeos()
        {
            Fondeo.getAllFondeos().then(function(res){
                vm.fondeos = res;
            }).catch(function (err) {

            });
        }

        function getModalidades()
        {
            vm.selectedModalidad = null;
            Modalidad.showModalitiesRelationFondeos(vm.selectedFondeo).then(function (res) {
               vm.modalidades = res;

            }).catch(function (err) {

            });
        }

        function getConvocatorias()
        {
            vm.convocatorias = null;
            Modalidad.showConvocatoriasAsociadas(vm.selectedModalidad).then(function(res){
               vm.convocatorias = res;
            }).catch(function(err){

            });
        }



    }
})();
