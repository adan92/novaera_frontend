(function() {
  'use strict';

  angular
    .module('app.mainApp.explotacionInformacion')
    .controller('ExplotacionInformacionQueryDescriptorsController', ExplotacionInformacionQueryDescriptorsController);

  ExplotacionInformacionQueryDescriptorsController.$inject = [];

  /* @ngInject */
  function ExplotacionInformacionQueryDescriptorsController() {
    var vm = this;
    vm.useAdvancedSearch = true;

    activate();

    ////////////////

    function activate() {
      vm.advancedSearch = false;

      vm.categories = ['H - Persona', 'O - Organización', 'P - Proyecto', 'R - Resultado','F - Programa de Fondeo'];

      vm.search = {
        status: 'any',
        categories: angular.copy(vm.categories)
      };

      vm.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
      };
      vm.exists = function(item, list) {
        return list.indexOf(item) > -1;
      };
    }
  }
})();
