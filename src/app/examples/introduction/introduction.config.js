(function() {
    'use strict';

    angular
        .module('app.examples.introduction')
        .config(moduleConfig)

    ;

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {
        // setup translations path
        $translatePartialLoaderProvider.addPart('app/examples/introduction');

        // add routes
        $stateProvider
        .state('triangular.admin-default.introduction', {
            url: '/introduction',
            templateUrl: 'app/examples/introduction/introduction.tmpl.html',
            controller: 'IntroductionController',
            controllerAs: 'vm'
        });

        // add menu to triangular

    }


})

();