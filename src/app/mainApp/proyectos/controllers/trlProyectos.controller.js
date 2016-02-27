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
        vm.waiting = false;
        vm.isCreating = false;
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
                toastr.info(vm.cancelDelete, vm.cancelTitle);
            });

        }


        function activate() {
            var promise;
            promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;
                var prom = TRL.getAllTLR();
                prom.then(function (res) {
                    vm.TRLItems = res;
                }).catch(function (err) {
                    toastr.error(vm.failureText, vm.failureLoad);
                });
            }).catch(function (err) {
                toastr.error(vm.failureText, vm.failureLoad);
            });
            var promiseChart = Proyecto.countByTRL();

            promiseChart.then(function(res){
                vm.estadisticas = res;
            }).catch(function(err){

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
            vm.failureLoad = Translate.translate('DIALOGS.FAIL_LOAD');
            vm.cancelDelete = Translate.translate('DIALOGS.CANCEL_DELETE');
            vm.cancelTitle = Translate.translate('DIALOGS.CANCEL_TITLE');

        }






        function selectedItemChange(item) {
            if (vm.selectedItem !== null) {
                vm.waiting = true;
                vm.isCreating=true;
                getTRLByProject();
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
                toastr.success(vm.successStoreText,vm.successText);
                getTRLByProject();
            }).catch(function (err) {
                toastr.error(vm.failureStoreText, vm.failureText);
            });
        }

        /**
         * Metodo para eliminar TRL's
         */

        function deleteTRL() {
            var request = {};
            request.idProyecto = vm.selectedItem.id;
            request.ProyectoTRL = vm.selectedRegisters;
            var promise=TRL.deleteTRLFromProject(request);
            promise.then(function (res) {
                toastr.success(vm.successDeleteText,vm.successText);
                vm.selectedItem.TRL = res.TRL;
            }).catch(function (err) {
                toastr.error(vm.failureDeleteText, vm.failureText);
            });
        }

        function getTRLByProject(){
            vm.waiting = true;
            vm.isCreating=true;
            var proms=TRL.getTRLByProject(vm.selectedItem.id);
            proms.then(function (res) {

                vm.selectedItem.TRL = res.TRL;
                vm.waiting = false;
                vm.isCreating=false;
            }).catch(function (err) {
                vm.isCreating=false;
                vm.waiting = false;
                toastr.error(vm.failureLoad, vm.failureText);
            });
        }
    }
})
();
