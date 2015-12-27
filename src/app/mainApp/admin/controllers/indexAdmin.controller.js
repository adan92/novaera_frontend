(function() {
    'use strict';

    angular
        .module('app.mainApp.admin')
        .controller('indexAdminController', indexAdminController);

    /* @ngInject */
    function indexAdminController(Restangular,Translate,toastr,$mdDialog) {
        var vm              = this;
        vm.activate         = activate();


        //Variables

        vm.personas         = null;
        vm.selectedItems    = [];
        vm.createDialog     = createDialog;
        vm.validateUsers    = validateUsers;
        //Orden de la tabla
        vm.query            = {
            filter: '',
            limit: '10',
            order: 'id',
            page: 1
        };


        /**
         *Función para validar usuarios
         */

        function validateUsers()
        {
            Restangular.all('Supervisor').all('Persona').customPOST(vm.selectedItems).then(function(res)
            {
                toastr.success(vm.successText,vm.successUpdateText);
                Restangular.all('Supervisor').all('Persona').customGET().then(function(res)
                {
                    vm.personas = res.Persona;
                });
            }).catch(function(err){
                toastr.error(vm.failureText,vm.failureStoreText);
            });


        }


        /**
         * Función para crear dialogo
         * @param ev
         */

        function createDialog(ev)
        {

            vm.ev = ev;

            var confirm = $mdDialog.confirm()
                .title(vm.sureText)
                .content(vm.dialogText)
                .ariaLabel(vm.sureText)
                .targetEvent(ev)
                .ok(vm.acceptText)
                .cancel(vm.cancelText);
            $mdDialog.show(confirm).then(function() {
                vm.validateUsers();
            }, function() {
                console.log("Cancelado");
            });


        }


        function activate()
        {
            Restangular.all('Supervisor').all('Persona').customGET().then(function(res)
            {
               vm.personas = res.Persona;
            });
            vm.sureText             = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText           = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText           = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText           = Translate.translate('DIALOGS.WARNING_VALIDATE');
            vm.successText          = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText     = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText    = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText    = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText          = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText     = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText    = Translate.translate('DIALOGS.FAIL_DELETE');

        }


    }
})();
