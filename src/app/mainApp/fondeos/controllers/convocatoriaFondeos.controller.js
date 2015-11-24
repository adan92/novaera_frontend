(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('convocatoriaFondeosController', convocatoriaFondeosController);

    /* @ngInject */
    function  convocatoriaFondeosController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        $scope.fondeo = {};

    }

})();
