(function() {
    'use strict';

    angular
        .module('app.mainApp.login')
        .controller('mainLoginController', mainLoginController);

    /* @ngInject */
    function mainLoginController($state,toastr, Auth,User,triSettings) {
        var vm = this;
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

        ////////////////

        function loginClick() {
            Auth.login(vm.user.username, vm.user.password)
                .then(function(res) {
                    User.setUser().then(function(promis){
                        $state.go('triangular.admin-default.intro');
                    });


            }).catch(function(err){
                toastr.error(err.data.error,"Error "+err.status);
            })
        }
    }
})();