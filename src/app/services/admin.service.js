(function () {
    'use strict';

    angular
        .module('app')
        .factory('Admin', Admin);

    /* @ngInject */
    function Admin($q, toastr, Restangular) {
        var service = {
            getStatusProjects: getStatusProjects
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

        return service;
    }

})();
