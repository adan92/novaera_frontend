/**
 * Created by lockonDaniel on 3/7/16.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('statsFondeoController',statsFondeoController);

    function statsFondeoController(Admin,Fondeo,Modalidad)
    {
        var vm = this;


        /*Variables*/

        vm.Chart                            = null;
        vm.ChartRegisters                   = null;
        vm.loadingStatsRegisters            = false;
        vm.loadingStats                     = true;
        vm.loadingModalidades               = false;
        vm.sumType                          = 'Apoyado';
        vm.types                            = [{name:'Apoyado'},{name:'Solicitado'}];
        vm.howValidated                     = [{name:'Aceptado',value:'Aceptado'},{name:'Rechazado',value:'Rechazado'},{name:'Pendiente',value:'Pendiente'},{name:'Culminado',value:'Culminado'},{name:'Todos',value:'Todos'}];
        vm.fondeos                          = null;
        vm.modalidades                      = null;
        vm.convocatorias                    = null;
        vm.selectedFondeo                   = null;
        vm.selectedModalidad                = null;
        vm.selectedStatus                   = 'Todos';
        vm.labelTypes                       = 'FONDEOS.STATS.PROGRAMA_LABELS';
        /*Funciones*/
        vm.getSumsAllPrograms               = getSumsAllPrograms;
        vm.getAssociatedModalidades         = getAssociatedModalidades;
        vm.getAssociatedConvocatorias       = getAssociatedConvocatorias;
        vm.getSumsByClassification          = getSumsByClassification;
        vm.onClick                          = onClick;

        activate();

        function activate()
        {
           vm.getSumsAllPrograms(vm.sumType,'Todos');
           Fondeo.getAllFondeos().then(function (res) {
               vm.fondeos = res;
               vm.fondeos.unshift({id:0, Titulo: "Todos"});
               vm.selectedFondeo = vm.fondeos[0];
           }).catch(function (err) {

           });

        }


        function getSumsAllPrograms(type,status)
        {
            Admin.sumsAllPrograms(type,status).then(function(res){
                vm.Chart = res;
                vm.loadingStats = false;
            }).catch(function(err){

            });
        }

        function getSumsByType(granularity,id,sumType,status)
        {
            Admin.sumsByType(granularity,id,sumType,status).then(function(res){
                vm.Chart = res;
            }).catch(function (err) {

            })
        }



        function getAssociatedModalidades(fondeo)
        {
            vm.modalidades = null;
            vm.loadingModalidades = true;
            if(fondeo.id!=0)
            {
                Modalidad.showModalitiesRelationFondeos(fondeo).then(function(res){
                    vm.modalidades = res;
                    vm.modalidades.unshift({Nombre:"Todas",id:0});
                    vm.selectedModalidad = vm.modalidades[0];
                    vm.loadingModalidades = false;
                    getSumsByClassification();
                }).catch(function (err) {

                });
            }
            else
            {
                getSumsByClassification();
                vm.loadingModalidades = false;
            }
        }

        function getAssociatedConvocatorias(modalidad)
        {
            if(modalidad.id!=0)
            {
                Modalidad.showConvocatoriasAsociadas(modalidad).then(function (res) {
                    vm.convocatorias = res;
                    getSumsByClassification();
                }).catch(function (err) {
                    
                })
            }
            else
            {
                getSumsByClassification();
            }
        }


        function getSumsByClassification()
        {
            vm.ChartRegisters=null;
            if(vm.selectedFondeo.id==0){
                getSumsAllPrograms(vm.sumType,vm.selectedStatus);
                vm.labelTypes = 'FONDEOS.STATS.PROGRAMA_LABELS';
            }
            else if(vm.selectedModalidad.id==0)
            {
                getSumsByType('ProgramaFondeo',vm.selectedFondeo.id,vm.sumType,vm.selectedStatus);
                vm.labelTypes = 'FONDEOS.STATS.MODALIDAD_LABELS';

            }
            else if(vm.selectedModalidad.id!=0)
            {
                getSumsByType('Modalidad',vm.selectedModalidad.id,vm.sumType,vm.selectedStatus)
                vm.labelTypes = 'FONDEOS.STATS.CONVOCATORIA_LABELS';

            }
        }


        function onClick(element, evt) {

            var label = element[0].label;
            var array;
            var matcher;
            var granularity;
            switch (vm.labelTypes)
            {
                case 'FONDEOS.STATS.PROGRAMA_LABELS':
                    array = vm.fondeos;
                    matcher = {Titulo:label};
                    granularity = 'ProgramaFondeo';
                    break;

                case 'FONDEOS.STATS.MODALIDAD_LABELS':
                    array = vm.modalidades;
                    matcher = {Nombre:label};
                    granularity = 'Modalidad';
                    break;

                case 'FONDEOS.STATS.CONVOCATORIA_LABELS':
                    array = vm.convocatorias;
                    matcher = {Nombre:label};
                    granularity = 'Convocatoria';
                    break;


            }

            var element =  searchElement(array,matcher);
            Admin.countRegistersByType(granularity,element.id).then(function(res){
                vm.ChartRegisters = res;
            }).catch(function (err) {

            })

        }

        function searchElement(array,matcher) {

            var element = _.findWhere(array,matcher);
            if(element!=undefined)
                return element;
            return null;
        }





    }
})();