/**
 * Created by lockonDaniel on 12/13/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, User, $state, Auth,toastr,CustomMenu,Translate) {
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            if (User.privileges()=='Supervisor')
            {
                if(CustomMenu.findMenu('Admin Menu')==null)
                {
                    CustomMenu.injectSupervisorMenu();
                }
            }


            if (toState.data.requirePrivileges !=undefined && toState.data.requirePrivileges!=User.privileges())
            {
                toastr.error(Translate.translate('MESSAGES.ERROR_TITLE'),Translate.translate('MESSAGES.UNAUTHORIZED'));
                $state.go(toState.data.redirect);
            }


            if (toState.data.requireLogin === true && !Auth.isLoggedIn()) {
                $state.go('auth.login');
            }
            if (toState.data.requireValidation ===true && !User.isValidated()){
                toastr.error(Translate.translate('MESSAGES.ERROR_TITLE'),Translate.translate('MESSAGES.VALIDATION_REQUIRED'));
                $state.go(toState.data.redirect);
            }



        });

    }

})();
