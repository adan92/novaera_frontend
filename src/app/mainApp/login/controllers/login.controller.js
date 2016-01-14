(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('mainLoginController', mainLoginController);

    /* @ngInject */
    function mainLoginController($state,toastr, Auth,User,triSettings, Translate) {
        var vm = this;
        vm.activate = activate();
        vm.loginClick = loginClick;
        vm.socialLogins = [{
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#'
        },{
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#'
        },{
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#'
        },{
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#'
        }];
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            username: '',
            password: ''
        };

        function activate()
        {
            vm.failureText = Translate.translate('DIALOGS.FAILURE');
            vm.loginFailureMessage = Translate.translate('DIALOGS.FAIL_LOGIN');
        }


        ////////////////

        function loginClick() {
            Auth.login(vm.user.username, vm.user.password)
                .then(function(res) {
                    User.setUser().then(function(promise){
                        $state.go('triangular.admin-default.intro');
                    });
            }).catch(function(err){
                toastr.error(vm.loginFailureMessage,vm.failureText+" "+err.status);
            })
        }
    }
})();