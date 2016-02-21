/**
 * Created by Christian on 21/02/2016.
 */

/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.organizaciones')
        .controller('validacionOrganizacionController', validacionOrganizacionController)
        .filter('matcher', matcher);

    /* @ngInject */
    function validacionOrganizacionController(Organizacion, Translate, toastr, $mdDialog) {
        var vm = this;
        activate();
        vm.organizaciones = null;
        vm.selectedItems = [];
        vm.createDialog = createDialog;
        vm.validateOrganizacion = validateOrganizacion;
        vm.query = {
            filter: '',
            limit: '10',
            order: 'id',
            page: 1
        };
        function activate() {
            var promise = Organizacion.getOrganizacionWitoutValidate();
            promise.then(function (res) {
                vm.organizaciones = res;
            });
            vm.sureText = Translate.translate('DIALOGS.YOU_SURE');
            vm.dialogText = Translate.translate('DIALOGS.WARNING_VALIDATE_ORGANIZACION');
            vm.successText = Translate.translate('DIALOGS.SUCCESS_VALIDATE');
            vm.failureText = Translate.translate('DIALOGS.ERROR_VALIDATE');
            vm.successUpdateText    = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.failureStoreText     = Translate.translate('DIALOGS.FAIL_STORE');
            vm.acceptText           = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText           = Translate.translate('DIALOGS.CANCEL');

        }

        function createDialog(ev) {

            vm.ev = ev;

            var confirm = $mdDialog.confirm()
                .title(vm.sureText)
                .content(vm.dialogText)
                .ariaLabel(vm.sureText)
                .targetEvent(ev)
                .ok(vm.acceptText)
                .cancel(vm.cancelText);
            $mdDialog.show(confirm).then(function () {
                vm.validateOrganizacion();
            }, function () {
                console.log("Cancelado");
            });


        }

        function validateOrganizacion() {
            console.log(vm.selectedItems);
            var organizaciones=ObjectToInt();
            var request={
                Organizacion:organizaciones
            };
            var promes=Organizacion.validateOrganizaciones(request);
            promes.then(function (res) {
                toastr.success(vm.successText, vm.successUpdateText);
                var promise = Organizacion.getOrganizacionWitoutValidate();
                promise.then(function (res) {
                    vm.organizaciones = res;
                });
            }).catch(function (err) {
                console.log(err);
                toastr.error(vm.failureText, vm.failureStoreText);
            });
        }
    function ObjectToInt(){
        var ids=[];
        vm.selectedItems.forEach(function(val)
        {
            ids.push(val.id);
        });
        return ids;
    }

    }

    function matcher() {
        return function (arr1, arr2) {
            if (arr2 == null)
                return true;

            return arr1.filter(function (val) {

                var returnable = null;
                angular.forEach(arr2, function (item) {
                    if (item.id == val.id)
                        returnable = false;
                }, val);

                if (returnable == null)
                    return true;
                else return false;
            })
        }
    }
})

();

