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
    function inscribirProyectoConvocatoriaController(Catalogo,$mdDialog, $mdMedia, toastr, parqueTecnologico, TRL, Convocatoria, Operation,
                                                     registroProyecto, $scope, Fondeo, Proyecto) {
        //<editor-fold desc="Declaración de variables y metodos">
        var vm = this;
        Operation.setTypeOperation("RegistroProyecto");
        activate();
        vm.proyectos = null;
        vm.convocatorias = null;
        vm.modalidades = null;
        vm.fondeos = null;
        vm.tecnoparks = null;
        vm.trlIniciales = null;
        vm.trlFinales = null;
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
        vm.selectedSolicitudes = [];
        vm.fecha = new Date();
        vm.trlInicial = null;
        vm.trlFinal = null;
        vm.tecnopark = null;
        vm.montosolicitado = null;
        vm.addItem = addItem;
        vm.selectedItemChange = selectedItemChange;
        vm.querySearch = querySearch;
        vm.querySearchFondeos = querySearchFondeos;
        vm.funcionfondeos = funcionfondeos;
        vm.funcionConvocatoria = funcionConvocatoria;
        vm.funcionModalidad = funcionModalidad;
        vm.showSolicitudInfo = showSolicitudInfo;
        vm.funcionConvDesc=funcionConvDesc;
        vm.funcionModaDesc=funcionModaDesc;
        vm.funcionFormsDesc=funcionFormsDesc;
        //</editor-fold >

        function activate() {
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = (res);
            });
        }
        //<editor-fold desc="Método de ayuda">

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
        function cleanConvocatoria(){
            vm.showConvocatoria = false;
            vm.convocatorias=null;
        }
        function cleanModalidad(){
            vm.showModalities = false;
            vm.modalidades=null;
        }
        function cleanFormulario(){
            vm.showFields = false;
            vm.tecnoparks=null;
            vm.trlIniciales = null;
            vm.trlFinales = null;
        }
        //</editor-fold >
        //<editor-fold desc="Métodos que se ejecutan al deseleccionar en cada tabla">
        //Método se encarga de mostrar o ocultar las convocatorias
        //cuando se haya deseleccionado varios items
        function funcionConvDesc(){
            if (vm.selectedFondeos.length ==0) {
                cleanConvocatoria();
                cleanModalidad();
                cleanFormulario();
            }else if(vm.selectedFondeos.length==1){
                enableConvocatoria();
            }
        }
        /*
        * Método se encarga de mostrar o ocultar las modalidades
        * cuando se hay deseleccionado varios items
        * */
        function funcionModaDesc(){
            if (vm.selectedConvocatorias.length ==0) {
                //cleanScreen();
                cleanModalidad();
                cleanFormulario();
            }else if(vm.selectedConvocatorias.length==1){
                enableModalidad();
            }
        }

        /*
         * Método se encarga de mostrar u ocultar formulario
         * cuando se hay deseleccionado varios items
         * */
        function funcionFormsDesc(){
            if (vm.selectedModalidad.length ==0) {
                //cleanScreen();
                cleanFormulario()
            }else if(vm.selectedModalidad.length==1){
                enableFormulario();
            }
        }
        //</editor-fold>
        //<editor-fold desc="Métodos que se ejecutan al seleccionar en cada tabla">
        function funcionfondeos(fondo, key) {
            if (vm.selectedFondeos.length > 1) {
               $scope.$broadcast('md.table.deselect', vm.selectedFondeos[0], vm.selectedFondeos[0].id);
                cleanConvocatoria();
                cleanModalidad();
                cleanFormulario();
            }else {
                enableConvocatoria();
            }
        }

        function funcionConvocatoria(convocatoria, key) {
            if (vm.selectedConvocatorias.length > 1) {
                $scope.$broadcast('md.table.deselect', vm.selectedConvocatorias[0], vm.selectedConvocatorias[0].id);
                cleanModalidad();
                cleanFormulario();
            }else {
                enableModalidad();
            }
        }
        function funcionModalidad(modalidad, key) {
            var promise;
            if (vm.selectedModalidad.length >= 2) {
                $scope.$broadcast('md.table.deselect', vm.selectedModalidad[0], vm.selectedModalidad[0].id);
                cleanFormulario();


            }else {
                enableFormulario();
            }
            /*promise = TRL.getTRLByProject(vm.selectedItem.id);
             promise.then(function (value) {
             vm.trlInicial = value;
             });*/
        }
        //</editor-fold >
        //<editor-fold desc="Métodos que se encargan de habilitar cada tabla">
        function enableModalidad(){
            vm.showModalities = true;
            var promise = Convocatoria.showModalitiesRelation(vm.selectedConvocatorias[0]);
            promise.then(function (value) {
                vm.modalidades = value;
            });
        }
        function enableConvocatoria(){
            var promise = Fondeo.callAssosciated(vm.selectedFondeos[0]);
            promise.then(function (value) {
                vm.convocatorias = value.Convocatoria;
            });
            vm.showConvocatoria = true;
        }
        function enableFormulario(){
            vm.showFields = true;
            var promise;
            promise = Catalogo.getAllCatalogo('ParqueTecnologico');
            promise.then(function (value) {

                vm.tecnoparks = value.ParqueTecnologico;
            });
            promise = TRL.getAllTLR();
            promise.then(function (value) {
                vm.trlIniciales = value;
                vm.trlFinales = value;
            });
        }
        //</editor-fold>

        function selectedItemChange(item) {
            var example = Fondeo.getAllFondeos();
            example.then(function (res) {
                vm.fondeos = res;
                vm.showFondeos = true;
            });
            /*$scope.promise = $timeout(function () {
             // code
             }, 6000);*/
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
            var promise = registroProyecto.registerProject(solicitud);
            promise.then(function (val) {
                toastr.success(vm.successText, vm.successStoreText);
            }).catch(function (err) {
                toastr.error(vm.failureText, vm.failureStoreText);
            });

        }

        function showSolicitudInfo(item, ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

            $mdDialog.show({
                    controller: 'informacionSolicitudController',
                    controllerAs: 'vm',
                    templateUrl: 'app/mainApp/proyectos/solicitudInformacion.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen,
                    resolve: {
                        solicitud: function () {
                            return item;
                        }
                    }
                })
                .then(function (answer) {
                    if(answer==1){
                        //Delete
                    }
                }, function () {
                });
            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
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