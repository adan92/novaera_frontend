(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('registrarProyectoController', registrarProyectoController);

    /* @ngInject */
    function registrarProyectoController($scope,toastr,Restangular,$state,Translate) {

        var vm = this;
        activate();
        vm.steps                = [
            'PROJECT.REGISTER.PROJECT_SELECT',
            'PROJECT.REGISTER.INFO',
            'PROJECT.REGISTER.BACKGROUND',
            'PROJECT.REGISTER.JUSTIFICATION',
            'PROJECT.REGISTER.OBJECTIVES',
            'PROJECT.REGISTER.REACH'];
        vm.proyecto             = {
            "id": null,
            "Titulo": null,
            "Descripcion": null,
            "Antecedentes": null,
            "Justificacion": null,
            "Objetivos": null,
            "Alcances": null,
            "created_at": null,
            "updated_at": null
        };

        vm.isOrganizacion       = false;
        vm.organizaciones       = null;
        vm.loadOrganizations    = loadOrganizations;
        vm.saveProject          = saveProject;


        vm.isNewProject         = true;
        vm.firstStepDisabled    = true;

        vm.projectList          = null;
        vm.selectedProject      = null;
        vm.getProyecto          = getProyecto;

        vm.proyectoLabel        = 'PROJECT.REGISTER.NEW_PROJECT';
        vm.changeSwitch         = changeSwitch;




        function getProyecto()
        {
            Restangular.all('Proyecto').one('Persona',vm.selectedProject).customGET().then(function(res){
                vm.proyecto = res;
                vm.proyectoLabel = vm.proyecto.Titulo;
            })

        }


        function changeSwitch()
        {

            if(vm.isNewProject)
            {
                vm.proyecto         = {
                    "id": null,
                    "Titulo": null,
                    "Descripcion": null,
                    "Antecedentes": null,
                    "Justificacion": null,
                    "Objetivos": null,
                    "Alcances": null,
                    "created_at": null,
                    "updated_at": null,
                    "pivot": {
                        "idPersona": null,
                        "idProyecto": null,
                        "Owner": null
                    }
                };
                vm.proyectoLabel    = 'PROJECT.REGISTER.NEW_PROJECT';
                vm.selectedProject  = null;
                $scope.projectSelect.$setPristine();
                $scope.projectInfo.$setPristine();
                $scope.projectHistory.$setPristine();
                $scope.projectJustification.$setPristine();
                $scope.projectAims.$setPristine();
                $scope.projectReach.$setPristine();

            }
            else{
                vm.proyectoLabel    = 'PROJECT.REGISTER.SELECTING_PROJECT';
                vm.selectedProject  = null;
                $scope.projectSelect.$setPristine();
                $scope.projectInfo.$setPristine();
                $scope.projectHistory.$setPristine();
                $scope.projectJustification.$setPristine();
                $scope.projectAims.$setPristine();
                $scope.projectReach.$setPristine();
            }

        }


        function activate()
        {
            Restangular.all('Persona').customGET().then(function()
            {
                //Ruta
                Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
                    vm.projectList = res.Proyectos;
                })
            }).catch(function(){
                $state.go('triangular.admin-default.personas_registro');
                toastr.error('Debe de haber una persona registrada para acceder a este módulo','Error');
            });
            vm.sureText             = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText           = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText           = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText           = Translate.translate('DIALOGS.WARNING');
            vm.successText          = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText     = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText    = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText    = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText          = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText     = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText    = Translate.translate('DIALOGS.FAIL_DELETE');
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
                if(vm.proyecto.id===null){
                    Restangular.all('Proyecto').all('Persona').customPOST(vm.proyecto).then(function(res){
                        toastr.success(vm.successText,vm.successStoreText);
                        vm.proyecto=res;
                        vm.proyectoLabel = vm.proyecto.Titulo;

                    }).catch(function(err){
                        toastr.error(vm.failureText,vm.failureStoreText);
                    })
                }
                else{
                    Restangular.all('Proyecto').one('Persona',vm.proyecto.id).customPUT(vm.proyecto).then(function(res){
                        toastr.success(vm.successText,vm.successUpdateText);
                        vm.proyectoLabel = vm.proyecto.Titulo;
                    }).catch(function(err){
                        toastr.error(vm.failureText,vm.failureStoreText);
                    })
                }
                Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
                    vm.projectList = res.Proyectos;
                });

            }



        }

    }
})();
