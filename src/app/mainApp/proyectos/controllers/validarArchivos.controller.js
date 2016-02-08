/**
 * Created by darkxavier on 14/01/16.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('validarArchivosController', validarArchivosController);
    /* @ngInject */
    function validarArchivosController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.querySearch = querySearch;

        vm.selectedItem = null;



        vm.idSolicitud=null;

        vm.sol=null;
        vm.i=0;
        vm.searchfile=searchfile;
        vm.showfiles=false;
        vm.showInfo=false;
        vm.showejecucion=false;
        vm.shownegocio=false;
        vm.showimpacto=false;
        vm.opcmostrar=0;
        vm.title=null;
        vm.showInfoproject=showInfoproject;
        vm.showInfoejecucion=showInfoejecucion;
        vm.showInfoimpacto=showInfoimpacto;
        vm.showInfonegocio=showInfonegocio;
        vm.activarfiles=activarfiles;
        vm.listaArchivos=true;
        vm.files = [];
        vm.fileselect=fileselect;
        vm.file=[
            {
                id:1,
                ruta:"archivo1.pdf",
                tipoArchivo:"Descripcion Proyecto",
                fecha:"2-07-2015"
            },
            {
                id:2,
                ruta:"archivo2.xls",
                tipoArchivo:"impacto economico",
                fecha:"2-09-2015"
            },
            {
                id:3,
                ruta:"archivo3.doc",
                tipoArchivo:"impacto social",
                fecha:"2-08-2015"
            }
        ];
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

        //////////////////

        //Busqueda de proyectos
        function querySearch (query) {
            var results = query ? vm.proyectos.filter( createFilterFor(query) ) : vm.proyectos, deferred;
            return results;

        }

        function searchfile(){

        }
        function activarfiles(){
            vm.showfiles=!vm.showfiles;
        }
        function fileselect(){

        }
        function showInfoproject(){


            vm.title="Informacion Basica";
            vm.showInfo=!vm.showInfo;
            vm.shownegocio=false;
            vm.showimpacto=false;
            vm.showejecucion=false;


        }
        function showInfonegocio(){

            vm.shownegocio=!vm.shownegocio;
            vm.showInfo=false;
            vm.showimpacto=false;
            vm.showejecucion=false;
            vm.title="Modelo de Negocio";

        }
        function showInfoimpacto(){

            vm.showimpacto =!vm.showimpacto;
            vm.showInfo=false;
            vm.shownegocio=false;
            vm.showejecucion=false;
            vm.title="Informacion de Impacto";

        }
        function showInfoejecucion(){

            vm.showejecucion=!vm.showejecucion;
            vm.showInfo=false;
            vm.shownegocio=false;
            vm.showimpacto=false;

            vm.title="Informacion de estado de Ejecucion"

        }

        function createFilterFor(query) {

            return function filterFn(proyecto) {
                return (proyecto.titulo.indexOf(query) === 0);
            };
        }
        $scope.modalFile = function(resource){
            var modalInstance = $modal.open({
                templateUrl: 'app/views/modals/openFile.modal.html',
                controller: 'ModalFileCtrl',
                size: 'lg',
                resolve: {
                    resource: function(){
                        return resource;
                    }
                }
            })
        }



    }
})

();