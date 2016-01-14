/**
 * Created by lockonDaniel on 10/16/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('resultadosProyectosController', resultadosProyectosController);

    /* @ngInject */
    function resultadosProyectosController($scope,Restangular,Translate,toastr) {
        var vm = this;
        vm.activate = activate();

        $scope.proyecto = {};
        vm.tipos = [{value:1,display:"Proceso"},{value:2,display:"Producto"},{value:3,display:"Servicio"}];
        vm.status = [{value:1,display:"Sin iniciar"},{value:2,display:"En Proceso"},{value:3,display:"Completado"}];


        //
        vm.changeModel        = changeModel;
        vm.showTable          = true;

        //Variables para el md-autocomplete
        vm.querySearch        = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.proyectos          = null;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;

        //Variables para la tabla
        vm.resultados         = null;
        vm.patentes           = null;
        vm.resultadosPromise  = null;
        vm.patentesPromise    = null;
        vm.proyectosPromise   = null;
        vm.tableModel         = null;

        vm.query            = {
            filter: '',
            limit: '10',
            order: 'id',
            page: 1
        };



        function activate()
        {
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
                vm.proyectos = res.Proyectos;
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


        function changeModel()
        {
            if(vm.showTable)
            {
                vm.tableModel = vm.resultados;
            }
            else
            {
                vm.tableModel = vm.patentes;
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
                return (proyecto.titulo.indexOf(query) === 0);
            };
        }

        /**
         * Columns for tables
         */

        $scope.showTable = false;
        vm.columns_resultados = [
            {
            title: 'id',
            field: 'id',
            sortable: true
        },{
            title: 'Título',
            field: 'NombreTitulo',
            sortable: true
        },{
            title: 'Tipo',
            field: 'Tipo',
            sortable: true
        },{
            title: 'Fecha',
            field: 'Fecha',
            sortable:true
        },{
            title: 'Descripción',
            field: 'DescripciónResumen',
            sortable:false
        },{
            title: 'Status',
            field: 'Status',
            sortable:true
        }
        ];
        vm.columns_patentes = [
            {
                title: 'id',
                field: 'id',
                sortable: true
            },{
                title: 'Titulo',
                field: 'titulo',
                sortable: false
            },{
                title: 'Registro',
                field: 'fecha_registro',
                sortable: true
            },{
                title: 'Aprobación',
                field: 'fecha_aprobacion',
                sortable: true
            },{
                title: 'Registro',
                field: 'numero_registro',
                sortable: false
            },{
                title: 'Paises',
                field: 'paises_proteccion',
                sortable: false
            }
        ];

        /**
         * Función de selección de proyecto
         */

        function selectedItemChange()
        {
            vm.resultadosPromise = Restangular.all('Proyecto').one('Resultados',vm.selectedItem.id).all('Todos').customGET();
            vm.resultadosPromise.then(function(res){
               vm.resultados = res.Resultado;
               vm.tableModel = vm.resultados;
                console.log(vm.tableModel);
            }).catch(function(err){

            });
            vm.patentesPromise = Restangular.all('Proyecto').one('Resultados',vm.selectedItem.id).all('Patente').customGET();
            vm.patentesPromise.then(function(res){
                vm.patentes = res.Resultado;
            }).catch(function(err){

            });

        }


        /**
         * Funcion para agregar resultado
         */

        $scope.addResult = function()
        {
            $scope.resultado.id =Math.floor((Math.random() * 10) + 2);
            $scope.resultado.fecha= moment($scope.resultado.fecha).format('DD-MM-YYYY');
            vm.selectedItem.resultados.push($scope.resultado);
            $scope.resultado=null;
            $scope.agregarResultado.$setPristine();
        };

        /**
         * Funcion para agregar patente
         */
        $scope.addPatent = function()
        {
            $scope.patente.id =Math.floor((Math.random() * 10) + 2);
            $scope.patente.fecha_registro= moment($scope.patente.fecha_registro).format('DD-MM-YYYY');
            $scope.patente.fecha_aprobacion= moment($scope.patente.fecha_aprobacion).format('DD-MM-YYYY');
            vm.selectedItem.patentes.push($scope.patente);
            $scope.patente=null;
            $scope.agregarPatente.$setPristine();

        };

    }
})();
