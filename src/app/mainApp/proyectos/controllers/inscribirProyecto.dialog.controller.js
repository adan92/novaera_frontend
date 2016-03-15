/**
 * Created by lockonDaniel on 2/26/16.
 */
/**
 * Created by lockonDaniel on 2/22/16.
 */
(function () {
  'use strict';

  angular
    .module('app.mainApp.proyectos')
    .controller('incribirProyectoDialogController', incribirProyectoDialogController);

  /* @ngInject */
  function incribirProyectoDialogController(Operation,registroProyecto, Translate, Convocatoria, Catalogo, TRL, Fondeo, $mdDialog, selectedProyecto, locals, toastr) {
    var vm = this;
    vm.tipo=locals.operacion;
    Operation.setTypeOperation("RegistroProyecto");
    vm.closeDialog = closeDialog;
    vm.solicitudes=null;
    vm.proyecto = selectedProyecto;
    vm.fondeos = null;
    vm.convocatorias = null;
    vm.modalidades = null;
    vm.showSolicitudes=false;
    vm.showInscribir=false;
    vm.selectedFondeo = null;
    vm.selectedConvocatoria = null;
    vm.selectedModalidad = null;
    vm.currentTab = 1;
    vm.completed = 0;
    vm.send = send;
    vm.checkPass = checkPass;
    vm.selectedFondeos = selectedFondeos;
    vm.onTabChanges = onTabChanges;
    vm.selectedConvocatorias = selectedConvocatoria;
    vm.formatDate=formatDate;
    vm.selectedModalidades = selectedModalidad;
    vm.tecnoparks = null;
    vm.trlIniciales = null;
    vm.trlFinales = null;
    vm.steps = [
      'PROJECT.INSCRIPTION.WIZARD.FONDEOS',
      'PROJECT.INSCRIPTION.WIZARD.CONVOCATORIA',
      'PROJECT.INSCRIPTION.WIZARD.MODALIDAD',
      'PROJECT.INSCRIPTION.FIELDS'];
    vm.register = {
      tecnopark: null,
      montosolicitado: null,
      trlInicial: null,
      trlFinal: null
    };
    activate();

    function activate() {
      if (locals.operacion == 1) {
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
        vm.showInscribir=true;
      } else {
        var solicitudes = Operation.getOperation(vm.proyecto.id);
        solicitudes.then(function (res) {
          vm.solicitudes = res.RegistroProyecto;
          vm.showSolicitudes=true;
        }).catch(function (err) {
        });
      }
      vm.sureText = Translate.translate('DIALOGS.YOU_SURE');
      vm.acceptText = Translate.translate('DIALOGS.ACCEPT');
      vm.cancelText = Translate.translate('DIALOGS.CANCEL');
      vm.dialogText = Translate.translate('DIALOGS.WARNING');
      vm.successText = Translate.translate('DIALOGS.SUCCESS');
      vm.successStoreText = Translate.translate('DIALOGS.SUCCESS_STORE');
      vm.successUpdateText = Translate.translate('DIALOGS.SUCCESS_UPDATE');
      vm.successDeleteText = Translate.translate('DIALOGS.SUCCESS_DELETE');
      vm.failureText = Translate.translate('DIALOGS.FAILURE');
      vm.failureStoreText = Translate.translate('DIALOGS.FAIL_STORE');
      vm.failureDeleteText = Translate.translate('DIALOGS.FAIL_DELETE');
      vm.failureLoad = Translate.translate('DIALOGS.FAIL_LOAD');
      vm.cancelDelete = Translate.translate('DIALOGS.CANCEL_DELETE');
      vm.cancelTitle = Translate.translate('DIALOGS.CANCEL_TITLE');
      vm.dialogTextOne = Translate.translate('DIALOGS.WARNING_ONE');
    }

    function onTabChanges(currentTab) {
      vm.currentTab = currentTab;
      var promise;
      switch (currentTab) {
        case 2:
          promise = Fondeo.callAssosciated(vm.selectedFondeo);
          promise.then(function (value) {
            vm.convocatorias = value.Convocatoria;
          }).catch(function (err) {
          });
          break;
        case 3:
          promise = Convocatoria.showModalitiesRelation(vm.selectedConvocatoria);
          promise.then(function (value) {
            vm.modalidades = value;
          });
          break;
      }
    }
     function formatDate(date){
      var dateOut = new Date(date);
      return dateOut;
    }
    function selectedFondeos(fondeo, $event) {
      vm.selectedFondeo = fondeo;
      vm.completed = checkFinished();
    }

    function selectedConvocatoria(conv, $event) {
      vm.selectedConvocatoria = conv;
      vm.completed = checkFinished();
    }

    function selectedModalidad(moda, $event) {
      vm.selectedModalidad = moda;
      vm.completed = checkFinished();
    }

    function closeDialog() {
      $mdDialog.hide();
    }

    function send() {
      var solicitud = {
        idProyecto: vm.proyecto.id,
        idTRLInicial: vm.trlInicial,
        idTRLFinal: vm.trlFinal,
        idParque: vm.tecnopark,
        idConvocatoriaModalidad: vm.selectedModalidad.pivot.id,
        MontoSolicitado: vm.montosolicitado
      };
      var promise = registroProyecto.registerProject(solicitud);
      promise.then(function (val) {
        toastr.success(vm.successText, vm.successStoreText);
        closeDialog();
      }).catch(function (err) {
        toastr.error(vm.failureText, vm.failureStoreText);
      });
    }

    function checkPass() {
      vm.completed = checkFinished();
    }

    function checkFinished() {
      var completed = 0;
      if (vm.selectedFondeo != null)
        completed += 1;
      if (vm.selectedConvocatoria != null)
        completed += 1;
      if (vm.selectedModalidad != null)
        completed += 1;
      if (vm.tecnopark != null)
        completed += 1;
      if (vm.montosolicitado != null)
        completed += 1;
      if (vm.trlInicial != null)
        completed += 1;
      if (vm.trlFinal != null)
        completed += 1;
      completed = (completed / 7) * 100;
      completed = completed.toFixed(0);
      return completed;
    }

  }
})();
