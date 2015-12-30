/**
 * Created by darkxavier on 12/27/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('inscribirProyectoConvocatoriaController', inscribirProyectoConvocatoriaController)
        .filter('matcher',matcher);

    /* @ngInject */
    function inscribirProyectoConvocatoriaController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;

        vm.proyectos = [
            {
                id: 1,
                titulo: "Proyecto 1",
                descripcion:"Es un proyecto genial que sirve para algo",
                antecedentes:"alguno",
                justificacion:"Ammm este ... esta muy genial",
                objetivos:"objetivo 1, y objetivo 2",
                alcances:"El cielo es el limite"

            },{
                id: 2,
                titulo: "Proyecto 2",
                descripcion:"Es un proyecto genial que sirve para algo",
                antecedentes:"alguno",
                justificacion:"Ammm este ... esta muy genial",
                objetivos:"objetivo 1, y objetivo 2",
                alcances:"El cielo es el limite"
            },
            {
                id: 3,
                titulo: "Proyecto 3",
                descripcion:"Es un proyecto genial que sirve para algo",
                antecedentes:"alguno",
                justificacion:"Ammm este ... esta muy genial",
                objetivos:"objetivo 1, y objetivo 2",
                alcances:"El cielo es el limite"
            }
        ];
        vm.convocatorias=[{
            id:1,
            titulo:"Convocatoria 1",
            fechainicio:"12-12-15",
            fechatermino:"12-03-16",
            requisitos:"Mandar slicitud antes del 12 de diciembre",
            monto:"$150,000"
        },{

            id:2,
            titulo:"Convocatoria 2",
            fechainicio:"24-12-15",
            fechatermino:"30-03-16",
            requisitos:"Mandar slicitud antes del 30 de diciembre",
            monto:"$250,000",
        },{
            id: 3,
            titulo: "Convocatoria 3",
            fechainicio: "12-12-15",
            fechatermino: "12-03-16",
            requisitos: "Mandar slicitud antes del 12 de diciembre",
            monto: "$150,000",
        }
        ];
        vm.modalidades=[
            {
                id: 1,
                nombre: "Modalidad 1",
                montos:"50,000-100,000",
                criterios:"Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables:"Una vez entregado el apoyo debera entregar el documento 1 , 2 y 3",
                figuras:"figura 1, figura 2, figura 3"
            },{
                id: 2,
                nombre: "Modalidad 2",
                montos:"20,000",
                criterios:"Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables:"Una vez entregado el apoyo debera entregar el documento 1",
                figuras:"figura 1, figura 2, figura 3"
            },{
                id: 3,
                nombre: "Modalidad 3",
                montos:"100,000-150,000",
                criterios:"Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables:"Una vez entregado el apoyo debera entregar el documento 1 , 2, 3,4,5 ",
                figuras:"figura 1, figura 2, figura 3"
            },{
                id: 4,
                nombre: "Modalidad 4",
                montos:"150,000-200,000",
                criterios:"Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables:"Una vez entregado el apoyo debera entregar el documento 1 , 2 y 3",
                figuras:"figura 1, figura 2, figura 3"
            },{
                id: 5,
                nombre: "Modalidad 5",
                montos:"350,000",
                criterios:"Debe ser del sector tecnologico y debe contar con sustento tecnico",
                entregables:"Una vez entregado el apoyo debera entregar el documento 1 , 2, 3,4,5 ",
                figuras:"figura 1, figura 2, figura 3"
            },
        ];
        vm.fondeos = [
            {
                id: 1,
                titulo: "Programa de fondeo 1",
                publicoObjetivo:"Nuevos Emprendedores",
                fondototal:"$2,000,000",
                criterios:"Debe ser nuevo emprendedor y contar con un proyecto factible, tecnica como economicamente"

            },
            {
            id: 2,
            titulo: "Programa de fondeo 2",
            publicoObjetivo:"Emprendedores Expertos",
            fondototal:"$3,000,000",
            criterios:"Debe ser nuevo emprendedor y contar con un proyecto factible, tecnica como economicamente"
            },
            {
                id: 3,
                titulo: "Programa de fondeo 3",
                publicoObjetivo:"Emprendedores mas  Expertos",
                fondototal:"$6,000,000",
                criterios:"Debe ser un gran emprendedor y contar con un proyecto factible, tecnica como economicamente"
            }
        ];
        vm.solicitudes=[
            {id:1,
             proyecto :"Proyecto 2",
             fondo:"Programa de fondeo 2",
             modalidad:"Modalidad 1",
             tecnopark:"Novaera",
             convocatoria:"Convocatoria 1",
             montosolicitado:"50,0000",
             montoApoyado:"60,0000",
             trlInicial:"TRL 1",
             trlFinal:"",
             fechaRegistro:"20-10-2014",
             fechaCierre:"",
             resultado:""
            },{id:2,
                proyecto:"Proyecto 2",
                fondo:"Programa de fondeo 1",
                modalidad:"Modalidad 1",
                tecnopark:"Novaera",
                convocatoria:"Convocatoria 2",
                montosolicitado:"150,0000",
                montoApoyado:"100,0000",
                trlInicial:"TRL 3",
                trlFinal:"",
                fechaRegistro:"11-10-2014",
                fechaCierre:"",
                resultado:""}];

        vm.tecnoparks=[
            {   id:1,
                Nombre:"Parque Tecnologico 1"
            },
            {   id:2,
                Nombre:"Parque Tecnologico 2"
            },
            {   id:3,
                Nombre:"Parque Tecnologico 3"
            },
            {   id:4,
                Nombre:"Parque Tecnologico 4"
            }
        ];
        vm.trlIniciales=[
            {   id:1,
                Nombre:"TRL 1"
            },
            {   id:2,
                Nombre:"TRL 2"
            },
            {   id:3,
                Nombre:"TRL 3"
            },
            {   id:4,
                Nombre:"TRL 4"
            },
            {   id:5,
                Nombre:"TRL 5"
            },
            {   id:6,
                Nombre:"TRL 6"
            },
            {   id:7,
                Nombre:"TRL 7"
            },
        ];



        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.querySearchFondeos = querySearchFondeos;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;
        vm.showSolicitudes    =false;
        vm.showFondeos        = true;
        vm.showConvocatoria   = false;
        vm.showModalities     = false;
        vm.showSolicitud      = true;
        vm.showFields         =false;
        vm.funcionfondeos     =funcionfondeos;
        vm.funcionConvocatoria =funcionConvocatoria;
        vm.funcionModalidad =funcionModalidad;
        vm.selectedFondeos     =[];
        vm.selectedConvocatorias   =[];
        vm.selectedModalidad  =[];

        vm.registrarSolicitud = registrarSolicitud;
        function registrarSolicitud ( ){
            vm.solicitud=
                //Obtenemos los datos de la solicitud
               // vm.solicitud.proyecto=vm.selectedItem.titulo;
              //  vm.solicitud.modalidad=vm.selectedModalidad.nombre;
               // vm.solicitud.convocatoria=vm.selectedConvocatorias.titulo;
             //   vm.solicitud.montosolicitado="";
               // vm.solicitud.montoApoyado="";
              //  vm.solicitud.trlInicial="";
               // vm.solicitud.trlFinal="",
                //vm.solicitud.fechaRegistro="30-12-2015";
                //vm.solicitud.fechaCierre="";
                //vm.solicitud.resultado="";

            //Habilitamos Visibilidad de las solicitudes
            vm.showSolicitudes=true;

        }

        function funcionfondeos(fondo,key){
            if(vm.selectedFondeos.length >1) {
                $scope.$broadcast('md.table.deselect', vm.selectedFondeos[0], vm.selectedFondeos[0].id);

            }
            vm.showConvocatoria   = true;

        }
        function funcionConvocatoria(convocatoria,key){
            if(vm.selectedConvocatorias.length > 1) {
                $scope.$broadcast('md.table.deselect', vm.selectedConvocatorias[0], vm.selectedConvocatorias[0].id);

            }

            vm.showModalities   = true;

        }
        function funcionModalidad(modalidad,key){
            if(vm.selectedModalidad.length >= 2) {
                $scope.$broadcast('md.table.deselect', vm.selectedModalidad[0], vm.selectedModalidad[0].id);

            }
            vm.showFields   = true;

        }
        //////////////////
        //Busqueda de proyectos
        function querySearch (query) {
            var results = query ? vm.proyectos.filter( createFilterFor(query) ) : vm.proyectos, deferred;
            return results;

        }
        //Busqueda Fondeos
        function querySearchFondeos (query) {
            var results2 = query ? vm.fondeos.filter( createFilterForFondeos(query) ) : vm.fondeos, deferred;
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
        $scope.deleteItem= function(index){
            vm.solicitudes.splice(index, 1);
            //console.log($scope.proyectos);
        }

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            var solicitud = {
                fondo:vm.selectedFondeos,
                proyecto:vm.selectedItem.titulo,
                modalidad:vm.selectedModalidad,
                montosolicitado: $scope.montosolicitado,
                trlInicial: $scope.trlInicial,
                tecnopark: $scope.tecnopark
            };



            vm.solicitudes.push(solicitud);
            vm.showSolicitudes=true;
            $scope.etapa=null;
            $scope.etapaPrecedente=null;
            $scope.tarea=null;
            $scope.entregable =null;
            $scope.registrarResultado.$setPristine();

        }





    }

    function matcher()
    {
        return function(arr1,arr2){
            if(arr2==null)
                return true;

            return arr1.filter(function(val){

                var returnable=null;
                angular.forEach(arr2,function(item){
                    if(item.id==val.id)
                        returnable = false;
                },val);

                if(returnable==null)
                    return true;
                else return false;
            })
        }
    }
})

();