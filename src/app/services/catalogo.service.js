(function () {
    'use strict';

    angular
        .module('app')
        .factory('Catalogo', Catalogo);

    /* @ngInject */
    function Catalogo($q,  Restangular) {
        var service = {
            getAllCatalogo: getAllCatalogo
        };
        function  getAllCatalogo(catalogo){
            var deferred = $q.defer();
            Restangular.all(catalogo).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
        return service;
    }

})();
