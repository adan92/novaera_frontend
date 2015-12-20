(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('registrarProyectoController', registrarProyectoController);

    /* @ngInject */
    function registrarProyectoController(toastr,Restangular,$state) {

        var vm = this;

        activate();

        vm.steps= ['Información','Antecedentes','Justificación','Objetivos','Alcances'];
        vm.proyecto = null;
        vm.isOrganizacion = false;
        vm.organizaciones = null;
        vm.loadOrganizations  = loadOrganizations;
        vm.saveProject = saveProject


        function activate()
        {
            Restangular.all('Persona').customGET().then(function(res)
            {

            }).catch(function(err){
                $state.go('triangular.admin-default.personas_registro');
                toastr.error('Debe de haber una persona registrada para acceder a este módulo','Error');
            });
        }




        function loadOrganizations()
        {
            vm.organizaciones= [
                {
                    id:1, nombre: "Organización 1"
                },
                {
                    id:2, nombre: "Organización 2"
                }
            ];
        }

        function saveProject()
        {

            if(!vm.isOrganizacion)
            {
                Restangular.all('Proyecto').all('Persona').customPOST(vm.proyecto).then(function(res){
                    toastr.success('Se han guardado correctamente los datos','Éxito')
                }).catch(function(err){
                    toastr.error('Hubo un error al guardar los datos','Error')
                })
            }


        }

    }
})();
