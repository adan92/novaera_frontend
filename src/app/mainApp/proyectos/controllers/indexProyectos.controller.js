(function () {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('indexProyectosController', indexProyectosController);

    /* @ngInject */
    function indexProyectosController(Proyecto,Descriptor, $mdDialog, Translate, toastr) {
        var vm = this;

        /* Variables */

        vm.tipoDescriptores             = null;
        vm.selectedTipoDescriptor       = null;
        vm.selectedDescriptor           = null;
        vm.descriptores                 = null;
        vm.loadingProyectos             = false;
        vm.loadingDescriptorData        = false;
        vm.Chart                        = null;

        vm.clickedProjects              = null;
        vm.proyectos                    = null;
        vm.selectedItem                 = null;
        vm.searchText                   = null;
        vm.simulateQuery                = false;
        vm.isDisabled                   = false;
        vm.query = {
            order: 'id',
            limit: 5,
            page: 1
        };

        /*Funciones */

        vm.activate                     = activate();
        vm.clear                        = clear;
        vm.onClick                      = onClick;
        vm.getDescriptores              = getDescriptores;
        vm.getProyectosByDescriptor     = getProyectosByDescriptor;
        vm.getProyectos                 = getProyectos;
        vm.openDialog                   = openDialog;
        vm.deleteProjectDialog          = deleteProjectDialog;
        vm.deleteProject                = deleteProject;

        function activate() {
            getProyectos();
            getTipoDescriptores();

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

        function clear() {
            vm.clickedProjects = null;
        }

        function onClick(element, evt) {

            var label = element[0].label;
            var descriptor =  searchDescriptores(label);
            vm.selectedDescriptor = descriptor.id;
            getProyectosByDescriptor();

        }

        function searchDescriptores(label) {

            var element = _.findWhere(vm.descriptores,{Titulo:label})
            if(element!=undefined)
                return element;
            return null;
        }



        function getProyectos() {
            vm.loadingProyectos = true;

            vm.selectedDescriptor = null;
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;
                vm.loadingProyectos = false;

            }).catch(function (err) {
                toastr.error(vm.failureLoad, vm.failureText);
            });
        }


        function getTipoDescriptores()
        {
            var promise = Descriptor.getTipoDescriptorByClasificacion('Proyecto');
            promise.then(function(res){
                vm.tipoDescriptores = res;
            }).catch(function(err){

            });
        }


        /**
         *
         */

        function getDescriptores()
        {
            vm.loadingDescriptorData = true;
            vm.descriptores = null;
            vm.Chart = null;
            var promise = Descriptor.callAssosciated(vm.selectedTipoDescriptor);
            promise.then(function(res){
                console.log(res);
               vm.descriptores = res.Descriptor;
            }).catch(function(err){

            });

            var promiseChart = Proyecto.countByTipoDescriptor(vm.selectedTipoDescriptor);

            promiseChart.then(function(res){
                vm.loadingDescriptorData = false;
               vm.Chart = res;
            }).catch(function(err){

            });
        }

        /**
         *
         */

        function getProyectosByDescriptor()
        {
            vm.loadingProyectos = true;
            var promise = Proyecto.getByDescriptor(vm.selectedDescriptor);
            promise.then(function(res){
                vm.loadingProyectos = false;
                vm.proyectos = res;
            }).catch(function(err){

            });
        }






        /**
         *
         */
        function openDialog(event,proyecto)
        {
            var config = {
                controller: 'proyectoIndexDialogController',
                templateUrl:'app/mainApp/proyectos/infoDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent:event,
                clickOutsideToClose:true,
                fullscreen: true,
                locals:{selectedProyecto:proyecto},
                controllerAs: 'vm'
            };

            $mdDialog.show(config).then(function(reply){

            },function()
            {

            });


        }


        function deleteProject(proyecto){

            Proyecto.deleteProject(proyecto).then(function(res){
               toastr.success(vm.successText,vm.successDeleteText);
                vm.getProyectos();
            }).catch(function(err){
               toastr.error(vm.failureText,vm.failureDeleteText);
            });


        }

        function deleteProjectDialog(event,proyecto)
        {
            var confirm = $mdDialog.confirm()
                .title(vm.sureText)
                .content(vm.dialogText)
                .ariaLabel(vm.sureText)
                .targetEvent(event)
                .ok(vm.acceptText)
                .cancel(vm.cancelText);
            $mdDialog.show(confirm).then(function () {
                vm.deleteProject(proyecto);

            }, function () {
                toastr.info(vm.cancelDelete, vm.cancelTitle);
            });
        }


    }
})();
