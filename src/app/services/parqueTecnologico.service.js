(function () {
    'use strict';

    angular
        .module('app')
        .factory('parqueTecnologico', parqueTecnologico);

    /* @ngInject */
    function parqueTecnologico($q, toastr, Restangular, Profile, $state) {
        var service = {
            getAllParqueTecnologico: getAllParqueTecnologico
        };
        function  getAllParqueTecnologico(){
            var deferred = $q.defer();

            Restangular.all('ParqueTecnologico').customGET().then(function (res) {

                deferred.resolve(res.ParqueTecnologico);
            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return service;
    }

})();
