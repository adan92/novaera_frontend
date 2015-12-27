(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('modalidadFondeosController', modalidadFondeosController);

    /* @ngInject */

    function  modalidadFondeosController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        $scope.fondeo = {};

        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
        'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
        'WY').split(' ').map(function(state) {
                return {abbrev: state};

            });
        $scope.rubros = ('Rubro1 Rubro2 Rubro3 Rubro4 Rubro5'+
        ' Rubro6').split(' ').map(function(rubro) {
                return {abbrev: rubro};})
    }


})();
