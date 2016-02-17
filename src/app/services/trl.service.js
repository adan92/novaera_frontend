(function () {
    'use strict';

    angular
        .module('app')
        .factory('TRL', TRL);

    /* @ngInject */
    function TRL($q, Restangular,Profile) {
        var service = {
            getAllTLR: getAllTLR,
            getTRLByProject:getTRLByProject,
            deleteTRLFromProject:deleteTRLFromProject,
            saveTRLProject:saveTRLProject
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
        function saveTRLProject(information){
            var deferred = $q.defer();
            var profile=getPerfil();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('TRL').customPOST(information).then(function (res) {
                    deferred.resolve(true);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }else{
                Restangular.all('Proyecto').all('TRL').one('Organizacion',profile.id).customPOST(information).then(function (res) {
                    deferred.resolve(true);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
        function deleteTRLFromProject(request){
            var deferred = $q.defer();
            var profile=getPerfil();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('TRL').all('Delete').customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }else{
                Restangular.all('Proyecto').all('TRL').all('Delete').one('Organizacion',profile.id).customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
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
