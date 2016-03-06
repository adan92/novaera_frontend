/**
 * Created by lockonDaniel on 3/6/16.
 */
angular
    .module('app.mainApp.organizaciones')
    .controller('organizacionStatsDialogController',organizacionStatsDialogController);

    function organizacionStatsDialogController($mdDialog,selectedOrganizacion)
    {
        var vm = this;
        vm.organizacion = selectedOrganizacion;

        /*Funciones*/
        vm.cancel = cancel;

        function cancel()
        {
            $mdDialog.cancel(false);
        }


    }