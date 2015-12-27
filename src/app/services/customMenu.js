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
            injectSupervisorMenu:injectSupervisorMenu,
            removeMenu:removeMenu
        }

        function removeMenu(key)
        {
            for (var i = 0; i<triMenu.menu.length;i++)
            {
                if(triMenu.menu[i].name==key)
                {
                    triMenu.menu.splice(i,1);
                    return true;
                }
            }
            return false;
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
                        name: 'Validar Personas',
                        state: 'triangular.admin-default.admin',
                        type: 'link'

                    }
                ]};
            triMenu.menu.unshift(adminMenu);
        }
        return service;
    }
})();
