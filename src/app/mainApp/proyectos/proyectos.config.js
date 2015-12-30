/**
 * Created by lockonDaniel on 10/14/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/proyectos');

        $stateProvider
            .state('triangular.admin-default.proyectos', {
                // set the url of this page
                url: '/proyectos',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/index.tmpl.html',
                // set the controller to load for this page
                controller: 'indexProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true,
                }

            })
            .state('triangular.admin-default.proyectos_registro',{
                url: '/proyectos_registro',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/registro.tmpl.html',
                // set the controller to load for this page
                controller: 'registrarProyectoController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true,
                    requireValidation:true,
                    redirect:'triangular.admin-default.proyectos'
                }

            })
            .state('triangular.admin-default.proyectos_etapas',{
                url: '/proyectos_etapas',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/etapas.tmpl.html',
                // set the controller to load for this page
                controller: 'etapasProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }

            })
            .state('triangular.admin-default.proyectos_ejecucion',{
                url: '/proyectos_ejecucion',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/ejecucion.tmpl.html',
                // set the controller to load for this page
                controller: 'ejecucionProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }

            })
            .state('triangular.admin-default.proyectos_modeloNegocio',{
                url: '/proyectos_modeloNegocio',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/modeloNegocio.tmpl.html',
                // set the controller to load for this page
                controller: 'modeloNegocioProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }

            })
            .state('triangular.admin-default.proyectos_trl',{
                url: '/proyectos_trl',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/trl.tmpl.html',
                // set the controller to load for this page
                controller: 'trlProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }

            })
            .state('triangular.admin-default.proyectos_propiedad_intelectual',{
                url: '/proyectos_propiedad_intelectual',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/propiedad_intelectual.tmpl.html',
                // set the controller to load for this page
                controller: 'propiedadIntelectualProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }

            })
            .state('triangular.admin-default.proyectos_resultados',{
                url: '/proyectos_resultados',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/resultados.tmpl.html',
                // set the controller to load for this page
                controller: 'resultadosProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }

            })
            .state('triangular.admin-default.proyectos_modalidades',{
                url: '/proyectos_modalidades',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/modalidades.tmpl.html',
                // set the controller to load for this page
                controller: 'modalidadesProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }

            })
            .state('triangular.admin-default.descriptor_proyecto',{
                url: '/descriptor_proyecto',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/descriptor_proyecto.tmpl.html',
                // set the controller to load for this page
                controller: 'descriptorProyectoController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }
            })
            .state('triangular.admin-default.proyectos_impacto',{
                url: '/proyectos_impacto',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/impacto.tmpl.html',
                // set the controller to load for this page
                controller: 'impactoProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }

            })
            .state('triangular.admin-default.descriptor_resultado',{
                url: '/descriptor_resultado',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/descriptor_resultado.tmpl.html',
                // set the controller to load for this page
                controller: 'descriptorResultadoController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }
            })
            .state('triangular.admin-default.inscribirProyectoConvocatoria',{
                url: '/inscribirProyectoConvocatoria',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/inscribirProyectoConvocatoria.tmpl.html',
                // set the controller to load for this page
                controller: 'inscribirProyectoConvocatoriaController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }
            })
            .state('triangular.admin-default.revisarProyectos',{
                url: '/revisarProyectos',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/proyectos/revisarProyectos.tmpl.html',
                // set the controller to load for this page
                controller: 'revisarProyectosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    },
                    requireLogin: true
                }
            })
        ;
        // add menu to triangular
        triMenuProvider.addMenu({
            name: 'MENU.PROJECTS.PROJECTS',
            type: 'dropdown',
            icon: 'fa fa-briefcase',
            priority: 2.1,
            children:[
                {
                    name: 'Información',
                    state: 'triangular.admin-default.proyectos',
                    type: 'link'

                },
                {
                    name: 'Registro',
                    state: 'triangular.admin-default.proyectos_registro',
                    type: 'link'

                },
                {
                    name: 'Impacto',
                    state: 'triangular.admin-default.proyectos_impacto',
                    type: 'link'

                },
                {
                    name: 'TRL',
                    state: 'triangular.admin-default.proyectos_trl',
                    type: 'link'

                },
                {
                    name: 'Ejecución',
                    state: 'triangular.admin-default.proyectos_ejecucion',
                    type: 'link'

                },{
                    name: 'Modelo de Negocios',
                    state: 'triangular.admin-default.proyectos_modeloNegocio',
                    type: 'link'

                },
                {
                    name: 'Etapas',
                    state: 'triangular.admin-default.proyectos_etapas',
                    type: 'link'

                },
                {
                    name: 'Propiedad Intelectual',
                    state: 'triangular.admin-default.proyectos_propiedad_intelectual',
                    type: 'link'

                },

                {
                    name: 'Descriptor Proyectos',
                    state: 'triangular.admin-default.descriptor_proyecto',
                    type: 'link'
                },
                {
                    name: 'Resultados',
                    state: 'triangular.admin-default.proyectos_resultados',
                    type: 'link'
                },
                {
                    name: 'Descriptor Resultados',
                    state: 'triangular.admin-default.descriptor_resultado',
                    type: 'link'
                },
                {
                    name: 'Inscribir Proyecto a Convocatoria',
                    state: 'triangular.admin-default.inscribirProyectoConvocatoria',
                    type: 'link'
                },
                {
                    name: 'Revisar Estado de Proyectos',
                    state: 'triangular.admin-default.revisarProyectos',
                    type: 'link'
                }
            ]
        });




    }
})();