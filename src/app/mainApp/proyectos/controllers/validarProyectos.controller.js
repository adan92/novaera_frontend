/**
 * Created by darkxavier on 12/30/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('validarProyectosController', validarProyectosController)
        .filter('matcher',matcher);

    /* @ngInject */
    function validarProyectosController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.showValidate= false;
        vm.selectedItem = null;
        vm.selectedSolicitudes = [];
        vm.validando =validando;

        vm.estados = [
            {
                id: 1,
                value: "Aceptado"
            },
            {
                id: 2,
                value: "Rechazado"
            },
            {
                id: 3,
                value: "Pendiente"
            },
            {
                id: 4,
                value: "Culminado"
            }

        ]
        vm.solicitudes = [
            {
                id: 1,
                proyecto: "Proyecto 2",
                fondo: "Programa de fondeo 2",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 1",
                montosolicitado: "50,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 1",
                trlFinal: "TRL1",
                fechaRegistro: "20-10-2014",
                fechaCierre: "20-10-2014",
                resultado: "En Desarrollo del 2do Prototipo",
                validado: "Terminado"
            }, {
                id: 2,
                proyecto: "Proyecto 1",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "31-12-15",
                resultado: "Producto ya comercializado y con gran aceptacion en San Miguel de Allende",
                validado: "Terminado"
            }, {
                id: 3,
                proyecto: "Proyecto 3",
                fondo: "Programa de fondeo 2",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 1",
                montosolicitado: "150,0000",
                montoApoyado: "90,0000",
                trlInicial: "TRL 1",
                trlFinal: "",
                fechaRegistro: "20-10-2014",
                fechaCierre: "20-10-2016",
                resultado: "",
                validado: "Aceptado"
            }, {
                id: 4,
                proyecto: "Proyecto 4",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "31-12-16",
                resultado: "Producto ya comercializado y con gran aceptacion en San Miguel de Allende",
                validado: "Aceptado"
            },
            {
                id: 5,
                proyecto: "Proyecto 5",
                fondo: "Programa de fondeo 7",
                modalidad: "Modalidad 5",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 4",
                montosolicitado: "50,0000",
                montoApoyado: "",
                trlInicial: "TRL 1",
                trlFinal: "",
                fechaRegistro: "20-10-2014",
                fechaCierre: "",
                resultado: "",
                validado: "Rechazado"
            }, {
                id: 6,
                proyecto: "Proyecto 8",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado: "50,0000",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "",
                resultado: "",
                validado: "Rechazado"
            }, {
                id: 7,
                proyecto: "Proyecto 5",
                fondo: "Programa de fondeo 2",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 1",
                montosolicitado: "50,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 1",
                trlFinal: "TRL1",
                fechaRegistro: "20-10-2014",
                fechaCierre: "20-10-2014",
                resultado: "En Desarrollo del 2do Prototipo",
                validado: "Aceptado"
            }, {
                id: 8,
                proyecto: "Proyecto 3",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado: "60,0000",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "31-12-15",
                resultado: "Producto ya comercializado y con gran aceptacion en San Miguel de Allende",
                validado: "Aceptado"
            },


        ];
        vm.fondeos = [
            {
                id: 1,
                titulo: "Programa de fondeo 1",
                publicoObjetivo: "Nuevos Emprendedores",
                fondototal: "$2,000,000",
                criterios: "Debe ser nuevo emprendedor y contar con un proyecto factible, tecnica como economicamente"

            },
            {
                id: 2,
                titulo: "Programa de fondeo 2",
                publicoObjetivo: "Emprendedores Expertos",
                fondototal: "$3,000,000",
                criterios: "Debe ser nuevo emprendedor y contar con un proyecto factible, tecnica como economicamente"
            },
            {
                id: 3,
                titulo: "Programa de fondeo 3",
                publicoObjetivo: "Emprendedores mas  Expertos",
                fondototal: "$6,000,000",
                criterios: "Debe ser un gran emprendedor y contar con un proyecto factible, tecnica como economicamente"
            }
        ];


        function validando(solicitud,key){
            if(vm.selectedSolicitudes.length >= 2) {
                $scope.$broadcast('md.table.deselect', vm.selectedSolicitudes[0], vm.selectedSolicitudes[0].id);

            }
            vm.showValidate   = true;

        }

        //////////////////
        //Busqueda de Programas de Fondeo
        function querySearch(query) {
            var results = query ? vm.fondeos.filter(createFilterFor(query)) : vm.fondeos, deferred;
            return results;

        }

        function createFilterFor(query) {

            return function filterFn(fondeo) {
                return (proyecto.titulo.indexOf(query) === 0);
            };
        }

        /**
         * Create function to delete item
         */
        $scope.deleteItem = function (index) {
            vm.solicitudes.splice(index, 1);
            //console.log($scope.proyectos);
        }

        /**
         * Create function to add item
         */

        $scope.addItem = function () {
            var solicitud = {
                fondo: vm.selectedFondeos,
                proyecto: vm.selectedItem.titulo,
                modalidad: vm.selectedModalidad,
                montosolicitado: $scope.montosolicitado,
                trlInicial: $scope.trlInicial,
                tecnopark: $scope.tecnopark
            };
            vm.showValidate   = false;
        }
    }
})

();