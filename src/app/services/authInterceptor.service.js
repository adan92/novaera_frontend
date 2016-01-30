/**
 * Created by lockonDaniel on 12/12/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .service('AuthInterceptor', AuthInterceptor);

    /* @ngInject */




    function AuthInterceptor($injector, $q) {
        var service = {
            request: request,
            response: response,
            responseError: responseError
        };

        function request(config) {

            var Auth = $injector.get('Auth');
            var token = Auth.getToken();

            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
                // config.headers['access_token'] = token;
            }
            return config;
        }

        function response(res) {

            return res;
        }

        function responseError(response) {
            var $state = $injector.get('$state');
            var Auth = $injector.get('Auth');

            if (response.status === 401) {
                if(Auth.isTokenExpired())
                {
                    var promise = Auth.refreshToken();
                    promise.then(function(res){
                    }).catch(function(err)
                    {
                        $injector.get('Auth').logout();
                        $state.go('auth.login');
                    });

                }
                else
                {
                    $injector.get('Auth').logout();
                    $state.go('auth.login');
                }

            }

            return $q.reject(response);
        }

        return service;
    }
})();
