/**
 * Created by lockonDaniel on 12/12/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', Auth);

    /* @ngInject */
    function Auth($q, Restangular, toastr, localStorageService) {
        var service = {
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            getToken: getToken
        };
        return service;

        ////////////////

        function login(username, password) {
            var deferred = $q.defer();

            Restangular.all('Authenticate').customPOST({
                username: username,
                password: password
            })
                .then(function(res){

                    if(res.token){
                        localStorageService.set('token', res.token);
                    }


                    deferred.resolve(res);

                })
                .catch(function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function isLoggedIn(){
            return localStorageService.get('token') || false;
        }

        function getToken(){
            return localStorageService.get('token');
        }

        function logout(){
            localStorageService.clearAll();
            toastr.info('Tu sesión se cerró automáticamente por inactividad. Inicia sesión de nuevo. ', 'Sesión cerrada por inactividad');
        }
    }
})();
