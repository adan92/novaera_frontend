/**
 * Created by lockonDaniel on 10/19/15.
 */
/**
 * Created by lockonDaniel on 10/14/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.intro')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/intro');

        $stateProvider
            .state('triangular.admin-default.intro', {
                // set the url of this page
                url: '/intro',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/intro/intro.tmpl.html',
                // set the controller to load for this page
                controller: 'introController',
                controllerAs: 'vm',
                data: {
                    layout: {
                        toolbarSize: 'default',
                        toolbarShrink: true,
                        toolbarClass: 'none',
                        contentClass: '',
                        sideMenuSize: 'full',
                        footer: false
                    }
                }
            })

        ;
        // add menu to triangular
        triMenuProvider.addMenu({
            name: 'Introducción',
            type: 'link',
            icon: 'zmdi zmdi-info-outline',
            state: 'triangular.admin-default.intro',
            priority: 1

        });




    }
})();