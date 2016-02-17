/**
 * Created by lockonDaniel on 10/16/15.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('trlProyectosController', trlProyectosController);

    /* @ngInject */
    function trlProyectosController(Proyecto, TRL, toastr, $mdDialog, Translate) {
        var vm = this;
        vm.today = new Date();
        vm.selectedDate = vm.today;
        vm.minDate = new Date(vm.today.getFullYear() - 1, vm.today.getMonth(), vm.today.getDate());
        vm.maxDate = vm.today;
        vm.proyectos = null;
        vm.TRLItems = null;
        vm.infoTRL = null;
        vm.selectedTRL = null;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.simulateQuery = false;
        vm.isDisabled = false;
        vm.estadisticas=null;
        vm.selectedRegisters = [];
        vm.createDialog = createDialog;
        vm.selectedItemChange = selectedItemChange;
        vm.registerTRL = registerTRL;
        vm.querySearch = querySearch;
        vm.deleteTRL = deleteTRL;
         activate();
        vm.TRL = {
            idProyecto: null,
            idTRL: null,
            Info: {
                Descripcion: null,
                Fecha: null
            }
        };
        vm.query = {
            filter: '',
            limit: '10',
            order: 'id',
            page: 1
        };

        //Dialogo
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
                vm.deleteTRL();
            }, function () {
                console.log("Cancelado");
            });

        }


        function activate() {
            var promise;
            promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;
                var prom = TRL.getAllTLR();
                prom.then(function (res) {
                    console.log(res);
                    vm.TRLItems = res;
                }).catch(function (err) {

                });
            }).catch(function (err) {

            });
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


        //Lists de estadísticas
        vm.estadisticas = {
            data: [4, 2, 7, 9, 1, 3, 0, 1, 0],
            labels: ['TRL1', 'TRL2', 'TRL3', 'TRL4', 'TRL5', 'TRL6', 'TRL7', 'TRL8', 'TRL9']
        };


        function selectedItemChange(item) {
            if (vm.selectedItem !== null) {
                var proms=TRL.getTRLByProject(item.id);
                proms.then(function (res) {
                    vm.selectedItem.TRL = res.TRL;
                }).catch(function (err) {

                });
            }

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
                return (proyecto.Titulo.indexOf(query) === 0);
            };
        }


        /**
         * Create Function to Add Item
         */

        function registerTRL() {

            var fecha = moment(new Date(vm.selectedDate)).format('YYYY-MM-DD');
            vm.TRL.idProyecto = vm.selectedItem.id;
            vm.TRL.Info.Fecha = fecha;
            var promise=TRL.saveTRLProject(vm.TRL);
            promise.then(function (res) {
                toastr.success('Los datos se han guardado exitosamente', 'Éxito');
                var proms=TRL.getTRLByProject(vm.selectedItem.id);
                proms.then(function (res) {
                    vm.selectedItem.TRL = res.TRL;
                }).catch(function (err) {

                });
            }).catch(function (err) {
                toastr.error('Error al guardar los datos', 'Error');
            });
        }

        /**
         * Metodo para eliminar TRL's
         */

        function deleteTRL() {
            var request = {};
            request.idProyecto = vm.selectedItem.id;
            request.ProyectoTRL = vm.selectedRegisters;
            console.log(request);
           /* var promise=TRL.deleteTRLFromProject(request);
            promise.then(function (res) {
                toastr.success('Éxito', 'Registros eliminados exitosamente');
                vm.selectedItem.TRL = res.TRL;
            }).catch(function (err) {
                toastr.error('Error', 'Error al eliminar registros');
            });*/
        }
    }
})
();
