/**
 * Created by Dark Xavier on 8/02/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Modalidad', Modalidad);

    /* @ngInject */
    function Modalidad($q, Restangular) {
        var service = {
            getAllModalidades: getAllModalidades,
            showModalitiesRelationFondeos: showModalitiesRelationFondeos,
            showConvocatoriasAsociadas: showConvocatoriasAsociadas,
            crearModalidad: crearModalidad,
            updateModalidad: updateModalidad,
            deleteModalidad: deleteModalidad
        };

        function getAllModalidades() {

            var deferred = $q.defer();

            Restangular.all('Modalidad').customGET().then(function (res) {

                deferred.resolve(res.Modalidad);
            }).catch(function (err) {
                console.log(err);
            });

            return deferred.promise;
        }

        function crearModalidad(modalidad) {

            var deferred = $q.defer();

            Restangular.all('Modalidad').customPOST(modalidad).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })


            return deferred.promise;
        }

        function updateModalidad(modalidad) {

            var deferred = $q.defer();

            Restangular.one('Modalidad', modalidad.id).customPUT(modalidad).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })


            return deferred.promise;
        }

        function showModalitiesRelationFondeos(progamafondeo) {

            var deferred = $q.defer();

            Restangular.all('ProgramaFondeo').one('Modalidad', progamafondeo.id).customGET().then(function (res) {
                deferred.resolve(res.Modalidad);
            }).catch(function (err) {
                console.log(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function showConvocatoriasAsociadas(modalidad) {

            var deferred = $q.defer();
            Restangular.all('Modalidad').one('Convocatoria', convocatoria.id).GET(convocatoria).then(function (res) {
                deferred.resolve(res.Convocatoria);
            }).catch(function (err) {
                deferred.reject(false);
            });

            return deferred.promise;
        }


        function deleteModalidad(modalidad) {

            var deferred = $q.defer();

            Restangular.one('Modalidad', modalidad.id).customDELETE().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }


        return service;
    }

})();