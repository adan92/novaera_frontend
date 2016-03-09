
(function () {
  'use strict';

  angular
    .module('app.mainApp.proyectos')
    .controller('inscribirProyectoController', inscribirProyectoController)
    .filter('matcher', matcher);

  /* @ngInject */
  function inscribirProyectoController($window, Catalogo,$mdSidenav, $mdDialog, $mdMedia, toastr, TRL, Convocatoria, Operation,
                                       registroProyecto, $scope, Fondeo, Proyecto) {

    var vm = this;
    vm.steps = [
      'PROJECT.REGISTER.PROJECT_SELECT',
      'PROJECT.REGISTER.INFO'];
    vm.selectedProjects=selectedProjects;
    vm.selectedProject = null;
    activate();

    function activate(){
      var promise = Proyecto.getAllProjects();
      promise.then(function (res) {
        vm.proyectos = (res);
        console.log(res);
      }).catch(function (err) {
        toastr.error(vm.failureText, vm.failureLoad);
      });
    }
    function selectedProjects(project){
      console.log(project);
      vm.selectedProject=project;
      toggleUsersList();
    }

    function toggleUsersList() {
      $mdSidenav('left').toggle();

    }
    /*Operation.setTypeOperation("RegistroProyecto");
    vm.isDisabled = false;

    vm.searchText = null;
    vm.querySearch = querySearch;
    vm.selectedItemChange = selectedItemChange;
    vm.testModal=testModal;
    vm.listStyle = {
      height: ($window.innerHeight - 400) + 'px'
    };
    vm.clickItem = clickItem;


    $window.addEventListener('resize', onResize);
    function onResize() {
      vm.listStyle.height = ($window.innerHeight -400) + 'px';
      if (!$scope.$root.$$phase)
        $scope.$digest();
    }
    function querySearch(query) {
      var results = query ? vm.proyectos.filter(createFilterFor(query)) : vm.proyectos, deferred;
      return results;

    }
    function selectedItemChange(item) {
      var example = Fondeo.getAllFondeos();
      example.then(function (res) {
        vm.fondeos = res;
        vm.showFondeos = true;
      });
      var solicitudes = Operation.getOperation(item.id);
      solicitudes.then(function (res) {
        vm.solicitudes = res.RegistroProyecto;

      });
      vm.showSolicitudes = true;
    }
    function createFilterFor(query) {

      return function filterFn(proyecto) {
        return (proyecto.titulo.indexOf(query) === 0);
      };
    }

    function clickItem(item, event) {
      vm.itemPF=item;
    }
    function testModal(){
        }*/
  }
  function matcher() {
    return function (arr1, arr2) {
      if (arr2 == null)
        return true;

      return arr1.filter(function (val) {

        var returnable = null;
        angular.forEach(arr2, function (item) {
          if (item.id == val.id)
            returnable = false;
        }, val);

        if (returnable == null)
          return true;
        else return false;
      })
    }
  }
})();

