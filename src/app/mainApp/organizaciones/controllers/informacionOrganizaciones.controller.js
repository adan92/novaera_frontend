/**
 * Created by lockonDaniel on 10/17/15.
 */
(function() {
  'use strict';

  angular
    .module('app.mainApp.organizaciones')
    .controller('informacionOrganizacionesController', informacionOrganizacionesController);

  /* @ngInject */
  function informacionOrganizacionesController(Upload, toastr, Translate, Restangular, $mdDialog,ROUTES) {
    var vm = this;

    activate();

    // Métodos para la Organización
    vm.editOrg = editOrg;
    vm.resetForm = resetForm;
    vm.submitForm = submitForm;
    vm.removeOrg = removeOrg;
    vm.createDialog = createDialog;

    // Métodos para las personas de la Organización
    vm.file = null;
    vm.fileRoute = ROUTES.FILE_ROUTE;
    vm.viewPerson = viewPerson;
    vm.addPerson = addPerson;

    //Métodos para subir archivos
    vm.uploadFile = uploadFile;
    vm.processRequest = processRequest;


    // Abrir el menú contextual de las personas
    vm.openMenu = openMenu;
    ////////////

    function resetForm() {
      vm.org = {};
      vm.me = {};

      vm.isEditing = false;
      vm.isCreating = false;

    }

    function activate() {
      vm.successStore = Translate.translate('DIALOGS.SUCCESS_STORE');
      vm.successUpdate = Translate.translate('DIALOGS.SUCCESS_UPDATE');
      vm.successTitle = Translate.translate('DIALOGS.SUCCESS');
      vm.failTitle = Translate.translate('DIALOGS.FAILURE');
      vm.failMessage = Translate.translate('DIALOGS.FAIL_STORE');
      vm.sureText             = Translate.translate('DIALOGS.YOU_SURE');
      vm.acceptText           = Translate.translate('DIALOGS.ACCEPT');
      vm.cancelText           = Translate.translate('DIALOGS.CANCEL');
      vm.dialogText           = Translate.translate('DIALOGS.WARNING');
      vm.successText          = Translate.translate('DIALOGS.SUCCESS');
      vm.successStoreText     = Translate.translate('DIALOGS.SUCCESS_STORE');
      vm.successUpdateText    = Translate.translate('DIALOGS.SUCCESS_UPDATE');
      vm.successDeleteText    = Translate.translate('DIALOGS.SUCCESS_DELETE');
      vm.failureText          = Translate.translate('DIALOGS.FAILURE');
      vm.failureStoreText     = Translate.translate('DIALOGS.FAIL_STORE');
      vm.failureDeleteText    = Translate.translate('DIALOGS.FAIL_DELETE');


      vm.isEditing = false;
      vm.isCreating = false;

      vm.isCreatingPerson = false;
      vm.isViewingPerson = false;

      vm.validations = [{
        field: 'isValidated',
        label: {
          success: 'Organización Validada',
          error: 'Organización no validada'
        }
      }, {
        field: 'RFCValidated',
        label: {
          success: 'RFC Validado',
          error: 'RFC No Validado'
        }
      }, {
        field: 'RENIECyTValidated',
        label: {
          success: 'Validado por RENIECyT',
          error: 'Validado por RENIECyT'
        }
      }, {
        field: 'ActaValidated',
        label: {
          success: 'Acta Validada',
          error: 'Acta No Validada'
        }
      }];

      vm.waiting = true;

      Restangular.all('Organizacion')
        .customGET()
        .then(function(res) {
          vm.waiting = false;

          vm.orgList = res.plain().Organizacion;

          // castear como Date los
          for (var i in vm.orgList) {
            vm.orgList[i].created_at = new Date(vm.orgList[i].created_at);
            vm.orgList[i].updated_at = new Date(vm.orgList[i].updated_at);
          }

        });

    }

    function editOrg(org, index) {
      vm.waiting = true;
      vm.indexEdited = index;

      Restangular.all('Organizacion')
        .one('Persona', org.id)
        .customGET()
        .then(function(res) {
          vm.waiting = false;
          vm.org = angular.copy(org);
          vm.isEditing = true;

          vm.personas = res.plain().Persona;

          vm.me = vm.org.pivot;
          vm.me.FechaInicio = new Date(vm.me.FechaInicio);
        }, function(err) {
          $log.err('Error!', err.status);
        })
    }

    function removeOrg(idOrg, index) {
      vm.waiting = true;
      Restangular.one('Organizacion', idOrg)
        .remove()
        .then(function(res) {
          vm.waiting = false;

          vm.orgList.splice(index, 1); //quitamos al elemento de la lista

        }, function(err) {
          vm.waiting = false;
          showAlert('error', err.status);
        })
    }

    // acciones del botón guardar
    function submitForm() {
      var org = angular.copy(vm.org);
      vm.org.id ? update(org) : create(org);
    }

    function create(org) {
      var me = angular.copy(vm.me);

      var postObject = {
        Organizacion: org,
        Datos: {
          Puesto: me.Puesto,
          FechaInicio: me.FechaInicio
        }
      };

      vm.waiting = true;
      vm.submitInProgress = true;

      Restangular.all('Organizacion')
        .customPOST(postObject)
        .then(function(res) {
          resetForm();

          vm.orgList.push(res.plain());

          vm.submitInProgress = false;
          vm.waiting = false;

          showAlert('success');

        }, function(err) {
          vm.submitInProgress = false;
          vm.waiting = false;
          showAlert('error', err.status);
        });
    }

    function update(org) {
      delete org.pivot
      delete org.created_at
      delete org.updated_at

      vm.waiting = true;
      vm.submitInProgress = true;

      Restangular.one('Organizacion', vm.org.id)
        .customPUT(org)
        .then(function(res) {
          vm.org = res.plain();
          vm.orgList[vm.indexEdited] = res.plain();

          showAlert('success');
          vm.submitInProgress = false;
          vm.waiting = false;
        }, function(err) {
          vm.submitInProgress = false;
          vm.waiting = false;
          showAlert('error', err.status);
        });
    }



    function openMenu($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    }

    function showAlert(result, errCode) {
      var messages = {
        success: {
          title: 'Información guardada correctamente',
          content: 'Los datos han sido guardados correctamente'
        },
        error: {
          title: 'Error al guardar la información',
          content: 'Hubo un error al guardar la información (' + errCode + ')'
        }
      }

      var msg = messages[result];

      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(msg.title)
        .content(msg.content)
        .ok('Continuar')
      );
    }


    function viewPerson(person) {
      vm.isViewingPerson = true;
      vm.isAddingPerson = false;

      vm.viewingPerson = person;
    }

    function addPerson(personId) {
      vm.isAddingPerson = true;
      vm.isViewingPerson = false;
    }

    function removePerson(personId) {

    }

    function uploadFile(fileType)
    {
      if(vm.file!=null)
      {
        var route = null;

        if(vm.org.id!=null)
        {
          var fileData = processRequest(fileType);
          route = 'Organizacion/Upload';
          Upload.upload({
            url: ROUTES.API_ROUTE+route,
            data:fileData,
            disableProgress: false
          }).then(function(res){
            console.log(res);
            vm.org = res.data;
            toastr.success(vm.successTitle,vm.successStore);


          }).catch( function (resp) {
            console.log(resp);
            toastr.error(vm.failTitle,vm.failMessage);
          });
        }
        /*, function (evt) {
       var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
       console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
       };*/


      }
    }

    function processRequest(filetype){
      var data = {};
      data[filetype] = vm.file;
      data.idOrganizacion = vm.org.id;
      console.log(data);
      return data;
    }

      function createDialog(org,ev,index)
      {
          vm.ev = ev;
          var confirm = $mdDialog.confirm()
              .title(vm.sureText)
              .content(vm.dialogText)
              .ariaLabel(vm.sureText)
              .targetEvent(ev)
              .ok(vm.acceptText)
              .cancel(vm.cancelText);
          $mdDialog.show(confirm).then(function() {
              vm.removeOrg(org, index)
          }, function() {
              console.log("Cancelado");
          });
      }


  }
})();
