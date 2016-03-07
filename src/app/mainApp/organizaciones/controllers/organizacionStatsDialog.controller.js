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
        vm.query = {
            order: 'id',
            limit: 5,
            page: 1
        };

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
                vm.tipoDescriptores.unshift({
                    id:0,
                    Nombre:'Todos'
                });


            });
        }

        function getPersonasByDescriptor()
        {
            var promise;
            vm.loadingPersonasDescriptor = true;

            promise = Admin.getPersonsInOrgByDescriptor(selectedOrganizacion.id,vm.selectedDescriptor);

            promise.then(function(res){
                vm.personas = res;
                vm.loadingPersonasDescriptor = false;
            }).catch(function (err) {
                vm.loadingPersonasDescriptor = false;
            })

        }

        function getDescriptores()
        {
            if(vm.selectedTipoDescriptor==0)
            {
                vm.Chart = null;
                vm.loadingDescriptores = false;
                vm.loadingPersonasDescriptor = true;
                vm.descriptores = null;
                var promise = Admin.getPersonsInOrg(selectedOrganizacion.id);
                promise.then(function(res){
                    vm.personas = res;
                    vm.loadingPersonasDescriptor = false;
                }).catch(function (err) {
                    vm.loadingPersonasDescriptor = false;
                })
            }
            else{
                 vm.loadingDescriptores=true;
                Descriptor.callAssosciated(vm.selectedTipoDescriptor).then(function(res){
                    vm.descriptores = res.Descriptor;
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






    }