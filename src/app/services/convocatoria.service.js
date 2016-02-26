/**
 * Created by Dark Xavier on 8/02/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Convocatoria', Convocatoria);

    /* @ngInject */
    function Convocatoria($q, Restangular) {
        var service = {
            getAllConvocatorias: getAllConvocatorias,
            crearConvocatoria:crearConvocatoria,
            showModalitiesRelation:showModalitiesRelation,
            updateConvocatoria:updateConvocatoria,
            addConvocatoriaModalidad:addConvocatoriaModalidad,
            deleteConvocatoria:deleteConvocatoria,
            deleteConvocatoriaModalidad:deleteConvocatoriaModalidad,
            deleteConvocatoriaModalidadAll:deleteConvocatoriaModalidadAll
        };

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

            var deferred = $q.defer();

            Restangular.all('Convocatoria').customPOST(convocatoria).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })


            return deferred.promise;
        }

        function updateConvocatoria(convocatoria){

            var deferred = $q.defer();

            Restangular.one('Convocatoria',convocatoria.id).customPUT(convocatoria).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })


            return deferred.promise;
        }

        function deleteConvocatoria(convocatoria) {

            var deferred = $q.defer();

            Restangular.one('Convocatoria', convocatoria.id).customDELETE().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }
        function showModalitiesRelation(convocatoria){
            var deferred = $q.defer();

            Restangular.one('Convocatoria', convocatoria.id).customGET().then(function (res) {
                deferred.resolve(res.Modalidad);
            }).catch(function (err) {
                deferred.reject(false);
            });

            return deferred.promise;
        }

        function addConvocatoriaModalidad(convocatoria){

            var deferred = $q.defer();

            Restangular.all('Convocatoria').all('Modalidad').customPOST(convocatoria).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
                console.log(err);
            })


            return deferred.promise;
        }
        function deleteConvocatoriaModalidad(convocatoria){

            var deferred = $q.defer();

            Restangular.one('Convocatoria',convocatoria.idConvocatoria).one('Modalidad', convocatoria.modalidad).customDELETE().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            })


            return deferred.promise;
        }
        function deleteConvocatoriaModalidadAll(convocatoria){
            var profile=getPerfil();
            var deferred = $q.defer();

            Restangular.one('Convocatoria',convocatoria.id).all('Modalidad').customDELETE(convocatoria).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }





        return service;
    }

})();