(function() {
    'use strict';

    angular
        .module('app.examples.menu')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/menu');

        $stateProvider
        .state('triangular.admin-default.menu-levels', {
            url: '/menu-levels/:level',
            controller: 'LevelController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/menu/level.tmpl.html'
        })
        .state('triangular.admin-default.menu-dynamic', {
            url: '/menu/dynamic',
            controller: 'MenuDynamicController',
            controllerAs: 'vm',
            templateUrl: 'app/examples/menu/dynamic.tmpl.html'
        })
        .state('triangular.admin-default.menu-dynamic-dummy-page', {
            url: '/menu/dynamic-page',
            templateUrl: 'app/examples/menu/dynamic-page.tmpl.html'
        });

    }
})();