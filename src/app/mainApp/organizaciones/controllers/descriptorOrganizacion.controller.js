/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.organizaciones')
        .controller('descriptorOrganizacionController', descriptorOrganizacionController)
        .filter('matcher',matcher);

    /* @ngInject */
    function descriptorOrganizacionController($scope, $timeout, $mdToast, $rootScope, $state) {
        var vm = this;

        $scope.descriptores = [
            {
                id: 1,
                titulo: "Descriptor 1",
                descripcion:"Este es el Descriptor 1",
                catalogo:"Catalogo 1",
                tipo:{
                    id: 1,
                    nombre: "Tipo 1",
                    aplicable:"S",
                    activo:true,
                    creado:"1970-01-01 00:00:01",
                    actualizado:"1970-01-01 00:00:01"
                },
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            },
            {
                id: 2,
                titulo: "Descriptor 2",
                descripcion:"Este es el Descriptor 2",
                catalogo:"Catalogo 5",
                tipo:{
                    id: 3,
                    nombre: "Tipo 3",
                    aplicable:"S",
                    activo:true,
                    creado:"1970-01-01 00:00:01",
                    actualizado:"1970-01-01 00:00:01"
                },
                creado:"1970-01-01 00:00:01",
                actualizado:"1970-01-01 00:00:01"
            }
        ]

        $scope.descriptor = [
            {
                id:1,
                fecha_inicio : "01/05/2015",
                fecha_fin : "01/10/2015",
                id_descriptor : 5,
                tipo_resultado : "Satisfactorio",
                numero_resgistro : "511351681"
            }
        ]

        $scope.organizaciones = [
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


                    ],
                descriptores:
                    [
                        {
                            id:1,
                            fecha_inicio : "01/05/2015",
                            fecha_fin : "01/10/2015",
                            id_descriptor : 5,
                            tipo_resultado : "Satisfactorio",
                            numero_registro : "511351681"
                        },
                        {
                            id:2,
                            fecha_inicio : "01/05/2015",
                            fecha_fin : "01/10/2015",
                            id_descriptor : 5,
                            tipo_resultado : "Satisfactorio",
                            numero_registro : "511351681"
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
                    ],
                descriptores:
                    [

                    ]


            }
        ];

        //

        vm.descriptores       = $scope.descriptores;
        vm.organizaciones     = $scope.organizaciones;
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

        /**
         * Create function to delete item
         */
        $scope.deleteItem= function(index){
            vm.selectedItem.descriptores.splice(index, 1);
            //console.log($scope.proyectos);
        }

        /**
         * Create function to add item
         */

        $scope.addItem = function()
        {
            var descriptor = {
                id: $scope.id,
                fecha_inicio : $scope.fInicio,
                fecha_fin : $scope.fFin,
                id_descriptor : $scope.idDescriptor,
                tipo_resultado : $scope.resultado,
                numero_registro : $scope.registro
            };



            vm.selectedItem.descriptores.push(descriptor);

            $scope.descriptor=null;
            $scope.fecha_inicio=null;
            $scope.fecha_fin=null;
            $scope.id_descriptor =null;
            $scope.tipo_resultado =null;
            $scope.numero_resgistro =null;
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
