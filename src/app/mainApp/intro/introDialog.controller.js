/**
 * Created by lockonDaniel on 4/14/16.
 */
(function()
{
    'use strict';

    angular.module('app.mainApp.intro').
        controller('introDialogController',introDialogController);

    function introDialogController($mdDialog)
    {
        var vm = this;
        vm.cancel = cancel;

        function cancel()
        {
            $mdDialog.cancel(false);
        }

    }


})();