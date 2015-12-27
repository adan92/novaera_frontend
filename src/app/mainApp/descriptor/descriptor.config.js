/**
 * Created by Jorge Montiel on 10/17/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.descriptor')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/descriptor');

        $stateProvider
            //estado del index
            .state('triangular.admin-default.descriptor', {
                // set the url of this page
                url: '/descriptor',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/descriptor/index.tmpl.html',
                // set the controller to load for this page
                controller: 'indexDescriptorController',
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
            .state('triangular.admin-default.tipo_descriptor',{
                url: '/tipo_descriptor',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/descriptor/tipo_descriptor.tmpl.html',
                // set the controller to load for this page
                controller: 'tipoDescriptorController',
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
    }
})();