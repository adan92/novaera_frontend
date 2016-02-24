/**
 * Created by Dark Xavier on 8/02/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Fondeo', Fondeo);

    /* @ngInject */
    function Fondeo($q, Restangular) {
        var service = {
            getAllFondeos: getAllFondeos,
            callAssosciated: callAssosciated,
            crearFondeo: crearFondeo,
            updateFondeo: updateFondeo,
            deleteFondeo: deleteFondeo,
            getFondeoById: getFondeoById
        };
        //obtenemos perfil user


        function deleteFondeo(fondeo) {
            var deferred = $q.defer();

                Restangular.one('ProgramaFondeo', fondeo.id).customDELETE().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });


            return deferred.promise;
        }

        function callAssosciated(fondeo) {
            var deferred = $q.defer();

            Restangular.all('ProgramaFondeo').one('Convocatoria', fondeo.id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function updateFondeo(fondeo) {

            var deferred = $q.defer();

            Restangular.all('ProgramaFondeo').one('Update', fondeo.id).customPOST(fondeo).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function crearFondeo(fondeo) {

            var deferred = $q.defer();

            Restangular.all('ProgramaFondeo').customPOST(fondeo).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(false);
            });

            return deferred.promise;
        }

        function getFondeoById(fondeo) {
            var deferred = $q.defer();
            Restangular.one('ProgramaFondeo', fondeo.id).customGET(fondeo).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }


        function getAllFondeos() {
            var deferred = $q.defer();
            Restangular.all('ProgramaFondeo').customGET().then(function (res) {
                deferred.resolve(res.ProgramaFondeo);
            }).catch(function (err) {
                console.log(err);
            });
            return deferred.promise;
        }
        return service;
    }

})();