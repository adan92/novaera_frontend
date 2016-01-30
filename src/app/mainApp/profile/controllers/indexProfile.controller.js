/**
 * Created by Jorge Montiel on 10/15/15.
 */
(function () {
    'use strict';

    angular
        .module('app.mainApp.profile')
        .controller('indexProfileController', indexProfileController);
    /* @ngInject */
    function indexProfileController($filter, $scope, Restangular, triBreadcrumbsService, SweetAlert, Profile) {
        var vm = this;
        $scope.perfiles = [];
        activate();
        function activate() {
            triBreadcrumbsService.reset();
            triBreadcrumbsService.addCrumb("Profile");
            var promese = Restangular.all("Organizacion").customGET();
            promese.then(function (response) {
                $scope.perfiles = [{
                    id: 0,
                    type: "person",
                    "nombre": "Persona",
                    "imagen": "assets/images/avatars/persona.png"
                }];
                angular.forEach(response.Organizacion, function (value, key) {
                    $scope.perfiles.push(
                        {
                            id: value.id,
                            type: "org",
                            "nombre": value.Titulo,
                            "imagen": "assets/images/avatars/persona.png"
                        }
                    );
                });
                if (Profile.isValidated()) {
                    var perf = Profile.profileInfo();
                    $scope.data.avatar = perf.id;
                }

            }).catch(function (e) {
                SweetAlert.swal("Ops...", "Sucedió un error al consultar el servidor", "error");
                throw e;
            });
        }

        $scope.addItem = function () {
            var avatar = $scope.data.avatar;
            if ($scope.isUndefinedOrNull(avatar)) {
                SweetAlert.swal({
                        title: "¿Estas seguro?",
                        text: "Al no seleccionar un perfil, se colocará el perfil de persona de manera automática",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55", confirmButtonText: "Acepto",
                        cancelButtonText: "Cancelar",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            Profile.setProfile($scope.perfiles[0]);
                        }
                    }
                );

            } else {
                var perfil = JSON.parse(avatar);
                var single_object = $filter('filter')($scope.perfiles, function (d) {
                    return d.id === perfil;
                })[0];
                Profile.setProfile(single_object);
                SweetAlert.swal("Hecho!!", "¡Se ha guardado el tipo de perfil!!", "success");
            }

        };
        $scope.isUndefinedOrNull = function (val) {
            return angular.isUndefined(val) || val === null
        };

    }


})

();
