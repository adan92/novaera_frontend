(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('indexFondeosController', indexFondeosController);

    /* @ngInject */
    function indexFondeosController($scope, $timeout, $mdToast, $rootScope, $state,$log) {
        var vm = this;
        vm.columns = [{
            title: 'Titulo',
            field: 'title',
            sortable: true
        },{
            title: 'Publico Objetivo',
            field: 'target',
            sortable: true
        },{
            title: 'Fondo Total',
            field: 'fondo',
            sortable: true
        },{
            title: 'Rubro de Apoyo',
            field: 'support',
            sortable: true
        },{
            title: 'Modalidad',
            field: 'modality',
            sortable: true
        }];

        vm.contents = [{
            title: 'Fondo NOVAERA',
            target: 'Nuevos Emprendesores',
            fondo: '$250,000',
            support:'Novaera',
            modality:'Conformacion de la Empresa, Comercializacion'
        },{
            title: 'Startup GTO',
            target: 'Nuevos Emprendesores',
            fondo: '$150,000.00',
            support:'STARTUP MEXICO',
            modality:'Conformacion de la Empresa'
        },{
            title: 'Startup Mexico',
            target: 'Nuevos Emprendesores',
            fondo: '$350,000.00 MXN',
            support:'Startup Mexico',
            modality:'Conformacion de la Empresa, Fabricacion de Prototipo'
        },{
            title: 'Titulo',
            target: 'Persona Objetivo',
            fondo: 'Monto',
            support:'Soporte',
            modality:'Modalidad'
        },{
            title: 'Titulo2',
            target: 'Persona Objetivo2',
            fondo: 'Monto2',
            support:'Soporte2',
            modality:'Modalidad2'
        },{
            title: 'Titulo3',
            target: 'Persona Objetivo3',
            fondo: 'Monto3',
            support:'Soporte3',
            modality:'Modalidad3'

        }];
        //Datos
        $scope.fondeo=[
            {
                titulo:"Startup GTO",
                monto: "$150,000.00 MXN",
                terminos: "<ul><li>Termino 1</li><li>Termino 2</li></ul>",
                Modalidades: [
                    "Modalidad 1",
                    "Modalidad 2"
                ],
                display:"Startup GTO"
            },
            {
                titulo:"Startup Mexico",
                monto: "$350,000.00 MXN",
                terminos: "<ul><li>Termino 1</li><li>Termino 2</li><li>Termino 4</li><li>Termino 5</li><li>Termino 6</li></ul>",
                Modalidades: [
                    "Modalidad 1",
                    "Modalidad 2",
                    "Modalidad 1",
                    "Modalidad 2"
                ],
                display:"Startup Mexico"
            },
            {
                titulo:"Fondeo PyMes",
                monto: "$1,500,000.00 MXN",
                terminos: "<ul><li>Termino 1</li><li>Termino 2</li><li>Termino 4</li><li>Termino 5</li><li>Termino 6</li></ul>",
                Modalidades: [
                    "Modalidad 1",
                    "Modalidad 2",
                    "Modalidad 1",
                    "Modalidad 2"
                ],
                display:"PyMes"
            }
        ];

        //grafica de Pastel
        $scope.my_fondeos_labels= ['Startup GTO','Startup Mexico','Fondeo PyMes'];
        $scope.my_fondeos_data= ['3','8','1'];

        // grafica area
        $scope.my_fondeos_area_labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];
        $scope.my_fondeos_area_series = ['Startup GTO', 'Startup Mexico','Fondeo PyMes'];
        $scope.my_fondeos_area_data = [
            [0, 100000, 250000, 360000, 360000, 700000, 700000],
            [100000, 280000, 350000, 400000, 500000, 500000,850000],
            [0, 0, 0, 0, 0, 1500000, 1500000],
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };


        //

        vm.fondeos             = $scope.fondeos;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;


        //////////////////
        function querySearch (query) {
            var results = query ? vm.fondeos.filter( createFilterFor(query) ) : vm.fondeos, deferred;
                return results;

        }


        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {

            return function filterFn(fondeo) {
                return (fondeo.titulo.indexOf(query) === 0);
            };
        }



    }
})();
