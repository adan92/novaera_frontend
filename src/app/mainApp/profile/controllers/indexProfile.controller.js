(function () {
    'use strict';

    angular
        .module('app.mainApp.profile')
        .controller('indexProfileController', indexProfileController);
    /* @ngInject */
    function indexProfileController($filter,  Restangular, triBreadcrumbsService, SweetAlert, Profile,$state) {
        var vm = this;
        vm.perfiles = [];

        vm.addItem=addItem;
        activate();


        function activate() {

            triBreadcrumbsService.reset();
            triBreadcrumbsService.addCrumb("Profile");
            var promise = Restangular.all('User').customGET();

            promise.then(function(response){
                vm.perfiles=[{
                    id: response.persona.id,
                    type:"person",
                    nombre: response.persona.Nombre+" "+response.persona.ApellidoP+" "+response.persona.ApellidoM,
                    isValidated: response.persona.isValidated,
                    "imagen": "assets/images/avatars/persona.png"

                }]
            }).catch(function (e) {
                SweetAlert.swal("Ops...", "No pudimos encontrar una persona, por favor regístrate", "error");
                $state.go('triangular.admin-default.personas_registro');
                throw e;
            });

            var promise = Restangular.all("Organizacion").customGET();



            promise.then(function (response) {


                angular.forEach(response.Organizacion, function (value, key) {

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
                SweetAlert.swal("Ops...", "Sucedió un error al consultar el servidor", "error");
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
                            SweetAlert.swal("Hecho!!", "¡Se ha guardado el tipo de perfil!!", "success");

                        }
                    }
                );


            } else {
                var perfil = JSON.parse(avatar);
                var single_object = $filter('filter')(vm.perfiles, function (d) {
                    return d.id === perfil;
                })[0];
                console.log(single_object);
                Profile.setProfile(single_object);
                SweetAlert.swal("Hecho!!", "¡Se ha guardado el tipo de perfil!!", "success");
            }

        }
        function isUndefinedOrNull (val) {
            return angular.isUndefined(val) || val === null
        }

    }


})

();
