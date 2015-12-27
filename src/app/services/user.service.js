/**
 * Created by lockonDaniel on 12/12/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('User', User);

    /* @ngInject */
    function User($q,Restangular,localStorageService) {
        var service ={
            setUser:setUser,
            clearUser:clearUser,
            userInfo:userInfo,
            privileges: privileges,
            isValidated:isValidated
        }

        function privileges()
        {
            var user = localStorageService.get('user') || null;
            if(user === null)
            {
                return null;
            }
            else return user.type;
        }


        function isValidated()
        {
            var user = userInfo();
            if(user==null)
                return false;
            if(user.isValidated==0)
                return false;
            return true;
        }


        function clearUser()
        {
            return localStorageService.remove('user');
        }


        function userInfo()
        {
            return localStorageService.get('user') || null;
        }


        function setUser()
        {
            var deferred = $q.defer();
            Restangular.all('User').customGET().then(function(res){
                localStorageService.set('user', res);
                deferred.resolve(res);
            }).catch(function(err){
                deferred.reject(err);

            });
            return deferred.promise;
        }


        return service;
    }


})();
