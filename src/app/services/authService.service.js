/**
 * Created by lockonDaniel on 12/12/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', Auth);

    /* @ngInject */
    function Auth($q, Restangular, toastr, localStorageService,jwtHelper) {
        var service = {
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            getToken: getToken,
            isTokenExpired:isTokenExpired,
            refreshToken:refreshToken,
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

                        //localStorageService.set('token', res.token);
                        localStorageService.set('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4ODg4XC9ub3ZhZXJhX2xhcmF2ZWxcL3B1YmxpY1wvYXBpXC9BdXRoZW50aWNhdGUiLCJpYXQiOjE0NTM5NjA5MjYsImV4cCI6MTQ1Mzk2NDUyNiwibmJmIjoxNDUzOTYwOTI2LCJqdGkiOiI5Y2MxYjRmNmM0MzEyNzUwMDFkYWFhZmU1NTc3YmUxMSJ9.lRPtqnpNXEWduawYS1hLdhxiMHgf4qr5EVUSXYMo4fA');
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

        function isTokenExpired() {
            return jwtHelper.isTokenExpired(getToken());

        }

        function refreshToken()
        {
            var deferred = $q.defer();

            Restangular.all('RefreshToken').customGET().then(function(res)
            {
                if(res.token)
                {
                    localStorageService.set('token', res.token);
                }
                deferred.resolve(res);
            }).catch(function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }


        function logout(){
            localStorageService.clearAll();
            toastr.info('Tu sesión se cerró automáticamente por inactividad. Inicia sesión de nuevo. ', 'Sesión cerrada por inactividad');
        }
    }
})();
