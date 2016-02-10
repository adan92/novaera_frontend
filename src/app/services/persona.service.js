(function() {
    'use strict';

    angular
        .module('app')
        .factory('Persona', Persona);

    /* @ngInject */
    function Persona($q,Restangular) {
        var service = {
            existPerson: existPerson
        };
        function existPerson()
        {
            var deferred = $q.defer();
            Restangular.all('Persona').customGET().then(function()
            {
                deferred.resolve(true);
            }).catch(function(){
                deferred.reject(false);
            });
            return deferred.promise;
        }
        return service;
    }

})();