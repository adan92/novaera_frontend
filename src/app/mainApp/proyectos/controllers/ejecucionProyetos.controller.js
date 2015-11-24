/**
 * Created by lockonDaniel on 10/15/15.
 */

(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('ejecucionProyectosController', ejecucionProyectosController);

    /* @ngInject */
    function ejecucionProyectosController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        $scope.proyecto = {};
    }
})();
