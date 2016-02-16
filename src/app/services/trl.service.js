(function () {
    'use strict';

    angular
        .module('app')
        .factory('TRL', TRL);

    /* @ngInject */
    function TRL($q, Restangular,Profile) {
        var service = {
            getAllTLR: getAllTLR,
            getTRLByProject:getTRLByProject
        };
        function getPerfil() {
            var profile;
            if (Profile.isValidated()) {
                profile = Profile.profileInfo();
                return profile;
            } else {
                $state.go('triangular.admin-default.profiles');
                toastr.error('Se debe seleccionar el perfil para acceder a este módulo', 'Error');
            }
        }
        function getTRLByProject(id){
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {

                Restangular.all('Proyecto').one('TRL',id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            }else{
                Restangular.all('Proyecto').one('TRL',id).one('Organizacion',profile.id).customGET().then(function (res) {
                    console.log(res);
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }
        function  getAllTLR(){
            var deferred = $q.defer();

            Restangular.all('TRL').customGET().then(function (res) {
                console.log(res);
                deferred.resolve(res.TRL);
            }).catch(function (err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        return service;
    }

})();
