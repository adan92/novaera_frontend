(function () {
    'use strict';

    angular
        .module('app')
        .factory('propiedadIntelectual', propiedadIntelectual);

    /* @ngInject */
    function propiedadIntelectual($q, toastr, Restangular, Profile, $state,Translate) {
        var service = {
            deletePropiedadIntelectual:deletePropiedadIntelectual
        };
        function getPerfil() {
            var failPerfil = Translate.translate('DIALOGS.FAIL_PERFIL');
            var failureText = Translate.translate('DIALOGS.FAILURE');

            var profile;
            if (Profile.isValidated()) {
                profile = Profile.profileInfo();
                return profile;
            } else {
                $state.go('triangular.admin-default.profiles');
                toastr.error(failPerfil, failureText);
            }
        }
         function deletePropiedadIntelectual(id){
             var deferred = $q.defer();
             var profile=getPerfil();
             if (profile.type === "person") {
                 Restangular.one('TransferenciaTecnologica',id).customDELETE().then(function(res){
                     deferred.resolve(res);
                 }).catch(function (err) {
                     deferred.reject(err);
                 });
             } else {
                 Restangular.one('TransferenciaTecnologica',id).one('Organizacion', profile.id).customDELETE().then(function (res) {
                     deferred.resolve(res);
                 }).catch(function (err) {
                     deferred.reject(err);
                 });
             }
             return deferred.promise;
         }


        return service;
    }

})();