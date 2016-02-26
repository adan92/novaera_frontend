(function () {
    'use strict';

    angular
        .module('app.mainApp.profile')
        .controller('indexProfileController', indexProfileController);
    /* @ngInject */
    function indexProfileController(Catalogo,$filter,Translate,toastr, triBreadcrumbsService, SweetAlert, Profile,$state) {
        var vm = this;
        vm.perfiles = [];
        vm.failureText          = Translate.translate('DIALOGS.FAILURE');
        vm.failureDeleteText    = Translate.translate('DIALOGS.FAIL_DELETE');
        vm.saveText             = Translate.translate('PROJECT.SAVE');
        vm.successUpdateText    = Translate.translate('DIALOGS.SUCCESS_UPDATE');
        vm.addItem=addItem;
        activate();

        function activate() {
            triBreadcrumbsService.reset();
            triBreadcrumbsService.addCrumb("Profile");
            var promise;
            promise=Catalogo.getAllCatalogo('User');
            promise.then(function(response){
                vm.perfiles=[{
                    id: response.persona.id,
                    type:"person",
                    nombre: response.persona.Nombre+" "+response.persona.ApellidoP+" "+response.persona.ApellidoM,
                    isValidated: response.persona.isValidated,
                    "imagen": "assets/images/avatars/persona.png"
                }]
            }).catch(function (e) {
                toastr.error(vm.failureText,vm.failureDeleteText);
                $state.go('triangular.admin-default.personas_registro');
                throw e;
            });

            promise=Catalogo.getAllCatalogo('Organizacion');
            promise.then(function (response) {
                response.Organizacion.forEach(function (value) {
                    vm.perfiles.push(
                    {
                        id: value.id,
                        type: "org",
                        nombre: value.Titulo,
                        imagen: "assets/images/avatars/tower.png",
                        isValidated: value.isValidated
                    });
                });
                if (Profile.isValidated()) {
                    var perf = Profile.profileInfo();
                    vm.data = perf.id;
                }

            }).catch(function (e) {
                toastr.error(vm.failureText,vm.failureDeleteText);
                throw e;
            });
        }

         function addItem() {
            var avatar = vm.data;
            if (isUndefinedOrNull(avatar)) {
                SweetAlert.swal({
                        title: "¿Estas seguro?",
                        text: "Al no seleccionar un perfil, se colocará el perfil de persona de manera automática",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55", confirmButtonText: "Acepto",
                        cancelButtonText: "Cancelar",
                        closeOnConfirm: false,
                        closeOnCancel: true
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            Profile.setProfile(vm.perfiles[0]);
                            toastr.success(vm.saveText,vm.successUpdateText);
                        }
                    }
                );
            } else {
                var perfil = JSON.parse(avatar);
                var single_object = $filter('filter')(vm.perfiles, function (d) {
                    return d.id === perfil;
                })[0];
                Profile.setProfile(single_object);
                toastr.success(vm.saveText,vm.successUpdateText);
            }
        }
        function isUndefinedOrNull (val) {
            return angular.isUndefined(val) || val === null
        }

    }


})

();
