(function () {
    'use strict';

    angular
        .module('app')
        .factory('Admin', Admin);

    /* @ngInject */
    function Admin($q, toastr, Restangular) {
        var service = {
            getStatusProjects: getStatusProjects,
            wizardOperation: wizardOperation,
            wizardFiles:wizardFiles
        };



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




        return service;
    }

})();
