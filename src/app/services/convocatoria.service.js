/**
 * Created by Dark Xavier on 8/02/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Convocatoria', Convocatoria);

    /* @ngInject */
    function Convocatoria($q, toastr, Restangular, Profile, $state) {
        var service = {
            getAllConvocatorias: getAllConvocatoriass,
            crearConvovatoria:crearConvocatoria,
            updateConvocatoria:updateConvocatoria,
            deleteConvocatoria:deleteConvocatoria
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

        function deleteConvocatoria(convocatoria){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Convocatoria').one('Convocatoria',convocatoria.id).customDELETE(convocatoria).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }

        function updateConvocatoria(convocatoria){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Convocatoria').one('Convocatoria',convocatoria.id).customPUT(convocatoria).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }
        function crearConvocatoria(convocatoria){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Convocatoria').customPOST(convocatoria).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }



        function getAllConvocatorias() {
            var profile=getPerfil();
            var deferred = $q.defer();
            console.log(profile);
            if (profile.type === "person") {
                Restangular.all('Convocatoria').customGET().then(function (res) {

                    deferred.resolve(res.Convocatorias);
                }).catch(function (err) {
                    console.log(err);
                });
            }
            return deferred.promise;
        }

        return service;
    }

})();