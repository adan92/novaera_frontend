/**
 * Created by darkxavier on 12/27/15.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('inscribirProyectoConvocatoriaController', inscribirProyectoConvocatoriaController)
        .filter('matcher', matcher);

    /* @ngInject */
    function inscribirProyectoConvocatoriaController(Operation, $scope, Fondeo, $timeout, $mdToast, $rootScope, $state, Proyecto) {
        var vm = this;
        Operation.setTypeOperation("RegistroProyecto");
        activate();
        vm.proyectos = null;
        vm.selectedItemChange = selectedItemChange;
        vm.convocatorias = null;
        vm.modalidades = [
            {
                id: 1,
                nombre: "Modalidad 1",
                montos: "50,000-100,000",
                criterios: "Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables: "Una vez entregado el apoyo debera entregar el documento 1 , 2 y 3",
                figuras: "figura 1, figura 2, figura 3"
            }, {
                id: 2,
                nombre: "Modalidad 2",
                montos: "20,000",
                criterios: "Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables: "Una vez entregado el apoyo debera entregar el documento 1",
                figuras: "figura 1, figura 2, figura 3"
            }, {
                id: 3,
                nombre: "Modalidad 3",
                montos: "100,000-150,000",
                criterios: "Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables: "Una vez entregado el apoyo debera entregar el documento 1 , 2, 3,4,5 ",
                figuras: "figura 1, figura 2, figura 3"
            }, {
                id: 4,
                nombre: "Modalidad 4",
                montos: "150,000-200,000",
                criterios: "Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables: "Una vez entregado el apoyo debera entregar el documento 1 , 2 y 3",
                figuras: "figura 1, figura 2, figura 3"
            }, {
                id: 5,
                nombre: "Modalidad 5",
                montos: "350,000",
                criterios: "Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables: "Una vez entregado el apoyo debera entregar el documento 1 , 2, 3,4,5 ",
                figuras: "figura 1, figura 2, figura 3"
            },
        ];
        vm.fondeos = null;
        vm.tecnoparks = [
            {
                id: 1,
                Nombre: "Parque Tecnologico 1"
            },
            {
                id: 2,
                Nombre: "Parque Tecnologico 2"
            },
            {
                id: 3,
                Nombre: "Parque Tecnologico 3"
            },
            {
                id: 4,
                Nombre: "Parque Tecnologico 4"
            }
        ];
        vm.trlIniciales = [
            {
                id: 1,
                Nombre: "TRL 1"
            },
            {
                id: 2,
                Nombre: "TRL 2"
            },
            {
                id: 3,
                Nombre: "TRL 3"
            },
            {
                id: 4,
                Nombre: "TRL 4"
            },
            {
                id: 5,
                Nombre: "TRL 5"
            },
            {
                id: 6,
                Nombre: "TRL 6"
            },
            {
                id: 7,
                Nombre: "TRL 7"
            },
        ];


        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;
        vm.querySearchFondeos = querySearchFondeos;
        vm.simulateQuery = false;
        vm.isDisabled = false;
        vm.showSolicitudes = false;
        vm.showFondeos = false;
        vm.showConvocatoria = false;
        vm.showModalities = false;
        vm.showSolicitud = true;
        vm.showFields = false;
        vm.funcionfondeos = funcionfondeos;
        vm.funcionConvocatoria = funcionConvocatoria;
        vm.funcionModalidad = funcionModalidad;
        vm.selectedFondeos = [];
        vm.selectedConvocatorias = [];
        vm.selectedModalidad = [];
        vm.Fondo;
        vm.Modalidad;
        vm.Convocatoria;
        vm.fecha = new Date();

        function activate() {
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                console.log(res);
                vm.proyectos = (res);
            });


        }

        function clean(proyectos) {
            console.log("d");
            var proyecto = [];
            proyectos.forEach(function (value) {
                var copyPro = angular.copy(value);
                var alcance = (value.Alcances);
                console.log(alcance.replace(new RegExp("<p>", "gi"), ""));
                /*copyPro.Alcances=value.Alcances.replace(new RegExp( "<p>", "</p>" ), "");
                 console.log(copyPro);*/
            });
        }

        function toType(obj) {
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        }

        function funcionfondeos(fondo, key) {
            console.log("dd");
            console.log(vm.selectedFondeos[0]);
            if (vm.selectedFondeos.length > 1) {
                $scope.$broadcast('md.table.deselect', vm.selectedFondeos[0], vm.selectedFondeos[0].id);

            }
            console.log(vm.selectedFondeos[0].id);
            var promise=Fondeo.callAssosciated(vm.selectedFondeos[0]);
            promise.then(function(value){
                console.log(value);
                vm.convocatorias=value.Convocatoria;
            });

            vm.showConvocatoria = true;

        }

        function funcionConvocatoria(convocatoria, key) {
            if (vm.selectedConvocatorias.length > 1) {
                $scope.$broadcast('md.table.deselect', vm.selectedConvocatorias[0], vm.selectedConvocatorias[0].id);

            }

            vm.showModalities = true;
            var promise=Fondeo.callAssosciated(vm.selectedFondeos[0]);
            promise.then(function(value){
                console.log(value);
                vm.convocatorias=value.Convocatoria;
            });

            vm.showConvocatoria = true;


        }

        function funcionModalidad(modalidad, key) {
            if (vm.selectedModalidad.length >= 2) {
                $scope.$broadcast('md.table.deselect', vm.selectedModalidad[0], vm.selectedModalidad[0].id);

            }
            vm.showFields = true;

        }

        function selectedItemChange(item) {
            var example = Fondeo.getAllFondeos();
            example.then(function (res) {
                vm.fondeos = res;
                vm.showFondeos = true;
            });
            var solicitudes = Operation.getOperation(item.id);
            solicitudes.then(function (res) {
                vm.solicitudes = res.RegistroProyecto;
            });
            vm.showSolicitudes = true;
        }

        //////////////////
        //Busqueda de proyectos
        function querySearch(query) {
            var results = query ? vm.proyectos.filter(createFilterFor(query)) : vm.proyectos, deferred;
            return results;

        }

        //Busqueda Fondeos
        function querySearchFondeos(query) {
            var results2 = query ? vm.fondeos.filter(createFilterForFondeos(query)) : vm.fondeos, deferred;
            return results2;
        }


        function createFilterFor(query) {

            return function filterFn(proyecto) {
                return (proyecto.titulo.indexOf(query) === 0);
            };
        }

        function createFilterForFondeos(query) {

            return function filterFn(fondeo) {
                return (fondeo.titulo.indexOf(query) === 0);
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
            vm.Fondo = vm.selectedFondeos[0];
            vm.Modalidad = vm.selectedModalidad[0];
            vm.Convocatoria = vm.selectedConvocatorias[0];
            //vm.Date= String(fecha.getDate() + "-" + (fecha.getMonth() +1) + "-" + fecha.getFullYear());

            var solicitud = {
                fondo: vm.Fondo.titulo,
                proyecto: vm.selectedItem.titulo,
                modalidad: vm.Modalidad.nombre,
                convocatoria: vm.Convocatoria.titulo,
                montosolicitado: $scope.montosolicitado,
                trlInicial: $scope.trlInicial,
                tecnopark: $scope.tecnopark,
                fechaRegistro: vm.fecha
            };


            vm.solicitudes.push(solicitud);
            vm.showSolicitudes = true;
            $scope.etapa = null;
            $scope.etapaPrecedente = null;
            $scope.tarea = null;
            $scope.entregable = null;
            $scope.registrarResultado.$setPristine();

        }


    }

    function matcher() {
        return function (arr1, arr2) {
            if (arr2 == null)
                return true;

            return arr1.filter(function (val) {

                var returnable = null;
                angular.forEach(arr2, function (item) {
                    if (item.id == val.id)
                        returnable = false;
                }, val);

                if (returnable == null)
                    return true;
                else return false;
            })
        }
    }
})

();