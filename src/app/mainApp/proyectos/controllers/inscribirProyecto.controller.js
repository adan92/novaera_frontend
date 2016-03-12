(function () {
  'use strict';

  angular
    .module('app.mainApp.proyectos')
    .controller('inscribirProyectoController', inscribirProyectoController)
    .filter('custom', custom);

  /* @ngInject */
  function inscribirProyectoController($timeout, Catalogo, $mdSidenav, $mdDialog, $mdMedia, toastr, TRL, Convocatoria, Operation,
                                       registroProyecto, $scope, Fondeo, Proyecto) {
    Operation.setTypeOperation("RegistroProyecto");
    var vm = this;
    vm.selectedProjects = selectedProjects;
    vm.selectedItem = null;
    vm.searchText = null;
    vm.showRegister = showRegister;
    vm.selectedProject = null;
    vm.selectedSolicitudes = [];
    vm.tooltipVisible = false;
    vm.hideProject = false;
    vm.solicitudes = null;
    vm.proyectos = null;
    vm.showSolicitudes = false;
    vm.isOpen = false;
    vm.hidden = true;
    vm.hover = false;
    activate();

    function activate() {
      var promise = Proyecto.getAllProjects();
      promise.then(function (res) {
        vm.proyectos = (res);
        console.log(res);
      }).catch(function (err) {
        toastr.error(vm.failureText, vm.failureLoad);
      });
    }

    function showRegister($event) {
      var config = {
        controller: 'incribirProyectoDialogController',
        templateUrl: 'app/mainApp/proyectos/incribirProyecto.dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: true,
        locals:{selectedProyecto:vm.selectedProject},
        controllerAs: 'vm'
      };
      $mdDialog.show(config);
    }

    function selectedProjects(project) {
      console.log(project);
      vm.selectedProject = project;
      vm.hidden=false;
      /* var solicitudes = Operation.getOperation(project.id);
       solicitudes.then(function (res) {
       vm.solicitudes = res.RegistroProyecto;
       console.log(vm.solicitudes);
       }).catch(function (err) {
       console.log(err);
       });*/
      toggleUsersList();
    }

    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    $scope.$watch('vm.isOpen', function (isOpen) {
      if (isOpen) {
        $timeout(function () {
          vm.tooltipVisible = self.isOpen;
        }, 600);
      } else {
        vm.tooltipVisible = self.isOpen;
      }
    });
    /*Operation.setTypeOperation("RegistroProyecto");
     vm.isDisabled = false;

     vm.searchText = null;
     vm.querySearch = querySearch;
     vm.selectedItemChange = selectedItemChange;
     vm.testModal=testModal;
     vm.clickItem = clickItem;
     vm.listStyle = {
     height: ($window.innerHeight - 400) + 'px'
     };


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

  function custom() {
    return function (input, text) {
      if (!angular.isString(text) || text === '') {
        return input;
      }

      return input.filter(function (item) {
        return (item.Titulo.indexOf(text) > -1);
      });
    };

  }
})();

