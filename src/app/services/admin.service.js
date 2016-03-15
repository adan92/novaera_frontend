(function () {
    'use strict';

    angular
        .module('app')
        .factory('Admin', Admin);

    /* @ngInject */
    function Admin($q,  Restangular) {
        var service = {
            getStatusProjects: getStatusProjects,
            wizardOperation: wizardOperation,
            wizardFiles:wizardFiles,
            getResults:getResults,
            validateSolicitud: validateSolicitud,
            countOrgDescriptorType:countOrgDescriptorType,
            getOrgByDescriptor:getOrgByDescriptor,
            getPersonsInOrg:getPersonsInOrg,
            getPersonsInOrgByDescriptor:getPersonsInOrgByDescriptor,
            countPersonsInOrgTipoDescriptor:countPersonsInOrgTipoDescriptor,
            sumsAllPrograms:sumsAllPrograms,
            sumsByType:sumsByType,
            countRegistersByType:countRegistersByType
        };



        function getPersonsInOrg(idOrganizacion){
            var deferred = $q.defer();
            Restangular.all('Supervisor').all('Organizacion').one('Persona',idOrganizacion).customGET().then(function(res){
                deferred.resolve(res.Persona);
            }).catch(function(err){
                console.log(err);
                deferred.reject(false);
            });


            return deferred.promise;
        }

        function getPersonsInOrgByDescriptor(idOrganizacion,idDescriptor){
            var deferred = $q.defer();
            Restangular.all('Supervisor').one('Organizacion',idOrganizacion).all('Persona').one('Descriptor',idDescriptor).customGET().then(function(res){
                deferred.resolve(res.Persona);
            }).catch(function(err){
                console.log(err);
                deferred.reject(false);
            });
            return deferred.promise;
        }

        function countPersonsInOrgTipoDescriptor(idOrganizacion,idTipoDescriptor)
        {
            var deferred = $q.defer();
            Restangular.all('Supervisor').one('Organizacion',idOrganizacion).all('Persona').all('TipoDescriptor').one('Count',idTipoDescriptor).customGET().then(function(res){
                deferred.resolve(res);
            }).catch(function(err){
                console.log(err);
                deferred.reject(false);
            });
            return deferred.promise;
        }


        function getStatusProjects() {
            var deferred = $q.defer();
                 Restangular.all('Supervisor').all('RegistroProyecto').customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                     console.log(err);
                     deferred.reject(false);
                });

            return deferred.promise;
        }
        function wizardOperation(operation,id) {
            var deferred = $q.defer();
                 Restangular.all('Supervisor').one(operation,id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                     console.log(err);
                     deferred.reject(false);
                });

            return deferred.promise;
        }

        function wizardFiles(operation,id){
            var deferred = $q.defer();
            Restangular.all('Supervisor').all(operation).one('Archivos',id).customGET().then(function (res) {
                deferred.resolve(res.Archivos);
            }).catch(function (err) {
                console.log(err);
                deferred.reject(false);
            });

            return deferred.promise;
        }

        function getResults(type,id)
        {
            var deferred = $q.defer();
            Restangular.all('Supervisor').all('Resultados').one(type,id).customGET().then(function (res) {
                deferred.resolve(res.Resultado);
            }).catch(function (err) {
                console.log(err);
                deferred.reject(false);
            });
            return deferred.promise;
        }

        function validateSolicitud(solicitud,id)
        {
            var deferred = $q.defer();
            Restangular.all('RegistroProyecto').one('Validate',id).customPUT(solicitud).then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                console.log(err);
                deferred.reject(false);
            });
            return deferred.promise;
        }

        /**
         * @param id
         * @returns {*}
         */

        function countOrgDescriptorType(id)
        {
            var deferred = $q.defer();
            Restangular.all('Supervisor').all('Organizacion').all('TipoDescriptor').one('Count',id).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                console.log(err);
                deferred.reject(false);
            });
            return deferred.promise;
        }

        /**
         *
         * @param id
         * @returns {*}
         */

        function getOrgByDescriptor(id)
        {
            var deferred = $q.defer();
            Restangular.all('Supervisor').all('Organizacion').one('ByDescriptor',id).customGET().then(function (res) {
                deferred.resolve(res.Organizacion);
            }).catch(function (err) {
                console.log(err);
                deferred.reject(false);
            });
            return deferred.promise;
        }

        function sumsAllPrograms(type,status)
        {
            var deferred = $q.defer();
            Restangular.all('Supervisor').all('ProgramaFondeo').all('All').one('Montos').all(type).all(status).customGET().then(function(res){
               deferred.resolve(res);
            }).catch(function(err){
                console.log(err);
                deferred.reject(false);
            });
            return deferred.promise;
        }

        function sumsByType(granularity,id,sumType,status)
        {
            var deferred = $q.defer();
            Restangular.all('Supervisor').all(granularity).all(id).one('Montos').one(sumType).one(status).customGET().then(function(res){
               deferred.resolve(res);
            }).catch(function(err){
                console.log(err);
                deferred.reject(false);
            });
            return deferred.promise;
        }


        function countRegistersByType(granularity,id)
        {
            var deferred = $q.defer();
            Restangular.all('Supervisor').all(granularity).all('Registros').one('Count',id).customGET().then(function(res){
               deferred.resolve(res);
            }).catch(function(err){
                console.log(err);
                deferred.reject(false);
            });
            return deferred.promise;
        }




        return service;
    }

})();
