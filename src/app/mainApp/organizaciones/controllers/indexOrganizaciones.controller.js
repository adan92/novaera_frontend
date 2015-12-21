/**
 * Created by lockonDaniel on 10/17/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.organizaciones')
        .controller('indexOrganizacionesController', indexOrganizacionesController);

    /* @ngInject */
    function indexOrganizacionesController($scope, $timeout, $mdToast, $rootScope, $state,$log) {
        var vm = this;




        vm.organizaciones = [
            {
                id:1,
                nombre: "La organización",
                descripcion: "Organización de prueba",
                palabras_clave: "Organizacion,Prueba",
                experiencia: "3 años de Desarrollo de Proyectos Tecnológicos",
                giro: "Tecnologías de la Información",
                mision: "Ser la empresa lider de TI en México",
                razon_social: "Empresa S.A de CV",
                RFC: "XXXXXXXXXXXX",
                RENIECYT: "XXXXXXXXXX",
                acta_constitutiva: "/organizaciones/1/acta.pdf",
                representante_legal: "Edgar Jonatan Larios Tapia",
                direccion: "Calle X Numero Y Colonia Z, Guanajuato",
                municipio: "Celaya",
                modalidades:
                    [
                        {
                            id_fondo:1,
                            id_modalidad:1,
                            solicitud:"XXXXXX",
                            monto_solicitado: 200000,
                            monto_apoyado: 150000,
                            trl_inicial:  1,
                            trl_final: 2,
                            fecha_registro: '17-10-2015',
                            fecha_cierre: '19-10-2015',
                            modalidad:
                            {
                                nombre: 'Modalidad X',
                                requisitos: 'Ninguno',
                                criterios_evalaucion: 'Criterios',
                                entregables: 'Entrgable X',
                                figura_apoyo: 'Figura X'
                            }

                        }
                    ],
                resultado_organizacion:
                    [
                        {
                            id_resultado:1,
                            id_schema:1,
                            id_class:1,
                            resultado:
                            {
                                nombre: 'Resultado 1',
                                descripcion: 'El Resultado',
                                palabras_clave: 'Resultado, Proyecto, Desarrollo',
                                area_aplicacion: 'Venta de Proyectos',
                                tipo: 'Proceso',
                                fecha: '12-10-2010',
                                avance: 'Completado',
                                status: 'Operativo',
                                plan_explotacion: 'El plan es que se registren las personas dentro del sistema',
                                fecha_inicio:"19-10-2015",
                                fecha_final:"20-10-2015"
                            }

                        }
                    ],
                contacto:
                    [
                        {
                            id:1,
                            informacion:
                            {
                                id:1,
                                id_persona:1,
                                telefono: '551234567',
                                email:'jhlara@empresa.com.mx',
                                direccion:'Calle X Numero Y',
                                nombre:'Edgar Larios Tapia'
                            }
                        }
                    ],
                estadisticas:
                    {
                        resultados:{data:[3,1,5],labels:['Procesos','Productos','Servicios']},
                        fondeos:{
                            series: ['Monto Apoyado','Monto Solicitado'],
                            data:[
                                [130000,200000,350000,100000,125000,130000],
                                [165000,200000,400000,230000,200000,130000]
                            ],
                            labels:['Abril','Mayo','Junio','Julio','Agosto','Septiembre']}
                    },
                personas:
                    [
                        {
                            id_organizacion:1,
                            id_persona:1,
                            id_schema:1,
                            id_class:1,
                            fecha_inicio:'10-01-02',
                            fecha_fin:'',
                            schema:
                            {
                                id:1,
                                id_class:1,
                                descripcion:'Empleado'
                            },
                            persona:
                            {
                                id:1,
                                id_contacto:1,
                                grado_estudios:'Maestría',
                                especialidad: 'Dirección de Empresas',
                                areas_interes:'Ventas y dirección de campañas publicitarias',
                                areas_experiencia: 'Publicidad Agresiva',
                                rfc:'XXXX000000123',
                                genero:'Mujer',
                            },
                            contacto:{
                                id:1,
                                nombre:'Josefina Hernández Lara',
                                telefono: '551234567',
                                email:'jhlara@empresa.com.mx',
                                direccion:'Calle X Numero Y'
                            }
                        },
                        {
                            id_organizacion:1,
                            id_persona:2,
                            id_schema:1,
                            id_class:1,
                            fecha_inicio:'10-01-02',
                            fecha_fin:'',
                            schema:
                            {
                                id:1,
                                id_class:1,
                                descripcion:'Empleado'
                            },
                            persona:
                            {
                                id:1,
                                id_contacto:1,
                                grado_estudios:'Licenciatura',
                                especialidad: 'Mercadotecnia',
                                areas_interes:'Ventas y dirección de campañas publicitarias',
                                areas_experiencia: 'Publicidad Agresiva',
                                rfc:'XXXX000000123',
                                genero:'Mujer',
                            },
                            contacto:{
                                id:1,
                                nombre:'Persona De Prueba',
                                telefono: '551234567',
                                email:'jhlara@empresa.com.mx',
                                direccion:'Calle X Numero Y'
                            }
                        },
                        {
                            id_organizacion:1,
                            id_persona:3,
                            id_schema:1,
                            id_class:1,
                            fecha_inicio:'10-01-02',
                            fecha_fin:'',
                            schema:
                            {
                                id:1,
                                id_class:1,
                                descripcion:'Empleado'
                            },
                            persona:
                            {
                                id:1,
                                id_contacto:1,
                                grado_estudios:'Doctorado',
                                especialidad: 'Ciencias Computacionales',
                                areas_interes:'Ventas y dirección de campañas publicitarias',
                                areas_experiencia: 'Publicidad Agresiva',
                                rfc:'XXXX000000123',
                                genero:'Mujer',
                            },
                            contacto:{
                                id:1,
                                nombre:'Chadwick Carreto Arellano',
                                telefono: '551234567',
                                email:'jhlara@empresa.com.mx',
                                direccion:'Calle X Numero Y'
                            }
                        }
                        ,{
                        id_organizacion:1,
                        id_persona:4,
                        id_schema:1,
                        id_class:1,
                        fecha_inicio:'10-01-02',
                        fecha_fin:'',
                        schema:
                        {
                            id:1,
                            id_class:1,
                            descripcion:'Empleado'
                        },
                        persona:
                        {
                            id:1,
                            id_contacto:1,
                            grado_estudios:'Maestría',
                            especialidad: 'Administración de TI',
                            areas_interes:'Ventas y dirección de campañas publicitarias',
                            areas_experiencia: 'Publicidad Agresiva',
                            rfc:'XXXX000000123',
                            genero:'Mujer',
                        },
                        contacto:{
                            id:1,
                            nombre:'Edgar Larios Tapia',
                            telefono: '551234567',
                            email:'jhlara@empresa.com.mx',
                            direccion:'Calle X Numero Y'
                        }
                    }


                    ]


            }
            ,{
                id:1,
                nombre: "Otra Organización",
                descripcion: "Organización de prueba",
                palabras_clave: "Organizacion,Prueba",
                experiencia: "3 años de Desarrollo de Proyectos Tecnológicos",
                giro: "Tecnologías de la Información",
                mision: "Ser la empresa lider de TI en México",
                razon_social: "Empresa S.A de CV",
                RFC: "XXXXXXXXXXXX",
                RENIECYT: "XXXXXXXXXX",
                acta_constitutiva: "/organizaciones/1/acta.pdf",
                representante_legal: "Edgar Jonatan Larios Tapia",
                direccion: "Calle X Numero Y Colonia Z, Guanajuato",
                municipio: "Celaya",
                modalidad:
                    [
                        {
                            id_fondo:1,
                            id_modalidad:1,
                            solicitud:"XXXXXX",
                            monto_solicitado: 200000,
                            monto_apoyado: 150000,
                            trl_inicial:  1,
                            trl_final: 2,
                            fecha_registro: '17-10-2015',
                            fecha_cierre: '19-10-2015',
                            nombre: 'Modalidad X',
                            requisitos: 'Ninguno',
                            criterios_evalaucion: 'Criterios',
                            entregables: 'Entrgable X',
                            figura_apoyo: 'Figura X'
                        }
                    ],
                resultado:
                    [
                        {
                            id_resultado:1,
                            id_schema:1,
                            id_class:1,
                            nombre: 'Resultado 1',
                            descripcion: 'El Resultado',
                            palabras_clave: 'Resultado, Proyecto, Desarrollo',
                            area_aplicacion: 'Venta de Proyectos',
                            tipo: 'Proceso',
                            fecha: '12-10-2010',
                            avance: 'Completado',
                            status: 'Operativo',
                            plan_explotacion: 'El plan es que se registren las personas dentro del sistema',
                            fecha_inicio:"19-10-2015",
                            fecha_final:"20-10-2015"
                        }
                    ],
                contacto:
                    [
                        {
                            id:1,
                            informacion:
                            {
                                id:1,
                                id_persona:1,
                                telefono: '551234567',
                                email:'jhlara@empresa.com.mx',
                                direccion:'Calle X Numero Y',
                                nombre:'Edgar Larios Tapia'
                            }
                        }
                    ]


            }
        ];


        //Variables para las columnas

        vm.query = {
            filter: '',
            limit: '10',
            order: 'id_persona',
            page: 1
        };
        vm.selected = [];
        vm.filter = {
            options: {
                debounce: 500
            }
        };
        vm.getUsers = getUsers;
        vm.removeFilter = removeFilter;
        vm.getUsers = getUsers;
        vm.removeFilter = removeFilter;


        function getUsers(order) {
            vm.query.order=order;
        }

        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }




        //Variables para el md-autocomplete

        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.querySearch        = querySearch;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;


        //////////////////
        function querySearch (query) {
            var results = query ? vm.organizaciones.filter( createFilterFor(query) ) : vm.organizaciones, deferred;
            return results;

        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            return function filterFn(organizacion) {
                return (organizacion.nombre.indexOf(query) === 0);
            };
        }




    }
})();
