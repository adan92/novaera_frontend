/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('descriptorProyectoController', descriptorProyectoController)
        .filter('matcher',matcher);

    /* @ngInject */
    function descriptorProyectoController($scope,Restangular,Translate,toastr,$mdDialog) {
        var vm = this;
        vm.proyectos            = null;
        vm.descriptores         = null;
        vm.descriptoresProyecto = null;
        vm.descriptor           = null;
        vm.activate             = activate();
        vm.selectedItem         = null;
        vm.searchText           = null;
        vm.querySearch          = querySearch;
        vm.simulateQuery        = false;
        vm.isDisabled           = false;
        vm.createDialog         = createDialog;
        vm.selectedItemChange   = selectedItemChange;
        vm.resetForm            = resetForm;
        vm.edit                 = edit;
        vm.deleteItem           = deleteItem;


        vm.tipoDescriptor = [{id:1,Titulo:"Tipo de Descriptor"}];
        //////////////////

        function activate(){
            //Ver como diferenciar entre persona y organizacion
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
                vm.proyectos = res.Proyectos;
                Restangular.all('Descriptor').customGET().then(function(res){
                    vm.descriptores = res.Descriptor;
                }).catch(function(err){

                });

            }).catch(function(err){

            });
            vm.sureText             = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText           = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText           = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText           = Translate.translate('DIALOGS.WARNING');
            vm.successText          = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText     = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText    = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText    = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText          = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText     = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText    = Translate.translate('DIALOGS.FAIL_DELETE');
        }

        function selectedItemChange()
        {
            if(vm.selectedItem.id != undefined  && vm.selectedItem != null) {
                Restangular.all('Proyecto').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                    vm.descriptoresProyecto = res.Descriptor;
                }).catch(function (err) {
                    console.log(err);
                });
            }
        }

        function querySearch (query) {
            var results = query ? vm.proyectos.filter( createFilterFor(query) ) : vm.proyectos, deferred;
            return results;

        }


        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(proyectos) {
                return (proyectos.Titulo.indexOf(query) === 0);
            };
        }

        function createDialog(ev,item)
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
                vm.deleteItem(item);
            }, function() {
                console.log("Cancelado");
            });
        }

        function resetForm()
        {
            vm.descriptor=null;
            $scope.registrarResultado.$setPristine();
        }

        function edit(item)
        {
            if(item!=undefined)
            {
                vm.descriptor = item.pivot;
            }
        }

        function deleteItem(item){
            Restangular.all('Proyecto').one('Descriptor',item.pivot.idProyecto).all(item.pivot.id).customDELETE().then(function(res){
                toastr.success(vm.successText,vm.successDeleteText);
                Restangular.all('Proyecto').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                    vm.descriptoresProyecto = res.Descriptor;
                }).catch(function (err) {

                });
            }).catch(function(err){
                toastr.error(vm.failureText,vm.failureDeleteText);
            })
        };

        $scope.addItem = function()
        {
            vm.descriptor.idProyecto = vm.selectedItem.id;
            if (vm.descriptor.id == null) {
                Restangular.all('Proyecto').all('Descriptor').customPOST(vm.descriptor).then(function (res) {
                    //Mandamos el mensaje de éxito
                    toastr.success(vm.successText, vm.successStoreText);
                    //Limpiamos las variables ligadas a formulario
                    vm.descriptor.id = null;
                    vm.descriptor.idDescriptor = null;
                    vm.descriptor.observaciones = null;
                    vm.resetForm();
                    //Pedimos la lista de descriptores de la BD
                    Restangular.all('Proyecto').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                        vm.descriptoresProyecto = res.Descriptor;
                    }).catch(function (err) {

                    });
                }).catch(function (err) {
                    toastr.error(vm.failureText, vm.failureStoreText);
                });

            }
            else {
                Restangular.one('Proyecto').one('DescriptorU',vm.descriptor.id).customPUT(vm.descriptor).then(function (res) {
                    toastr.success(vm.successText, vm.successUpdateText);
                    vm.descriptor.id = null;
                    vm.descriptor.idDescriptor = null;
                    vm.descriptor.observaciones = null;
                    vm.resetForm();
                    Restangular.all('Proyecto').one('Descriptor', vm.selectedItem.id).customGET().then(function (res) {
                        vm.descriptoresProyecto = res.Descriptor;
                    }).catch(function (err) {

                    });
                }).catch(function (err) {
                    toastr.error(vm.failureText, vm.failureStoreText);
                });
            }
        };
    }

    function matcher()
    {
        return function(arr1,arr2){
            if(arr2==null)
                return true;

            return arr1.filter(function(val){

                var returnable=null;
                angular.forEach(arr2,function(item){
                    if(item.id==val.id)
                        returnable = false;
                },val);

                if(returnable==null)
                    return true;
                else return false;
            })
        }
    }
})

();
