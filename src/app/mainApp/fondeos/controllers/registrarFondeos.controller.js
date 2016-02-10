(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('registrarFondeosController', registrarFondeosController);

    /* @ngInject */
    function registrarFondeosController($scope, $timeout, $mdToast, $rootScope, $state, Fondeo) {

        var vm = this;
       //Var form

       //Var objeto
        vm.fondeo = {
            "id": null,
            "Titulo": null,
            "PublicoObjetivo": null,
            "FondoTotal": null,
            "Justificacion": null,
            "CriteriosElegibilidad": null,
            "created_at": null,
            "updated_at": null
        };
        //arreglo de objetos Fondeo
        vm.Fondeos=null;
        //variables visibilidad o para controles
        vm.isDisabled         = false;

            //Pasos wizard
        vm.steps                    = [
            'FONDEOS.WIZARD.FEATURES',
            'FONDEOS.FEATURES.FONDEO_DESCRIPTION',
            'FONDEOS.FEATURES.FONDEO_SUPPORT',
            'FONDEOS.FEATURES.FONDEO_SELECTED'];

        vm.completed=100;
        vm.registrarFondeo = registrarfondeo;
        //////////////////

        // Registro de programa de fondeo
        function registrarfondeo() {
            console.log("Entrando a la funcion");
            if (vm.fondeo.id === null) {
                console.log("Ya entre");
                var promise = Fondeo.crearFondeo(vm.fondeo);
                promise.then(function(res){
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.fondeo = res;
                    vm.fondeoLabel = vm.fondeo.Titulo;
                }).catch(function(err){
                    toastr.error(vm.failureText, vm.failureStoreText);
                });
            }
            else {
                console.log("No entre");
                var promise = Proyecto.updateProject(vm.proyecto);
                promise.then(function(res){
                    toastr.success(vm.successText, vm.successUpdateText);
                    vm.proyectoLabel = vm.proyecto.Titulo;
                }).catch(function(err){
                    toastr.error(vm.failureText, vm.failureStoreText);
                });
            }
            var promise = Proyecto.getAllProjects();
            promise.then(function (value) {
                vm.projectList = value;
            });

        }








    }

})

();
