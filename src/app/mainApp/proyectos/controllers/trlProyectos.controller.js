/**
 * Created by lockonDaniel on 10/16/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('trlProyectosController', trlProyectosController);

    /* @ngInject */
    function trlProyectosController($scope, Restangular, toastr) {
        var vm = this;

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


        function activate()
        {
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
               vm.proyectos = res.Proyectos;
               Restangular.all('TRL').customGET().then(function(res){
                   vm.TRLItems = res.TRL;
               }).catch(function(err){});


            }).catch(function(err){

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



    }





})


();
