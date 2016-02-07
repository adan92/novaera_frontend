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
            var admin_menu ='Admin Menu';
            if (User.privileges()=='Supervisor')
            {
                if(CustomMenu.findMenu(admin_menu)==null)
                {
                    CustomMenu.injectSupervisorMenu();
                }
            }
            else
            {
                if(CustomMenu.findMenu(admin_menu)!==null)
                {
                    CustomMenu.removeMenu(admin_menu);
                }
            }


            if (toState.data.requirePrivileges !==undefined && toState.data.requirePrivileges!=User.privileges())
            {
                var title =Translate.translate('MESSAGES.ERROR_TITLE');
                var message =Translate.translate('MESSAGES.UNAUTHORIZED');
                toastr.error(title,message);
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
