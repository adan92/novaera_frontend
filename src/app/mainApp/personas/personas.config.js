/**
 * Created by Francisco Cerda on 10/17/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.personas')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/personas');

        $stateProvider
            //estado del index
            .state('triangular.admin-default.personas', {
                // set the url of this page
                url: '/personas',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/personas/index.tmpl.html',
                // set the controller to load for this page
                controller: 'indexPersonasController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: true
                    },
                    requireLogin: true
                }
            })
            .state('triangular.admin-default.personas_registro',{
                url: '/personas_registro',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/personas/registro.tmpl.html',
                // set the controller to load for this page
                controller: 'registrarPersonasController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: true
                    },
                    requireLogin: true

                }
            })
            .state('triangular.admin-default.personas_descriptor',{
                url: '/personas_descriptor',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/personas/descriptor_persona.tmpl.html',
                // set the controller to load for this page
                controller: 'descriptorPersonasController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: true
                    },
                    requireLogin: true

                }
            });


        // add menu to triangular
        triMenuProvider.addMenu({
            name: 'MENU.PERSONAS.PERSONAS',
            type: 'dropdown',
            icon: 'zmdi zmdi-info-outline',
            priority: 2.1,
            children:[
                {
                    name: 'Información',
                    state: 'triangular.admin-default.personas',
                    type: 'link'

                },
                {
                    name: 'Registro',
                    state: 'triangular.admin-default.personas_registro',
                    type: 'link'

                },
                {
                    name: 'Descriptor',
                    state: 'triangular.admin-default.personas_descriptor',
                    type: 'link'

                }

            ]
        });




    }
})();