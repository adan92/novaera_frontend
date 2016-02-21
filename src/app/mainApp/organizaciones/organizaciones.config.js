/**
 * Created by lockonDaniel on 10/14/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.organizaciones')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/organizaciones');

        $stateProvider
            .state('triangular.admin-default.organizaciones', {
                // set the url of this page
                url: '/organizaciones',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/organizaciones/index.tmpl.html',
                // set the controller to load for this page
                controller: 'indexOrganizacionesController',
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
            .state('triangular.admin-default.organizaciones_informacion',{
                url:'/organizaciones_informacion',
                templateUrl:'app/mainApp/organizaciones/informacion.tmpl.html',
                controller: 'informacionOrganizacionesController',
                controllerAs: 'vm',
                data:{
                    layout:{
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: true
                    }
                }
            })
            .state('triangular.admin-default.descriptor_organizacion',{
            url:'/descriptor_organizacion',
            templateUrl:'app/mainApp/organizaciones/descriptor_organizacion.tmpl.html',
            controller: 'descriptorOrganizacionController',
            controllerAs: 'vm',
            data:{
                layout:{
                    toolbarSize: 'default',
                    toolbarShrink: true,
                    toolbarClass: 'none',
                    contentClass: '',
                    sideMenuSize: 'full',
                    footer: true
                }
            }
        }).state('triangular.admin-default.validar_organizacion',{
            url:'/validar_organizacion',
            templateUrl:'app/mainApp/organizaciones/validar_organizacion.tmpl.html',
            controller: 'validacionOrganizacionController',
            controllerAs: 'vm',
            data:{
                layout:{
                    toolbarSize: 'default',
                    toolbarShrink: true,
                    toolbarClass: 'none',
                    contentClass: '',
                    sideMenuSize: 'full',
                    footer: true
                },
                requireLogin: true,
                requirePrivileges:'Supervisor',
                redirect:'auth.login'
            }
        })

        ;
        // add menu to triangular
        triMenuProvider.addMenu({
            name: 'Organizaciones',
            type: 'dropdown',
            icon: 'fa fa-institution',
            priority: 2.1,
            children:[
                {
                    name: 'Información General',
                    state: 'triangular.admin-default.organizaciones',
                    type: 'link'

                },
                {
                    name: 'Información Legal',
                    state: 'triangular.admin-default.organizaciones_informacion',
                    type:'link'
                },
                {
                    name: 'Descriptor',
                    state: 'triangular.admin-default.descriptor_organizacion',
                    type:'link'
                }
            ]
        });




    }
})();