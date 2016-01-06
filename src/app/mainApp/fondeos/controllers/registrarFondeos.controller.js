(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('registrarFondeosController', registrarFondeosController);

    /* @ngInject */
    function registrarFondeosController($scope, $timeout, $mdToast, $rootScope, $state) {

        var vm = this;
        vm.fondeo = null;

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

        //Datos
        $scope.fondeos=[
            {
                titulo:"Fondo 1",
                descripcion: "Esta es una prueba de un Programa de Fondeo",
                targetp: "Desarrolladores de Frontend",
                fondeoT: "<ul><li>f 1</li><li>f 2</li></ul>",
                support: "<ul><li>rubro 1</li><li>rubro 2</li></ul>",
                selected: "<ul><li>Criterio 1</li><li>Criterio 2</li></ul>",
                modalitys: [
                    {
                        id_modality: 1,
                        nombre_modality:'Modalidad 1',
                        requeriments_modality: "<ul><li>Requisito 1</li><li>Requisito 2</li><li>Requisito 4</li><li>Requisito 5</li><li>Requisito 6</li></ul>",
                        monto_modality: '$150,0000',
                        evaluation_modality: "<ul><li>criterio 1</li><li>criterio 2</li><li>criterio 4</li><li>criterio 5</li><li>criterio 6</li></ul>",
                        deliver_modality: "<ul><li>Entregable 1</li><li>Entregable 2</li><li>Entregable 3</li></ul>",
                        support_modality:'Persona F�sica'
                    },

                    {
                        id_call: 2,
                        nombre_modality:'Modalidad 2',
                        requeriments_modality: "<ul><li>Requisito 1</li><li>Requisito 2</li>/ul>",
                        monto_modality: '$250,0000',
                        evaluation_modality: "<ul><li>criterio 1</li><li>criterio 2</li></ul>",
                        deliver_modality: "<ul><li>Entregable 1</li><li>Entregable 2</li><li>Entregable 3</li>",
                        support_modality:'Emprendedor'
                    }

                ],
                call:[
                    {id_call:1, fechainicio_call:"10-10-2014", fechacierre_call:"10-10-2015",
                        requeriments_call: "<ul><li>Requisito Convocatoria 1</li><li>Requisito 2</li></ul>",
                        evaluation_call: "<ul><li>criterio de ev 1</li><li>criterio de ev 2</li><li>criterio de ev 3</li>",
                        monto_call:"$1,500,000"
                    },

                ],
                display:"Fondo 1"

            },
            {
                titulo:"Otro fondeo",
                descripcion: "El fondeo a realizar",
                targetp: "Desarrolladores de Frontend",
                fondeoT: "<ul><li>f 1</li><li>f 2</li></ul>",
                support: "<ul><li>rubro 1</li><li>rubro 2</li></ul>",
                selected: "<ul><li>Criterio 1</li><li>Criterio 2</li></ul>",
                modalitys: [
                    {
                        id_modality: 1,
                        nombre_modality:'Modalidad 1',
                        requeriments_modality: "<ul><li>Requisito 1</li><li>Requisito 2</li><li>Requisito 4</li><li>Requisito 5</li><li>Requisito 6</li></ul>",
                        monto_modality: '$150,0000',
                        evaluation_modality: "<ul><li>criterio 1</li><li>criterio 2</li><li>criterio 4</li><li>criterio 5</li><li>criterio 6</li></ul>",
                        deliver_modality: "<ul><li>Entregable 1</li><li>Entregable 2</li><li>Entregable 3</li></ul>",
                        support_modality:'Persona F�sica'
                    },

                    {
                        id_call: 2,
                        nombre_modality:'Modalidad 2',
                        requeriments_modality: "<ul><li>Requisito 1</li><li>Requisito 2</li>/ul>",
                        monto_modality: '$250,0000',
                        evaluation_modality: "<ul><li>criterio 1</li><li>criterio 2</li></ul>",
                        deliver_modality: "<ul><li>Entregable 1</li><li>Entregable 2</li><li>Entregable 3</li>",
                        support_modality:'Emprendedor'
                    }

                ],
                call:[
                    {id_call:1, fechainicio_call:"10-10-2014", fechacierre_call:"10-10-2015",
                        requeriments_call: "<ul><li>Requisito Convocatoria 1</li><li>Requisito 2</li></ul>",
                        evaluation_call: "<ul><li>criterio de ev 1</li><li>criterio de ev 2</li><li>criterio de ev 3</li>",
                        monto_call:"$1,500,000"
                    },

                ],
                display:"Otro fondeo"
            },
            {
                titulo:"Un fondeo mas",
                descripcion: "Es nuevo fondeo",
                targetp: "Desarrolladores de Frontend",
                fondeoT: "<ul><li>f 1</li><li>f 2</li></ul>",
                support: "<ul><li>rubro 1</li><li>rubro 2</li></ul>",
                selected: "<ul><li>Criterio 1</li><li>Criterio 2</li></ul>",
                modalitys: [
                    {
                        id_modality: 1,
                        nombre_modality:'Modalidad 1',
                        requeriments_modality: "<ul><li>Requisito 1</li><li>Requisito 2</li><li>Requisito 4</li><li>Requisito 5</li><li>Requisito 6</li></ul>",
                        monto_modality: '$150,0000',
                        evaluation_modality: "<ul><li>criterio 1</li><li>criterio 2</li><li>criterio 4</li><li>criterio 5</li><li>criterio 6</li></ul>",
                        deliver_modality: "<ul><li>Entregable 1</li><li>Entregable 2</li><li>Entregable 3</li></ul>",
                        support_modality:'Persona F�sica'
                    },

                    {
                        id_call: 2,
                        nombre_modality:'Modalidad 2',
                        requeriments_modality: "<ul><li>Requisito 1</li><li>Requisito 2</li>/ul>",
                        monto_modality: '$250,0000',
                        evaluation_modality: "<ul><li>criterio 1</li><li>criterio 2</li></ul>",
                        deliver_modality: "<ul><li>Entregable 1</li><li>Entregable 2</li><li>Entregable 3</li>",
                        support_modality:'Emprendedor'
                    }

                ],
                call:[
                    {id_call:1, fechainicio_call:"10-10-2014", fechacierre_call:"10-10-2015",
                        requeriments_call: "<ul><li>Requisito Convocatoria 1</li><li>Requisito 2</li></ul>",
                        evaluation_call: "<ul><li>criterio de ev 1</li><li>criterio de ev 2</li><li>criterio de ev 3</li>",
                        monto_call:"$1,500,000"
                    },

                ],
                display:"Un fondeo mas"
            }
        ];
        $scope.my_projects_labels= ['Electricidad','Agronom�a','Calzado'];
        $scope.my_projects_data= ['3','5','6'];


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

        /**
         * Create function to delete item
         */
        $scope.deleteItem= function(index){
            vm.selectedItem.modalitys.splice(index, 1);
            //console.log($scope.proyectos);
        }

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            var modality = {
                id_modality: $scope.modality.id_modality,
                nombre_modality: $scope.modality.nombre_modality,
                monto_modality: $scope.modality.monto_modality,
                support_modality: $scope.modality.support_modality
            };



            vm.selectedItem.etapas.push(modality);

            $scope.modality=null;
            $scope.monto_modality=null;
            $scope.tarea=null;
            $scope.support_modality =null;
            $scope.registrarModality.$setPristine();

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
