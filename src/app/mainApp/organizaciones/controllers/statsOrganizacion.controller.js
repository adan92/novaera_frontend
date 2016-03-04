/**
 * Created by lockonDaniel on 3/3/16.
 */

(function(){
    'use strict';


    angular
        .module('app.mainApp.organizaciones')
        .controller('statsOrganizacionController',statsOrganizacionController);

    function statsOrganizacionController(Descriptor,Admin,Organizacion){
        var vm = this;

        activate();

        /*Variables */
        vm.organizaciones               = null;
        vm.tipoDescriptores             = null;
        vm.selectedTipoDescriptor       = null;
        vm.descriptores                 = null;
        vm.selectedDescriptor           = null;
        vm.Chart                        = null;
        vm.loadingDescriptorData        = true;
        vm.loadingOrganizaciones        = false;

        /*Functions*/
        vm.countOrganizaciones          = countOrganizaciones;
        vm.onClickChart                 = onClickChart;
        vm.getOrganizaciones            = getAllOrganizaciones;


        function activate()
        {
            getTipoDescriptores();
            getAllOrganizaciones();

        }

        function getTipoDescriptores()
        {
            vm.loadingDescriptorData = true;
            var promise = Descriptor.getTipoDescriptorByClasificacion('Organizacion');
            promise.then(function(res){
                vm.tipoDescriptores = res;
                vm.loadingDescriptorData= false;
            }).catch(function(err){

            });

        }

        function getAssociatedDescriptores()
        {
            var promise = Descriptor.callAssosciated(vm.selectedTipoDescriptor);
            promise.then(function(res){
                vm.descriptores = res.Descriptor;
            }).catch(function(err){

            });

        }



        function countOrganizaciones()
        {
            var promise = Admin.countOrgDescriptorType(vm.selectedTipoDescriptor);
            promise.then(function(res){
               vm.Chart = res;
               getAssociatedDescriptores();
            }).catch(function (err) {

            });
        }

        function onClickChart(element, evt) {

            var label = element[0].label;
            var descriptor =  searchDescriptores(label);
            if(descriptor!=null)
            {
                vm.selectedDescriptor=descriptor;
                getOrganizacionesByDescriptor(descriptor);
            }

        }

        function searchDescriptores(label) {

            var element = _.findWhere(vm.descriptores,{Titulo:label});
            if(element!=undefined)
                return element.id;
            return null;
        }

        function getAllOrganizaciones()
        {
            vm.loadingOrganizaciones = true;

            var promise = Organizacion.getAllOrganizaciones();
            promise.then(function(res){
                vm.organizaciones = res;
                vm.loadingOrganizaciones = false;

            }).catch(function(err){

            });
        }


        function getOrganizacionesByDescriptor(id)
        {
            vm.loadingOrganizaciones = true;
            var promise = Admin.getOrgByDescriptor(id);
            promise.then(function(res){
                vm.organizaciones = res;
                vm.loadingOrganizaciones=false;
            }).catch(function(err){

            });

        }



    }

})();
