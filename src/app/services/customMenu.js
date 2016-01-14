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
        };

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
                icon: 'zmdi zmdi-lock-open',
                priority: 2.1,
                children:[

                    {
                        name: 'MENU.DESCRIPTOR.DESCRIPTOR',
                        type: 'dropdown',
                        icon: 'zmdi zmdi-layers',
                        priority: 2.1,
                        children:[
                            {
                                name: 'Informacion',
                                state: 'triangular.admin-default.descriptor',
                                type: 'link'

                            },
                            {
                                name: 'Tipo de Descriptor',
                                state: 'triangular.admin-default.tipo_descriptor',
                                type: 'link'

                            }


                        ]

                    },
                    {
                        name: 'MENU.PROJECTS.PROJECTS',
                        type: 'dropdown',
                        icon: 'zmdi zmdi-layers',
                        priority: 2.1,
                        children:[

                            {
                                name: 'Validar Proyectos',
                                state: 'triangular.admin-default.validarProyectos',
                                type: 'link'
                            }

                        ]

                    },
                    {
                        name: 'MENU.EXPINFO.EXPINFO1',
                        type: 'dropdown',
                        icon: 'zmdi zmdi-chart',
                        priority: 2.1,
                        children:[
                            {
                                name: 'MENU.EXPINFO.EXPINFO1',
                                state: 'triangular.admin-default.explotacionInformacion',
                                type: 'link'

                            },
                            {
                                name: 'MENU.EXPINFO.EXPINFO2',
                                state: 'triangular.admin-default.explotacionInformacionEsp',
                                type: 'link'

                            }

                        ]
                    },
                    { name: 'MENU.PERSONAS.PERSONAS',
                        type: 'dropdown',
                        icon: 'zmdi zmdi-account',
                        priority: 2.1,
                        children:[
                            {
                                name: 'Información',
                                state: 'triangular.admin-default.personas',
                                icon: 'fa fa-user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   ',
                                type: 'link'

                            },
                            {
                                name: 'Validar Personas',
                                state: 'triangular.admin-default.admin',
                                icon: 'fa fa-users',
                                type: 'link'

                            },
                            {
                                name: 'Descriptor Personas',
                                state: 'triangular.admin-default.personas_descriptor_admin',
                                icon: 'zmdi zmdi-layers',
                                type: 'link'

                            }
                        ]},
                    {
                        name: 'MENU.FONDEOS.FONDEOS',
                        type: 'dropdown',
                        icon: 'zmdi zmdi-money-box',
                        priority: 2.1,
                        children:[
                            {
                                name: 'Registro',
                                state: 'triangular.admin-default.fondeos_registro',
                                type: 'link'

                            },
                            {
                                name: 'Convocatoria',
                                state: 'triangular.admin-default.fondeos_convocatoria',
                                type: 'link'

                            },
                            {
                                name: 'Modalidad',
                                state: 'triangular.admin-default.fondeos_modalidad',
                                type: 'link'

                            },
                            {
                                name: 'Descriptor',
                                state: 'triangular.admin-default.fondeos_descriptor',
                                type: 'link'

                            }


                        ]
                    }

                ]};
            triMenu.menu.unshift(adminMenu);
        }
        return service;
    }
})();
