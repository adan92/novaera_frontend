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
    function inscribirProyectoConvocatoriaController($timeout,toastr,parqueTecnologico, TRL, Convocatoria, Operation,
                                                     registroProyecto,$scope, Fondeo,Proyecto) {
        var vm = this;
        Operation.setTypeOperation("RegistroProyecto");
        activate();
        vm.proyectos = null;
        vm.convocatorias = null;
        vm.modalidades = null;
        vm.fondeos = null;
        vm.tecnoparks = null;
        vm.trlIniciales = null;
        vm.trlFinales=null;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.simulateQuery = false;
        vm.isDisabled = false;
        vm.showSolicitudes = false;
        vm.showFondeos = false;
        vm.showConvocatoria = false;
        vm.showModalities = false;
        vm.showFields = false;
        vm.selectedFondeos = [];
        vm.selectedConvocatorias = [];
        vm.selectedModalidad = [];
        vm.selectedSolicitudes=[];
        vm.fecha = new Date();
        vm.trlInicial=null;
        vm.trlFinal=null;
        vm.tecnopark=null;
        vm.montosolicitado=null;
        vm.addItem = addItem;
        vm.selectedItemChange = selectedItemChange;
        vm.querySearch = querySearch;
        vm.querySearchFondeos = querySearchFondeos;
        vm.funcionfondeos = funcionfondeos;
        vm.funcionConvocatoria = funcionConvocatoria;
        vm.funcionModalidad = funcionModalidad;
        vm.showSolicitudInfo=showSolicitudInfo;

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
            var promise = Fondeo.callAssosciated(vm.selectedFondeos[0]);
            promise.then(function (value) {
                console.log(value);
                vm.convocatorias = value.Convocatoria;
            });

            vm.showConvocatoria = true;

        }

        function funcionConvocatoria(convocatoria, key) {
            if (vm.selectedConvocatorias.length > 1) {
                $scope.$broadcast('md.table.deselect', vm.selectedConvocatorias[0], vm.selectedConvocatorias[0].id);

            }

            vm.showModalities = true;
            console.log(vm.selectedConvocatorias);
            var promise = Convocatoria.showModalitiesRelation(vm.selectedConvocatorias[0]);
            promise.then(function (value) {
                console.log(value);
                vm.modalidades = value;
            });

            vm.showConvocatoria = true;


        }

        function funcionModalidad(modalidad, key) {
            var promise;
            if (vm.selectedModalidad.length >= 2) {
                $scope.$broadcast('md.table.deselect', vm.selectedModalidad[0], vm.selectedModalidad[0].id);

            }
            vm.showFields = true;
            promise = parqueTecnologico.getAllParqueTecnologico();
            promise.then(function (value) {

                vm.tecnoparks = value;
            });
            promise = TRL.getAllTLR();
            promise.then(function (value) {
                vm.trlIniciales=value;
                vm.trlFinales = value;
            });
            /*promise = TRL.getTRLByProject(vm.selectedItem.id);
            promise.then(function (value) {
                vm.trlInicial = value;
            });*/
        }

        function selectedItemChange(item) {
            var example = Fondeo.getAllFondeos();
            example.then(function (res) {
                console.log(res);
                vm.fondeos = res;
                vm.showFondeos = true;
            });
            /*$scope.promise = $timeout(function () {
                // code
            }, 6000);*/
            var solicitudes = Operation.getOperation(item.id);
            solicitudes.then(function (res) {
                console.log(res);
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

        function addItem() {


            var solicitud = {
                idProyecto: vm.selectedItem.id,
                idTRLInicial: vm.trlInicial,
                idTRLFinal: vm.trlFinal,
                idParque: vm.tecnopark,
                idConvocatoriaModalidad: vm.selectedModalidad[0].pivot.id,
                MontoSolicitado: vm.montosolicitado
            };
            var promise=registroProyecto.registerProject(solicitud);
            promise.then(function(val){
                toastr.success(vm.successText, vm.successStoreText);
            }).catch(function(err){
                toastr.error(vm.failureText, vm.failureStoreText);
            });

        }


    }
    function showSolicitudInfo(item){
        console.log(item);
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