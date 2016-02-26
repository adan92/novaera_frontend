/**
 * Created by Christian on 15/02/2016.
 */

/**
 * Created by lockonDaniel on 10/15/15.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('informacionSolicitudController', informacionSolicitudController);

    /* @ngInject */
    function informacionSolicitudController($mdDialog,solicitud) {
        var vm = this;
        vm.solicitud = null;
        activate();
        vm.hide = hide;
        vm.cancel = cancel;
        vm.answer = answer;
        function hide() {
            $mdDialog.hide();
        }

        function cancel() {
            $mdDialog.cancel();
        }

        function answer(answer) {
            $mdDialog.hide(answer);
        }
        function activate(){
            vm.solicitud=solicitud;
        }

    }

})

();
