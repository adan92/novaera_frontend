/**
 * Created by lockonDaniel on 12/26/15.
 */
/**
 * Created by lockonDaniel on 12/12/15.
 */
(function() {
    'use strict';

    angular
        .module('app')
        .factory('CustomMenu', CustomMenu);

    /* @ngInject */
    function CustomMenu(triMenu) {
        var service ={
            findMenu:findMenu,
            injectSupervisorMenu:injectSupervisorMenu
        }

        function findMenu(key)
        {
            var result = triMenu.menu.filter(function(element){
                return element.name == key;
            });
            return result?result[0] :null;
        }

        function injectSupervisorMenu()
        {
            var adminMenu = {
                name: 'Admin Menu',
                type: 'dropdown',
                icon: 'zmdi zmdi-info-outline',
                priority: 2.1,
                children:[
                    {
                        name: 'Index',
                        state: 'triangular.admin-default.admin',
                        type: 'link'

                    }
                ]};
            triMenu.addMenu(adminMenu);


        }




        return service;
    }


})();
