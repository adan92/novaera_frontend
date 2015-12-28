/**
 * Created by Francisco Cerda on 10/17/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/fondeos');

        $stateProvider
            //estado del index
            .state('triangular.admin-default.fondeos', {
                // set the url of this page
                url: '/fondeos',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/fondeos/index.tmpl.html',
                // set the controller to load for this page
                controller: 'indexFondeosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: true
                    }
                }
            })
            .state('triangular.admin-default.fondeos_registro',{
                url: '/fondeos_registro',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/fondeos/registro.tmpl.html',
                // set the controller to load for this page
                controller: 'registrarFondeosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: true
                    }

                },
                requireLogin: true,
                requirePrivileges:'Supervisor',
                redirect:'auth.login'
            })
            .state('triangular.admin-default.fondeos_modalidad',{
                url: '/fondeos_modalidad',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/fondeos/modalidad.tmpl.html',
                // set the controller to load for this page
                controller: 'modalidadFondeosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: true
                    }
                },
                requireLogin: true,
                requirePrivileges:'Supervisor',
                redirect:'auth.login'
            })
            .state('triangular.admin-default.fondeos_convocatoria',{
                url: '/fondeos_convocatoria',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/fondeos/convocatoria.tmpl.html',
                // set the controller to load for this page
                controller: 'convocatoriaFondeosController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: true
                    }
                },
                requireLogin: true,
                requirePrivileges:'Supervisor',
                redirect:'auth.login'
            })
            .state('triangular.admin-default.fondeos_descriptor',{
                url: '/fondeos_descriptor',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/fondeos/descriptor_fondeo.tmpl.html',
                // set the controller to load for this page
                controller: 'descriptorFondeoController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: true
                    }
                },
                requireLogin: true,
                requirePrivileges:'Supervisor',
                redirect:'auth.login'
            });
        // add menu to triangular
        triMenuProvider.addMenu({
            name: 'MENU.FONDEOS.FONDEOS',
            type: 'dropdown',
            icon: 'zmdi zmdi-money-box',
            priority: 2.1,
            children:[
                {
                    name: 'Información',
                    state: 'triangular.admin-default.fondeos',
                    type: 'link'

                }

            ]
        });




    }
})();