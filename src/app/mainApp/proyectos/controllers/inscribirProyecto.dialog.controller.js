

/**
 * Created by lockonDaniel on 2/26/16.
 */
/**
 * Created by lockonDaniel on 2/22/16.
 */
(function() {
  'use strict';

  angular
    .module('app.mainApp.proyectos')
    .controller('incribirProyectoDialogController', incribirProyectoDialogController);

  /* @ngInject */
  function incribirProyectoDialogController(Catalogo,TRL,Fondeo,$mdSidenav,$mdDialog,selectedProyecto) {
    var vm = this;
    activate();
    vm.closeDialog=closeDialog;
    vm.proyecto         = selectedProyecto;
    vm.fondeos=null;
    vm.selectedFondeo=null;
    vm.selectedFondeos=selectedFondeos;
    vm.tecnoparks=null;
    vm.trlIniciales=null;
    vm.trlFinales=null;
    vm.steps = [
      'PROJECT.INSCRIPTION.WIZARD.FONDEOS',
      'PROJECT.INSCRIPTION.WIZARD.CONVOCATORIA',
      'PROJECT.INSCRIPTION.WIZARD.MODALIDAD',
      'PROJECT.INSCRIPTION.FIELDS'];

    function activate(){
      var promise = Fondeo.getAllFondeos();
      promise.then(function (res) {
        vm.fondeos = res;
      });
      promise = Catalogo.getAllCatalogo('ParqueTecnologico');
      promise.then(function (value) {
        vm.tecnoparks = value.ParqueTecnologico;
      });
      promise = TRL.getAllTLR();
      promise.then(function (value) {
        vm.trlIniciales = value;
        vm.trlFinales = value;
      });
    }
    function selectedFondeos(fondeo) {
      vm.selectedFondeo = fondeo;
      console.log(fondeo);
      toggleUsersList();
    }

    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }
    function closeDialog(response)
    {
      $mdDialog.hide();
    }
  }
})();
