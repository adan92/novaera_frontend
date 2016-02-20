(function () {
    'use strict';

    angular
        .module('app')
        .factory('registroProyecto', registroProyecto);

    /* @ngInject */
    function registroProyecto($q, toastr, Restangular, Profile, $state) {
        var service = {
            getStatusProjectsByProfile: getStatusProjectsByProfile,
            registerProject:registerProject
        };

        function getPerfil() {
            var profile;
            if (Profile.isValidated()) {
                profile = Profile.profileInfo();
                return profile;
            } else {
                $state.go('triangular.admin-default.profiles');
                toastr.error('Se debe seleccionar el perfil para acceder a este módulo', 'Error');
            }
        }
        function registerProject(request){
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('RegistroProyecto').customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            } else {
                Restangular.all('RegistroProyecto').one('Organizacion', profile.id).customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }
        function getStatusProjectsByProfile() {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('RegistroProyecto').customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            } else {
                Restangular.all('RegistroProyecto').one('Organizacion', profile.id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }
        return service;
    }

})();
