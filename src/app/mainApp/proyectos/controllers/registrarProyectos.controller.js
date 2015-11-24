(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('registrarProyectoController', registrarProyectoController);

    /* @ngInject */
    function registrarProyectoController($scope, $timeout, $mdToast, $rootScope, $state) {

        var vm = this;
        vm.organizaciones = null;
        vm.loadOrganizations  = loadOrganizations;

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


        $scope.proyecto = {};
    }
})();
