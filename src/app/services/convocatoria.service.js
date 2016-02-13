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
            crearConvocatoria:crearConvocatoria,
            showModalitiesRelation:showModalitiesRelation,
            updateConvocatoria:updateConvocatoria,
            addConvocatoriaModalidad:addConvocatoriaModalidad,
            deleteConvocatoriaModalidad:deleteConvocatoriaModalidad,
            deleteConvocatoriaModalidadAll:deleteConvocatoriaModalidadAll
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
        function getAllConvocatorias() {

            var deferred = $q.defer();

                Restangular.all('Convocatoria').customGET().then(function (res) {

                    deferred.resolve(res.Convocatoria);
                }).catch(function (err) {
                    console.log(err);
                });

            return deferred.promise;
        }

        function crearConvocatoria(convocatoria){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "supervisor") {
                Restangular.all('Convocatoria').customPOST(convocatoria).then(function (res) {
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
                Restangular.one('Convocatoria',convocatoria.id).customPUT(convocatoria).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }
        function showModalitiesRelation(convocatoria){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.one('Convocatoria', convocatoria.id).GET(convocatoria).then(function (res) {
                    deferred.resolve(res.Modalidad);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }

        function addConvocatoriaModalidad(convocatoria){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "supervisor") {
                Restangular.all('Convocatoria').all('Modalidad').customPOST(convocatoria).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }
        function deleteConvocatoriaModalidad(convocatoria){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "supervisor") {
                Restangular.one('Convocatoria',convocatoria.id).one('Modalidad', convocatoria.modalidad.id).customDELETE(convocatoria).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }
        function deleteConvocatoriaModalidadAll(convocatoria){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "supervisor") {
                Restangular.one('Convocatoria',convocatoria.id).all('Modalidad').customDELETE(convocatoria).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }





        return service;
    }

})();