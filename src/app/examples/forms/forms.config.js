(function() {
    'use strict';

    angular
        .module('app.examples.forms')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/forms');

        $stateProvider
        .state('triangular.admin-default.forms-inputs', {
            url: '/forms/inputs',
            templateUrl: 'app/examples/forms/inputs.tmpl.html'
        })
        .state('triangular.admin-default.forms-binding', {
            url: '/forms/binding',
            templateUrl: 'app/examples/forms/binding.tmpl.html'
        })
        .state('triangular.admin-default.forms-autocomplete', {
            url: '/forms/autocomplete',
            templateUrl: 'app/examples/forms/autocomplete.tmpl.html'
        })
        .state('triangular.admin-default.forms-wizard', {
            url: '/forms/wizard',
            templateUrl: 'app/examples/forms/wizard.tmpl.html',
            controller: 'FormWizardController',
            controllerAs: 'wizardController'
        })
        .state('triangular.admin-default.forms-validation', {
            url: '/forms/validation',
            templateUrl: 'app/examples/forms/validation.tmpl.html'
        });


    }
})();