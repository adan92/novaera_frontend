/**
 * Created by lockonDaniel on 10/15/15.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('descriptorResultadoController', descriptorResultadoController)
        .filter('matcher', matcher);

    /* @ngInject */
    function descriptorResultadoController(toastr, $mdDialog, Proyecto, Translate, $scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        activate();
        vm.resultados = [{
            "id": 1,
            "idResultado": 3,
            "FechaRegistro": "2015-01-01",
            "FechaAprobacion": "2015-01-01",
            "PCT": "80"
        }, {
            "id": 2,
            "idResultado": 5,
            "FechaRegistro": "2015-01-01",
            "FechaAprobacion": "2015-01-01",
            "PCT": "80"
        }];
        vm.selectedItemChange = selectedItemChange;
        vm.proyectos = [];
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.simulateQuery = false;
        vm.isDisabled = false;
        vm.deleteItem = deleteItem;
        vm.createDialog = createDialog;
        vm.addItem = addItem;
        vm.edit=edit;
        vm.resultadosDescriptor = null;
        vm.resultadosDescriptores = [];

        function activate() {
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;
            });
            ;

            vm.sureText = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText = Translate.translate('DIALOGS.WARNING');
            vm.successText = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText = Translate.translate('DIALOGS.FAIL_DELETE');

        }

        //////////////////
        function querySearch(query) {
            var results = query ? vm.proyectos.filter(createFilterFor(query)) : vm.proyectos, deferred;
            return results;

        }


        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(proyecto) {
                return (proyecto.titulo.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        function deleteItem(item) {
            var promise = Proyecto.deleteDescriptorResultados(item.idDescriptor);
            promise.then(function (res) {
                toastr.success(vm.successText, vm.successDeleteText);
                //showDescriptoresResultado();
            }).catch(function (err) {
                toastr.error(vm.failureText, vm.failureDeleteText);
            })
        }

        function createDialog(ev, item) {
            vm.ev = ev;
            var confirm = $mdDialog.confirm()
                .title(vm.sureText)
                .content(vm.dialogText)
                .ariaLabel(vm.sureText)
                .targetEvent(ev)
                .ok(vm.acceptText)
                .cancel(vm.cancelText);
            $mdDialog.show(confirm).then(function () {
                vm.deleteItem(item);
            }, function () {
                console.log("Cancelado");
            });
        }

        /**
         * Create function to add item
         */

        function addItem() {
            var promise;
            if(vm.resultadosDescriptor.id==null) {
                promise = Proyecto.saveDescriptorResultados(vm.resultadosDescriptor);
                promise.then(function (res) {
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.resetForm();
                    //showDescriptoresResultado();
                }).catch(function (err) {
                    toastr.error(vm.failureText, vm.failureStoreText);
                });
            }else{
                promise = Proyecto.updateDescriptorResultados(vm.resultadosDescriptor.id);
                promise.then(function (res) {
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.resetForm();
                    //showDescriptoresResultado();
                }).catch(function (err) {
                    toastr.error(vm.failureText, vm.failureStoreText);
                });
            }
            vm.resultadosDescriptores=null;
            $scope.registrarResultado.$setPristine();

        }
        function edit(item)
        {
            if(item!=undefined)
            {
                vm.resultadosDescriptor = item;

            }
        }
        function selectedItemChange(item) {
            if (vm.selectedItem.id != undefined && vm.selectedItem != null) {
                //showDescriptoresResultado();
                showDescriptoresResultadoObj();
                console.log("#");
            }
        }

        function showDescriptoresResultadoObj() {
            var promise = Proyecto.getResultados(vm.selectedItem.id);
            promise.then(function (resultArray) {

                resultArray.forEach(function (data) {
                    //vm.ids.push(data.id);
                    data.Resultado.forEach(function (data) {
                        vm.resultadosDescriptores.push(data);
                    });

                });
            });
        }

        function showDescriptoresResultado() {
            var promise = Proyecto.getResultados(vm.selectedItem.id);
            promise.then(function (resultArray) {
                var ids = [];
                resultArray.forEach(function (data) {
                    //vm.ids.push(data.id);
                    data.Resultado.forEach(function (data) {
                        ids.push(data.id);
                    });

                });
                /*var promis=Proyecto.getDescriptoresResultados(ids);
                 promis.then(function(resultArray){
                 console.log(resultArray);
                 });*/
            });
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
