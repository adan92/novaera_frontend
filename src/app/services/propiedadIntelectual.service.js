(function () {
    'use strict';

    angular
        .module('app')
        .factory('propiedadIntelectual', propiedadIntelectual);

    /* @ngInject */
    function propiedadIntelectual($q, toastr, Restangular, Profile, $state,Translate) {
        var service = {
            deletePropiedadIntelectual:deletePropiedadIntelectual,
            getOperation: getOperation,
            getFileOperation: getFileOperation,
            getUrl: getUrl,
            updateOperation:updateOperation,
            saveOperation:saveOperation
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
                     console.log(err);
                     deferred.reject(err);
                 });
             } else {
                 Restangular.one('TransferenciaTecnologica',id).one('Organizacion', profile.id).customDELETE().then(function (res) {
                     console.log(res);
                     deferred.resolve(res);
                 }).catch(function (err) {
                     console.log(err);
                     deferred.reject(err);
                 });
             }
             return deferred.promise;
         }
        function updateOperation(request) {
            var deferred = $q.defer();
            var profile=getPerfil();
            if (profile.type === "person") {
                Restangular.all(typeInfo()).all('Update').customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            } else {
                Restangular.all(typeInfo()).all('Update').one('Organizacion',profile.id).customPOST(request).then(function (res) {
                    console.log(res);

                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
        function saveOperation(request) {
            var profile=getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all(typeInfo()).customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            } else {
                Restangular.all(typeInfo()).one('Organizacion',profile.id).customPOST(request).then(function (res) {
                    console.log(res);
                    deferred.resolve(res);

                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
        function getOperation(projectId) {
            var deferred = $q.defer();
            var profile=getPerfil();
            if (profile.type === "person") {
                Restangular.one(typeInfo(), projectId).customGET().then(function (res) {

                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                Restangular.one(typeInfo(), projectId).one('Organizacion', profile.id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        function getFileOperation(projectId) {
            var deferred = $q.defer();
            var profile=getPerfil();
            if (profile.type === "person") {
                Restangular.all(typeInfo()).one('Archivos', projectId).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                Restangular.all(typeInfo()).one('Archivos', projectId).one('Organizacion', profile.id).customGET().then(function (res) {
                    console.log("sssssssss");
                    console.log(res.Archivos);
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        function getUrl(type,operation) {
            var profile=getPerfil();
            if (profile.type === "person") {
                if (type === "up") {
                    return typeInfo()+"/Update";
                } else {
                    return typeInfo();
                }
            }
            else {
                if (type === "up") {
                    return  typeInfo()+"/Update/Organizacion/" + profile.id;
                } else {
                    return typeInfo()+"/Organizacion/" + profile.id;
                }
            }
        }

        return service;
    }

})();