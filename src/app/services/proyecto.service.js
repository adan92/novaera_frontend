(function () {
    'use strict';

    angular
        .module('app')
        .factory('Proyecto', Proyecto);

    /* @ngInject */
    function Proyecto($q, toastr, Restangular, Profile, $state,Translate) {
        var service = {
            getAllProjects: getAllProjects,
            getProjectById: getProjectById,
            saveProject: saveProject,
            updateProject: updateProject,
            getProjectTransTecById: getProjectTransTecById,
            getEtapasProject: getEtapasProject,
            saveEtapasProject: saveEtapasProject,
            saveResultado: saveResultado,
            getResultado: getResultado,
            updateResultado: updateResultado,
            getDescriptoresProject: getDescriptoresProject,
            getResultados: getResultados,
            getDescriptorResultado: getDescriptorResultado,
            getDescriptoresResultados: getDescriptoresResultados,
            deleteDescriptorResultados:deleteDescriptorResultados,
            saveDescriptorResultados:saveDescriptorResultados,
            updateDescriptorResultados:updateDescriptorResultados
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

        function getDescriptoresProject(idProyecto) {

        }

        function saveEtapasProject(request) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('EtapaProyecto').customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            } else {
                Restangular.all('Proyecto').all('EtapaProyecto').one('Organizacion', profile.id).customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }

        function getEtapasProject(id) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').one('EtapaProyecto', id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Proyecto').one('EtapaProyecto', id).one('Organizacion', profile.id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        function getProjectTransTecById(id) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').one('TransferenciaTecnologica', id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Proyecto').one('TransferenciaTecnologica', id).one('Organizacion', profile.id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        function updateProject(proyecto) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').one('Persona', proyecto.id).customPUT(proyecto).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })
            } else {
                Restangular.all('Proyecto').one('Organizacion', proyecto.id).all(profile.id).customPUT(proyecto).then(function (res) {
                    console.log(res);
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                })
            }
            return deferred.promise;
        }

        function saveProject(proyecto) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Persona').customPOST(proyecto).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            } else {
                Restangular.all('Proyecto').one('Organizacion', profile.id).customPOST(proyecto).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }

        function getProjectById(id) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('One').one('Persona', id).customGET().then(function (res) {
                    deferred.resolve(res);
                });
            } else {
                Restangular.all('Proyecto').all('One').one('Organizacion', id).customGET(profile.id).then(function (res) {
                    deferred.resolve(res);
                });
            }
            return deferred.promise;
        }

        function getAllProjects() {
            var profile = getPerfil();
            var deferred = $q.defer();
            console.log(profile);
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Persona').customGET().then(function (res) {

                    deferred.resolve(res.Proyectos);
                }).catch(function (err) {
                    console.log(err);
                });
            } else {
                console.log("organizacion");
                Restangular.all('Proyecto').all('Organizacion').customGET(profile.id).then(function (res) {
                    deferred.resolve(res.Proyectos);
                });
            }
            return deferred.promise;
        }

        function updateResultado(request) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Resultados').customPUT(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(false);
                });
            } else {
                Restangular.all('Proyecto').all('Resultados').one('Organizacion', profile.id).customPUT(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }

        function saveResultado(request) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Resultados').customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(false);
                });
            } else {
                Restangular.all('Proyecto').all('Resultados').one('Organizacion', profile.id).customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        }

        function getResultado(idProyecto, tipo) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').one('Resultados', idProyecto).all(tipo).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            } else {
                Restangular.all('Proyecto').one('Resultados', idProyecto).one(tipo, 'Organizacion').all(profile.id).customGET().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        function getResultados(idProyecto) {
            var tipos = ['Todos', 'Patente'];
            var promises = [];
            angular.forEach(tipos, function (data) {
                promises.push(getResultado(idProyecto, data));
            });
            return $q.all(promises);
        }

        function getDescriptorResultado(idResultado) {
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Resultados').one('Descriptor', idResultado).customGET().then(function (res) {
                    deferred.resolve(res.ResultadoRescriptor);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }else{
                Restangular.all('Proyecto').all('Resultados').one('Descriptor', idResultado).one('Organizacion', profile.id).customGET().then(function (res) {
                    deferred.resolve(res.ResultadoRescriptor);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }

        function getDescriptoresResultados(ids) {
            var promises = [];
            angular.forEach(ids, function (data) {
                console.log(data);
                promises.push(getDescriptorResultado(data));
            });
            return $q.all(promises);

        }
        function deleteDescriptorResultados(idDescriptor){
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Resultados').one('Descriptor', idDescriptor).customDELETE().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }else{
                Restangular.all('Proyecto').all('Resultados').one('Descriptor', idDescriptor).one('Organizacion', profile.id).customDELETE().then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
        function saveDescriptorResultados(request){
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Resultados').all('Descriptor').customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }else{
                Restangular.all('Proyecto').all('Resultados').all('Descriptor').one('Organizacion', profile.id).customPOST(request).then(function (res) {
                    deferred.resolve(res);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
        function updateDescriptorResultados(idDescriptor){
            var profile = getPerfil();
            var deferred = $q.defer();
            if (profile.type === "person") {
                Restangular.all('Proyecto').all('Resultados').one('Descriptor', idDescriptor.id).customPUT(idDescriptor).then(function (res) {
                    deferred.resolve(res.ResultadoRescriptor);
                }).catch(function (err) {
                    deferred.reject(err);
                });
            }else{
                Restangular.all('Proyecto').all('Resultados').one('Descriptor', idDescriptor.id).one('Organizacion', profile.id).customPUT(idDescriptor).then(function (res) {
                    deferred.resolve(res.ResultadoRescriptor);
                }).catch(function (err) {
                    console.log(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;
        }
        return service;
    }

})();
