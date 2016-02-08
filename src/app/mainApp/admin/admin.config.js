/**
 * Created by lockonDaniel on 10/14/15.
 */
(function() {
  'use strict';

  angular
    .module('app.mainApp.admin')
    .config(moduleConfig);

  /* @ngInject */
  function moduleConfig($translatePartialLoaderProvider, $stateProvider) {
    $translatePartialLoaderProvider.addPart('app/mainApp/admin');

    $stateProvider
      .state('triangular.admin-default.admin', {
        // set the url of this page
        url: '/admin',
        // set the html template to show on this page
        templateUrl: 'app/mainApp/admin/index.tmpl.html',
        // set the controller to load for this page
        controller: 'indexAdminController',
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
          requireLogin: true,
          requirePrivileges: 'Supervisor',
          redirect: 'auth.login'

        }

      });




  }
})();
