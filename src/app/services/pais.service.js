(function () {
    'use strict';

    angular
        .module('app')
        .factory('Pais', Pais);

    /* @ngInject */
    function Pais($q,  Restangular) {
        var service = {
            getAllPais: getAllPais
        };
        function  getAllPais(){
            var deferred = $q.defer();
            Restangular.all('Pais').customGET().then(function (res) {
                deferred.resolve(res.Pais);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        return service;
    }

})();
