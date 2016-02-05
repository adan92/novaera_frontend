(function () {
    'use strict';

    angular
        .module('app')
        .factory('Impacto', Impacto);

    /* @ngInject */
    function Impacto($q, toastr, Restangular, Profile, $state) {
        var service = {
            getImpacto: getImpacto,
            getFileImpacto: getFileImpacto,
            getUrl: getUrl,
            updateImpacto:updateImpacto,
            saveImpacto:saveImpacto
        };
        var profile;
        if (Profile.isValidated()) {
            profile = Profile.profileInfo()
        } else {
            $state.go('triangular.admin-default.profiles');
            toastr.error('Se debe seleccionar el perfil para acceder a este módulo', 'Error');
        }
        function updateImpacto(request) {
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Impacto').all('Update').customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Impacto').all('Update').one('Organizacion',profile.id).customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
        function saveImpacto(request) {
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Impacto').customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Impacto').one('Organizacion',profile.id).customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
        function getImpacto(projectId) {
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.one('Impacto', projectId).customGET().then(function (res) {

                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                Restangular.one('Impacto', projectId).one('Organizacion', profile.id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        function getFileImpacto(projectId) {
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Impacto').one('Archivos', projectId).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Impacto').one('Archivos', projectId).one('Organizacion', profile.id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        function getUrl(typeOperation) {
            if (profile.type === "person") {
                if (typeOperation === "up") {
                    return "Impacto/Update";
                } else {
                    return "Impacto";
                }
            }
            else {
                if (typeOperation === "up") {
                    return "Impacto/Update/Organizacion/" + profile.id;
                } else {
                    return "Impacto/Organizacion/" + profile.id;
                }
            }
        }

        return service;
    }

})();