/**
 * Created by lockonDaniel on 12/13/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, User, $state, Auth) {


        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if (toState.data.requireLogin === true && !Auth.isLoggedIn()) {

                $state.go('auth.login');
            }
        });

    }

})();
