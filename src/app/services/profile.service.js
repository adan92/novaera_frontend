/**
 * Created by lockonDaniel on 12/12/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('Profile', Profile);

    /* @ngInject */
    function Profile(localStorageService) {
        var service ={
            setProfile:setProfile,
            clearProfile:clearProfile,
            profileInfo:profileInfo,
            isValidated:isValidated
        };



        function isValidated()
        {
            var user = profileInfo();
            if(user===null) {
                return false;
            }
            if(user.isValidated===0) {
                return false;
            }
            return true;
        }


        function clearProfile()
        {
            return localStorageService.remove('profile');
        }


        function profileInfo()
        {
            return localStorageService.get('profile') || null;
        }


        function setProfile(profile)
        {
            localStorageService.set('profile', profile);
        }


        return service;
    }


})();
