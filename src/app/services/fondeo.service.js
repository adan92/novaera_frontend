/**
 * Created by Dark Xavier on 8/02/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Fondeo', Fondeo);

    /* @ngInject */
    function Fondeo($q, toastr, Restangular, Profile, $state) {
        var service = {
            getAllFondeos: getAllFondeos,
            callAssosciated:callAssosciated,
            crearFondeo:crearFondeo,
            updateFondeo:updateFondeo,
            deleteFondeo:deleteFondeo,
            getFondeoById:getFondeoById
        };
        //obtenemos perfil user
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

        function deleteFondeo(fondeo){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.one('ProgramaFondeo',fondeo.id).customDELETE().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }

        function callAssosciated(fondeo){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('ProgramaFondeo').all('Convocatoria').one('ProgramaFondeo',fondeo.id).customGET(fondeo).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }

        function updateFondeo(fondeo){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('ProgramaFondeo').one('Update',fondeo.id).customPOST(fondeo).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }

        function crearFondeo(fondeo){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('ProgramaFondeo').customPOST(fondeo).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }

        function getFondeoById(fondeo){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.one('ProgramaFondeo',fondeo.id).customGET(fondeo).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })

            }
            return deferred.promise;
        }

        function getAllFondeos() {
            var profile=getPerfil();
            var deferred = $q.defer();
            console.log(profile);
            if (profile.type === "person") {
                Restangular.all('ProgramaFondeo').customGET().then(function (res) {

                    deferred.resolve(res.Fondeos);
                }).catch(function (err) {
                    console.log(err);
                });
            }
            return deferred.promise;
        }

        return service;
    }

})();
