(function() {
    'use strict';

    angular
        .module('app.examples.maps')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, uiGmapGoogleMapApiProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/maps');

        $stateProvider
        .state('triangular.admin-default.maps-fullwidth', {
            url: '/maps/fullwidth',
            templateUrl: 'app/examples/maps/maps-fullwidth.tmpl.html',
            controller: 'MapController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.maps-demos', {
            url: '/maps/demos',
            templateUrl: 'app/examples/maps/maps-demo.tmpl.html'
        });

        uiGmapGoogleMapApiProvider.configure({
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });


    }
})();