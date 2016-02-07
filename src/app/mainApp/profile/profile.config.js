/**
 * Created by lockonDaniel on 10/14/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.profile')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/profile');

        $stateProvider
            .state('triangular.admin-default.profiles', {
                // set the url of this page
                url: '/profile',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/profile/index.tmpl.html',
                // set the controller to load for this page
                controller: 'indexProfileController',
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





    }
})();