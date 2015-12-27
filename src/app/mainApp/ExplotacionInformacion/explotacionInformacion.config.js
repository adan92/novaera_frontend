/**
 * Created by Francisco Cerda on 10/17/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.explotacionInformacion')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/explotacionInformacion');

        $stateProvider
            //estado del index
            .state('triangular.admin-default.explotacionInformacion', {
                // set the url of this page
                url: '/explotacionInformacion',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/explotacionInformacion/index.tmpl.html',
                // set the controller to load for this page
                controller: 'explotacionInformacionController',
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
            .state('triangular.admin-default.explotacionInformacionEsp',{
                url: '/explotacionInformacionEsp',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/explotacionInformacion/explotacionInformacionEsp.tmpl.html',
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
            });

        // add menu to triangular
        triMenuProvider.addMenu({
            name: 'MENU.EXPINFO.EXPINFO1',
            type: 'dropdown',
            icon: 'zmdi zmdi-chart',
            priority: 2.1,
            children:[
                {
                    name: 'MENU.EXPINFO.EXPINFO1',
                    state: 'triangular.admin-default.explotacionInformacion',
                    type: 'link'

                },
                {
                    name: 'MENU.EXPINFO.EXPINFO2',
                    state: 'triangular.admin-default.explotacionInformacionEsp',
                    type: 'link'

                }

            ]
        });




    }
})();