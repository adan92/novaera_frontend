(function () {
    'use strict';

    angular
        .module('app')
        .factory('Proyecto', Proyecto);

    /* @ngInject */
    function Proyecto($q, toastr, Restangular, Profile, $state) {
        var service = {
            getAllProjects: getAllProjects,
            getProjectById: getProjectById,
            saveProject:saveProject,
            updateProject:updateProject
        };
        var profile;
        if (Profile.isValidated()) {
            profile = Profile.profileInfo()
        } else {
            $state.go('triangular.admin-default.profiles');
            toastr.error('Se debe seleccionar el perfil para acceder a este módulo', 'Error');
        }
        function updateProject(proyecto){
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').one('Persona',proyecto.id).customPUT(proyecto).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })
            }else{
                Restangular.all('Proyecto').one('Organizacion',proyecto.id).all(profile.id).customPUT(proyecto).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })
            }
            return deferred.promise;
        }
        function saveProject(proyecto){
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Persona').customPOST(proyecto).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            }else{
                Restangular.all('Proyecto').one('Organizacion',profile.id).customPOST(proyecto).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }
        function getProjectById(id) {
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').one('Persona', id).customGET().then(function (res) {
                    deferred.resolve(res);
                });
            } else {
                Restangular.all('Proyecto').one('Organizacion', id).customGET(profile.id).then(function (res) {
                    deferred.resolve(res);
                });
            }
            return deferred.promise;
        }

        function getAllProjects() {
            var deferred = $q.defer();
            console.log(profile.type);
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Persona').customGET().then(function (res) {

                    deferred.resolve(res.Proyectos);
                });
            } else {
                console.log("organizacion");
                Restangular.all('Proyecto').all('Organizacion').customGET(profile.id).then(function (res) {
                    deferred.resolve(res.Proyectos);
                });
            }
            return deferred.promise;
        }

        return service;
    }

})();