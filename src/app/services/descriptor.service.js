/**
 * Created by Dark Xavier on 8/02/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Descriptor', Descriptor);

    /* @ngInject */
    function Descriptor($q, Restangular, Profile,Translate) {

        var service = {
            getTipoDescriptorByClasificacion: getTipoDescriptorByClasificacion,
            callAssosciated: callAssosciated,
            saveDescriptor: saveDescriptor,
            getDescriptorByProject: getDescriptorByProject,
            deleteDescriptor: deleteDescriptor,
            updateDescriptor: updateDescriptor
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

        //obtenemos perfil user


        /*function deleteFondeo(fondeo) {
         var deferred = $q.defer();

         Restangular.one('ProgramaFondeo', fondeo.id).customDELETE().then(function (res) {
         deferred.resolve(res);
         }).catch(function (err) {
         deferred.reject(err);
         });


         return deferred.promise;
         }



         function updateFondeo(fondeo) {

         var deferred = $q.defer();

         Restangular.all('ProgramaFondeo').one('Update', fondeo.id).customPOST(fondeo).then(function (res) {
         deferred.resolve(res);
         }).catch(function (err) {
         deferred.reject(err);
         });


         return deferred.promise;
         }



         function getFondeoById(fondeo) {
         var deferred = $q.defer();
         Restangular.one('ProgramaFondeo', fondeo.id).customGET(fondeo).then(function (res) {
         deferred.resolve(res);
         }).catch(function (err) {
         deferred.reject(err);
         });


         return deferred.promise;
         }*/
        function deleteDescriptor(idProject, idDescriptor) {
            var deferred = $q.defer();
            var profile = getPerfil();
            if (profile.type === "person") {
                Restangular.all('Proyecto').one('Descriptor', idProject).all(idDescriptor).customDELETE().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Proyecto').one('Descriptor', idProject).all(idDescriptor).one('Organizacion', profile.id).customDELETE().then(function (res) {
                    console.log(res);
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }

            return deferred.promise;
        }

        function updateDescriptor(idDescriptor, descriptor) {
            var deferred = $q.defer();
            var profile = getPerfil();
            if (profile.type === "person") {
                Restangular.all('Proyecto').one('Descriptor', idDescriptor).customPUT(descriptor).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Proyecto').one('Descriptor', idDescriptor).one('Organizacion', profile.id).customPUT(descriptor).then(function (res) {
                    console.log(res);
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }

            return deferred.promise;

        }

        function saveDescriptor(request) {

            var deferred = $q.defer();
            var profile = getPerfil();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Descriptor').customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Proyecto').all('Descriptor').one('Organizacion', profile.id).customPOST(request).then(function (res) {
                    console.log(res);
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }

            return deferred.promise;
        }

        function callAssosciated(idDescriptor) {
            var deferred = $q.defer();

            Restangular.all('TipoDescriptor').one('Descriptor', idDescriptor).customGET().then(function (res) {
                deferred.resolve(res);
            }).catch(function (err) {
                deferred.reject(err);
            });


            return deferred.promise;
        }

        function getDescriptorByProject(idProyecto) {
            var deferred = $q.defer();
            var profile = getPerfil();
            if (profile.type === "person") {
                Restangular.all('Proyecto').one('Descriptor', idProyecto).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Proyecto').one('Descriptor', idProyecto).one('Organizacion', profile.id).customGET().then(function (res) {
                    console.log(res);
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }

            return deferred.promise;
        }

        function getTipoDescriptorByClasificacion(clasificacion) {
            var deferred = $q.defer();
            Restangular.all('TipoDescriptor').one('Clasificacion', clasificacion).customGET().then(function (res) {
                deferred.resolve(res.TipoDescriptor);
            }).catch(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        return service;
    }

})();