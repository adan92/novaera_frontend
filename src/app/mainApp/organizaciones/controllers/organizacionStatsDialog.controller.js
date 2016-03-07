/**
 * Created by lockonDaniel on 3/6/16.
 */
angular
    .module('app.mainApp.organizaciones')
    .controller('organizacionStatsDialogController',organizacionStatsDialogController);


    //organizacionStatsDialogController.$inject = ['selectedOrganizacion'];

    function organizacionStatsDialogController($mdDialog,selectedOrganizacion,Descriptor,Admin)
    {
        var vm = this;
        activate();
        vm.organizacion                     = selectedOrganizacion;
        vm.tipoDescriptores                 = null;
        vm.descriptores                     = null;
        vm.selectedTipoDescriptor           = null;
        vm.selectedDescriptor               = null;
        vm.Chart                            = null;
        vm.loadingDescriptores              = null;
        vm.loadingPersonasDescriptor        = false;

        /*Funciones*/
        vm.cancel                   = cancel;
        vm.getPersonasByDescriptor  = getPersonasByDescriptor;
        vm.getDescriptores          = getDescriptores;


        function cancel()
        {
            $mdDialog.cancel(false);
        }

        function activate()
        {
            Admin.getPersonsInOrg(selectedOrganizacion.id).then(function(res){
                vm.personas = res;
            }).catch(function(err){

            });
            Descriptor.getTipoDescriptorByClasificacion('Persona').then(function(res){
                vm.tipoDescriptores = res;


            });
        }

        function getPersonasByDescriptor()
        {
            var promise;
            vm.loadingPersonasDescriptor = true;
            if(vm.selectedDescriptor==0)
            {
                promise = Admin.getPersonsInOrg(selectedOrganizacion.id);
            }
            else
            {
                promise = Admin.getPersonsInOrgByDescriptor(selectedOrganizacion.id,vm.selectedDescriptor);
            }

            promise.then(function(res){
                vm.personas = res;
                vm.loadingPersonasDescriptor = false;
            }).catch(function (err) {
                vm.loadingPersonasDescriptor = false;
            })

        }

        function getDescriptores()
        {
            vm.loadingDescriptores=true;
            Descriptor.callAssosciated(vm.selectedTipoDescriptor).then(function(res){
                vm.descriptores = res.Descriptor;
                vm.descriptores.unshift({
                    id:0,
                    Titulo:'Todos'
                });
                vm.loadingDescriptores = false;
            }).catch(function(err){

            });

            Admin.countPersonsInOrgTipoDescriptor(selectedOrganizacion.id,vm.selectedTipoDescriptor).then(
                function(res){
                    vm.Chart = res;
                }).catch(function(err){

            });
        }






    }