(function() {
    'use strict';

    angular
        .module('app.mainApp.personas')
        .controller('registrarPersonasController', registrarPersonasController);

    /* @ngInject */
    function registrarPersonasController($scope, $timeout, $mdToast, $rootScope, $state) {


        $scope.paises = ('Mexico-Estados Unidos-Canada-Brasil-Colombia'+
        '-Chile').split('-').map(function(pais) {
                return {abbrev: pais};
            })

        $scope.estados = ('Estado de Mexico-Distrito Federal-Guanajuato-Queretaro-Michoacan'+
        '-Aguascalientes').split('-').map(function(pais) {
                return {abbrev: pais};
            })
        $scope.ciudades = ('San Miguel Allende-Irapuato-Leon-Apaseo el Alto-Dolores Hidalgo'+
        '-Celaya').split('-').map(function(ciudad) {
                return {abbrev: ciudad};
            })
    }


})

();
