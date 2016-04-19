/**
 * Created by lockonDaniel on 4/1/16.
 */
(function(){
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('convocatoriaInfoDialogController',convocatoriaInfoDialogController);

    function convocatoriaInfoDialogController($mdDialog)
    {
        var vm = this;
        vm.cancel           = cancel;
        vm.answer           = answer;
        function cancel()
        {
            $mdDialog.cancel();
        }
        function answer(response)
        {
            $mdDialog.hide();
        }

    }




})();