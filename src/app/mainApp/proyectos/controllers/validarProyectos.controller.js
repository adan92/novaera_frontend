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
        //vm.validarSolicitud = validarSolicitud;
        vm.buscarSolicitud=buscarSolicitud;
        vm.solicitudEncontrada=null;
        vm.solicitudacomparar;
        vm.showRow=false;
        vm.idSolicitud=null;

        vm.sol=null;
        vm.i=0;
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
                montoApoyado:"",
                trlInicial: "TRL 1",
                trlFinal: "TRL1",
                fechaRegistro: "20-10-2014",
                fechaCierre: "20-10-2014",
                resultado: "En Desarrollo del 2do Prototipo",
                validado: ""
            }, {
                id: 2,
                proyecto: "Proyecto 1",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado:"",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "31-12-15",
                resultado: "Producto ya comercializado y con gran aceptacion en San Miguel de Allende",
                validado: ""
            }, {
                id: 3,
                proyecto: "Proyecto 3",
                fondo: "Programa de fondeo 2",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 1",
                montosolicitado: "150,0000",
                montoApoyado:"",
                trlInicial: "TRL 1",
                trlFinal: "",
                fechaRegistro: "20-10-2014",
                fechaCierre: "20-10-2016",
                resultado: "",
                validado: ""
            }, {
                id: 4,
                proyecto: "Proyecto 4",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado:"",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "31-12-16",
                resultado: "Producto ya comercializado y con gran aceptacion en San Miguel de Allende",
                validado: ""
            },
            {
                id: 5,
                proyecto: "Proyecto 5",
                fondo: "Programa de fondeo 7",
                modalidad: "Modalidad 5",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 4",
                montosolicitado: "50,0000",
                montoApoyado:"",          trlInicial: "TRL 1",
                trlFinal: "",
                fechaRegistro: "20-10-2014",
                fechaCierre: "",
                resultado: "",
                validado: ""
            }, {
                id: 6,
                proyecto: "Proyecto 8",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado:"",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "",
                resultado: "",
                validado: ""
            }, {
                id: 7,
                proyecto: "Proyecto 5",
                fondo: "Programa de fondeo 2",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 1",
                montosolicitado: "50,0000",
                montoApoyado:"",
                trlInicial: "TRL 1",
                trlFinal: "TRL1",
                fechaRegistro: "20-10-2014",
                fechaCierre: "20-10-2014",
                resultado: "En Desarrollo del 2do Prototipo",
                validado: ""
            }, {
                id: 8,
                proyecto: "Proyecto 3",
                fondo: "Programa de fondeo 3",
                modalidad: "Modalidad 1",
                tecnopark: "Novaera",
                convocatoria: "Convocatoria 3",
                montosolicitado: "150,0000",
                montoApoyado:"",
                trlInicial: "TRL 2",
                trlFinal: "TRL4",
                fechaRegistro: "20-10-2014",
                fechaCierre: "31-12-15",
                resultado: "Producto ya comercializado y con gran aceptacion en San Miguel de Allende",
                validado: ""
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
            vm.showRow=false;

        }

        //////////////////
        //Busqueda de Programas de Fondeo
        function querySearch(query) {
            var results = query ? vm.fondeos.filter(createFilterFor(query)) : vm.fondeos, deferred;
            return results;
            vm.showRow=false;

        }

        function createFilterFor(query) {

            return function filterFn(fondeo) {
                return (proyecto.titulo.indexOf(query) === 0);

            };
        }

        function buscarSolicitud(){

           while(vm.solicitudEncontrada==null){

                    vm.solicitudaencotrar= vm.solicitudes[vm.i];
                if (vm.solicitudaencotrar.id==vm.idSolicitud){
                    alert(vm.solicitudaencotrar.id+'='+vm.idSolicitud);
                    vm.solicitudaencotrar.montoApoyado=  $scope.montoApoyado;
                    vm.solicitudaencotrar.validado=  $scope.estados;
                    vm.solicitudEncontrada=vm.solicitudaencotrar;
                        var solicitud = {
                            id: vm.solicitudEncontrada.id,
                            proyecto:vm.solicitudEncontrada.proyecto,
                            fondo: vm.solicitudEncontrada.fondo,
                            modalidad: vm.solicitudEncontrada.modalidad,
                            tecnopark: vm.solicitudEncontrada.tecnopark,
                            convocatoria: vm.solicitudEncontrada.convocatoria,
                            montosolicitado: vm.solicitudEncontrada.montosolicitado,
                            montoApoyado: vm.solicitudEncontrada.montoApoyado,
                            trlInicial:vm.solicitudEncontrada.trlInicial,
                            trlFinal:vm.solicitudEncontrada.trlFinal,
                            fechaRegistro:vm.solicitudEncontrada.fechaRegistro,
                            fechaCierre:vm.solicitudEncontrada.fechaCierre,
                            resultado: vm.solicitudEncontrada.resultado,
                            validado: vm.solicitudEncontrada.resultado
                            };
                    vm.solicitudes.splice(vm.i, 1);
                    vm.solicitudes.push(solicitud);
                    }
                else{
                    vm.i++;
                }

            }
        }
        $scope.validarSolicitud=function(){
            vm.sol=vm.selectedSolicitudes[0];
            vm.idSolicitud=vm.sol.id;
            vm.buscarSolicitud();
            vm.showRow=true;
            vm.showValidate=false;
            vm.i=0;


        }




    }
})

();