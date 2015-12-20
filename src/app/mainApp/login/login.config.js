/**
 * Created by lockonDaniel on 12/12/15.
 */
/**
 * Created by lockonDaniel on 10/14/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider,triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/mainApp/login');

        $stateProvider
            .state('auth', {
                abstract: true,
                templateUrl: 'app/mainApp/login/authentication.tmpl.html'
            })
            .state('auth.login', {
                // set the url of this page
                url: '/login',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/login/login.tmpl.html',
                // set the controller to load for this page
                controller: 'mainLoginController',
                controllerAs: 'vm',
                data: {
                    requireLogin: false
                }
            }).state('auth.register', {
                // set the url of this page
                url: '/register',
                // set the html template to show on this page
                templateUrl: 'app/mainApp/login/register.tmpl.html',
                // set the controller to load for this page
                controller: 'registerController',
                controllerAs: 'vm',
                data: {
                    requireLogin: false
                }
            })
        ;



    }
})();