(function () {
    'use strict';

    angular
        .module('app')
        .factory('Organizacion', Organizacion);

    /* @ngInject */
    function Organizacion($q, Restangular) {
        var service = {
            getOrganizacionWitoutValidate: getOrganizacionWitoutValidate,
            validateOrganizaciones:validateOrganizaciones

        };


        function getOrganizacionWitoutValidate() {
            var deferred = $q.defer();
            Restangular.all('Supervisor').all('Organizacion').customGET().then(function (res) {
                deferred.resolve(res.Organizacion);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        function validateOrganizaciones(organizaciones){
            var deferred = $q.defer();
            Restangular.all('Supervisor').all('Organizacion').customPOST(organizaciones).then(function (res) {
                deferred.resolve(res.Organizacion);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        return service;
    }

})();
