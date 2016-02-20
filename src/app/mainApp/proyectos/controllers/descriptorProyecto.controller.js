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
    function descriptorProyectoController(Descriptor,Proyecto,$scope,Restangular,Translate,toastr,$mdDialog) {
        var vm = this;

        vm.proyectos            = null;
        vm.descriptores         = null;
        vm.descriptoresProyecto = null;
        vm.descriptor = null;
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
        vm.showDescriptor=showDescriptor;
        vm.addItem              = addItem;


        ////////////'Proyecto'//////

        function activate(){
            //Ver como diferenciar entre persona y organizacion
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;
                var proms=null;
                proms=Descriptor.getTipoDescriptorByClasificacion('Proyecto');
                proms.then(function(res){
                    vm.tipoDescriptor=res;
                });

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
        function showDescriptor(){
            if(vm.descriptor.idP != undefined  && vm.descriptor.idP != null) {
                var promise = Descriptor.callAssosciated(vm.descriptor.idP);
                promise.then(function (res) {
                    vm.descriptores = res.Descriptor;

                });
            }
        }

        function selectedItemChange()
        {
            if(vm.selectedItem.id != undefined  && vm.selectedItem != null) {
                showDescriptoresProject();
            }
        }
        function showDescriptoresProject( ){
            var promise=Descriptor.getDescriptorByProject(vm.selectedItem.id);
            promise.then(function (res) {
                vm.descriptoresProyecto = res.Descriptor;
            }).catch(function (err) {

            });
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
                vm.descriptor.idP=item.idTipoDescriptor;
                var promise = Descriptor.callAssosciated(vm.descriptor.idP);
                promise.then(function (res) {
                    vm.descriptores = res.Descriptor;
                });

            }
        }

        function deleteItem(item){
            var promise=Descriptor.deleteDescriptor(item.pivot.idProyecto,item.pivot.id);
            promise.then(function(res){
                toastr.success(vm.successText,vm.successDeleteText);
                showDescriptoresProject();
            }).catch(function(err){
                toastr.error(vm.failureText,vm.failureDeleteText);
            })
        }

        function addItem()
        {
            var promise;
            vm.descriptor.idProyecto = vm.selectedItem.id;
            delete vm.descriptor.idP;
                console.log(vm.descriptor);
            if (vm.descriptor.id == null) {
                promise=Descriptor.saveDescriptor(vm.descriptor);
                promise.then(function (res) {
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.resetForm();
                    showDescriptoresProject();
                }).catch(function (err) {
                    toastr.error(vm.failureText, vm.failureStoreText);
                });
            }
            else {

                promise=Descriptor.updateDescriptor(vm.descriptor.id,vm.descriptor);
                promise.then(function (res) {
                    toastr.success(vm.successText, vm.successUpdateText);
                    vm.resetForm();
                    showDescriptoresProject();
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
