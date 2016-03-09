(function () {
    'use strict';

    angular
        .module('app')
        .factory('Persona', Persona);

    /* @ngInject */
    function Persona($q, toastr, Restangular, Profile, $state,Translate) {
        var service = {

            countByTipoDescriptor:countByTipoDescriptor,
            getDescriptoresPersona: getDescriptoresPersona,
            countByOrganization: countByOrganization,
            getByName:getByName

        };




        function getDescriptoresPersona(idDescriptor)
        {
            var deferred = $q.defer();

                Restangular.all('Persona').one('ByDescriptor', idDescriptor).customGET().then(function (res) {
                    deferred.resolve(res.Persona);
                }).catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }


        function countByTipoDescriptor(idTipoDescriptor)
        {
            var deferred = $q.defer();

                Restangular.all('Supervisor').all('Persona').all('TipoDescriptor').one('Count', idTipoDescriptor).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }
        function countByOrganization()
        {
            var deferred = $q.defer();

            Restangular.all('Supervisor').all('Persona').all('ByOrganizacion').all('Count').customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }
        function getByName(name)
        {
            var deferred = $q.defer();

            Restangular.all('Persona').one('Lookup', name).customGET().then(function (res) {
                deferred.resolve(res.Persona);
            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }






        return service;
    }



})();
