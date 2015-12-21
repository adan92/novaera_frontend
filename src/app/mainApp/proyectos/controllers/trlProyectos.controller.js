/**
 * Created by lockonDaniel on 10/16/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('trlProyectosController', trlProyectosController);

    /* @ngInject */
    function trlProyectosController($scope, Restangular, toastr,$mdDialog,$translate,$q) {
        var vm = this;

        vm.deferred         =    $q.defer();

        vm.today            =    new Date();
        //Variables a usar
        vm.proyectos        =    null;
        vm.activate         =    activate();
        vm.TRLItems         =    null;
        vm.TRL              =    {
            idProyecto:null,
            idTRL: null,
            Info: {
                Descripcion: null,
                Fecha: null
            }
        };
        vm.infoTRL          =    null;
        vm.selectedTRL      =    null;
        vm.selectedDate     =    vm.today;
        vm.minDate          =    new Date(vm.today.getFullYear()-1,vm.today.getMonth(),vm.today.getDate());
        vm.maxDate          =    vm.today;
        vm.registerTRL      =    registerTRL;

        //Variables para el md-autocomplete
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;
        vm.selectedItemChange = selectedItemChange;

        //Variables para el md-data-table
        vm.deleteTRL          = deleteTRL;
        vm.selectedRegisters  = null;
        //Orden de la tabla md-data-table
        vm.query = {
            filter: '',
            limit: '10',
            order: 'id',
            page: 1
        };

        //Dialogo

        vm.createDialog = createDialog;




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
                vm.deleteTRL();
            }, function() {
                console.log("Cancelado");
            });


        }




        function activate()
        {
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
               vm.proyectos = res.Proyectos;
               Restangular.all('TRL').customGET().then(function(res){
                   vm.TRLItems = res.TRL;
               }).catch(function(err){});


            }).catch(function(err){

            });
            $translate('PROJECT.DIALOGS.YOU_SURE').then(function(text){
                vm.sureText = text;
                $translate('PROJECT.DIALOGS.ACCEPT').then(function(text2){
                    vm.acceptText = text2;
                    $translate('PROJECT.DIALOGS.CANCEL').then(function(text3){
                        vm.cancelText = text3;
                        $translate('PROJECT.DIALOGS.WARNING').then(function(text4){
                           vm.dialogText = text4;
                            return text4;
                        });
                        return text3;
                    });
                    return text2;
                });
                return text;
            });
        }




        //Lists de estadísticas
        $scope.estadisticas ={
            data:[4,2,7,9,1,3,0,1,0],
            labels:['TRL1','TRL2','TRL3','TRL4','TRL5','TRL6','TRL7','TRL8','TRL9']
        }





        function selectedItemChange()
        {

            if(vm.selectedItem!=null)
            {
                Restangular.all('Proyecto').one('TRL',vm.selectedItem.id).customGET().then(function(res){
                    vm.selectedItem.TRL = res.TRL
                }).catch(function(err){

                })
            }

        }


        //////////////////
        function querySearch (query) {
            var results = query ? vm.proyectos.filter( createFilterFor(query) ) : vm.proyectos, deferred;
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


        //Config for tables

        vm.columns = [
            {
            title: 'TRL',
            field: 'idTRL',
            sortable: true
        },
            {
            title: 'Descripcion',
            field: 'Descripcion',
            sortable: false
        },
            {
            title: 'Fecha',
            field: 'Fecha',
            sortable: true
        }];

        /**
         * Create Function to Add Item
         */

        function registerTRL()
        {

            var fecha               = moment(new Date(vm.selectedDate)).format('YYYY-MM-DD');
            vm.TRL.idProyecto       = vm.selectedItem.id;
            vm.TRL.Info.Fecha       = fecha;
            Restangular.all('Proyecto').all('TRL').customPOST(vm.TRL).then(function(res){
               toastr.success('Los datos se han guardado exitosamente','Éxito');
                Restangular.all('Proyecto').one('TRL',vm.selectedItem.id).customGET().then(function(res){
                    vm.selectedItem.TRL = res.TRL
                }).catch(function(err){

                });
            }).catch(function(err){
                toastr.error('Error al guardar los datos','Error');
            });
        }

        function deleteTRL()
        {
            var request = {};
            request.idProyecto = vm.selectedItem.id;
            request.ProyectoTRL = vm.selectedRegisters;
            Restangular.all('Proyecto').all('TRL').all('Delete').customPOST(request).then(function(res){
               toastr.success('Éxito','Registros eliminados exitosamente');
               vm.selectedItem.TRL = res.TRL;
            }).catch(function(err){
                toastr.error('Error','Error al eliminar registros');
            });
        }



    }





})


();
