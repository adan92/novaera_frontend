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
        .controller('validacionDocuOrganizacionController', validacionDocuOrganizacionController)
        .filter('matcher', matcher);

    /* @ngInject */
    function validacionDocuOrganizacionController($sce,ROUTES,Organizacion, Translate, toastr, $mdDialog) {
        var vm = this;
        activate();
        vm.organizaciones = null;
        vm.selectedItems = [];

        vm.selectedDocument=null;
        vm.showButtonValidate=false;
        vm.createDialog = createDialog;
        vm.showPanelValidados=showPanelValidados;
        vm.isEditing=false;
        vm.fileRoute = ROUTES.FILE_ROUTE;
        vm.isShow=false;
        vm.showFrame = false;
        vm.urlActual=null;
        vm.showDocument=showDocument;
        vm.validate=validate;
        vm.query = {
            filter: '',
            limit: '10',
            order: 'id',
            page: 1
        };

        function activate() {
            var promise = Organizacion.getOrganizacioSinValDoc();
            promise.then(function (res) {
                vm.organizaciones = res;
            });
            vm.sureText = Translate.translate('DIALOGS.YOU_SURE');
            vm.dialogText = Translate.translate('DIALOGS.WARNING_VALIDATE_ORGANIZACION');
            vm.successText = Translate.translate('DIALOGS.SUCCESS_VALIDATE');
            vm.failureText = Translate.translate('DIALOGS.ERROR_VALIDATE');
            vm.successUpdateText = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.failureStoreText = Translate.translate('DIALOGS.FAIL_STORE');
            vm.acceptText = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText = Translate.translate('DIALOGS.CANCEL');

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
        function showDocument(item,show){
            if(item.archivo!="" && item.archivo!=null)
            {
                console.log(item);
                vm.isShow=true;
                vm.showFrame = true;
                vm.selectedDocument=item;
                vm.showButtonValidate=true;
                vm.urlActual=$sce.trustAsResourceUrl(vm.fileRoute+item.archivo);
            }
            else
            {
                vm.isShow=true;
                vm.showFrame = false;
                vm.selectedDocument=null;
                vm.showButtonValidate =false;
            }

        }
        function showPanelValidados(item){
            vm.validations = [ {
                field: 'RFCValidated',
                label: {
                    message: 'Ver RFC'
                },
                tipo:1,
                archivo:''
            }, {
                field: 'RENIECyTValidated',
                label: {
                    message: 'Ver RENIECyT'
                },
                tipo:2,
                archivo:''
            }, {
                field: 'ActaValidated',
                label: {
                    message: 'Ver Acta'
                },
                tipo:3,
                archivo:''
            }];
            vm.isEditing=true;
            vm.isShow=false;
            vm.showFrame = false;
            vm.org = angular.copy(item);
            console.log(item);
            vm.validations[0].archivo=vm.org.Archivos.RFCFile;
            vm.validations[1].archivo=vm.org.Archivos.RENIECyTFile;
            vm.validations[2].archivo=vm.org.Archivos.ActaFile;
            console.log(vm.validations);
        }
        function validate() {
                var request = getRequest();
            var promes = Organizacion.validateDocument(vm.org.id, request);
            promes.then(function (res) {
                toastr.success(vm.successText, vm.successUpdateText);
            }).catch(function (err) {
                console.log(err);
                toastr.error(vm.failureText, vm.failureStoreText);
            });
        }
        function getRequest(){
            var request={
            };
            switch (vm.selectedDocument.tipo){
                case 1:
                    request.RFCValidated=1;
                    break;
                case 2:
                    request.RENIECyTValidated=1;
                    break;
                case 3:
                    request.ActaValidated=1;
                    break;
            }
            console.log(request);
            return request;
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

