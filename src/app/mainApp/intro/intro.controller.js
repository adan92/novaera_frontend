/**
 * Created by lockonDaniel on 10/19/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.intro')
        .controller('introController', introController);

    /* @ngInject */
    function introController($mdDialog) {
        var vm = this;

        vm.version          = "0.1a";
        vm.featureRows      = [
            [{
                name: 'Indicadores Novaera',
                icon: 'assets/images/icons/Indicadores.png',
                palette: 'cyan',
                hue: '200',
                template:'indicadores.tmpl.html'
            },{
                name: 'Resultados',
                icon: 'assets/images/icons/Resultados.png',
                palette: 'cyan',
                hue: '300'
            },{
                name: 'Innovación',
                icon: 'assets/images/icons/Innovacion.png',
                palette: 'cyan',
                hue: '400'
            },{
                name: 'Fondos',
                icon: 'assets/images/icons/Fondos.png',
                palette: 'cyan',
                hue: '500'
            }],
            [{
                name: 'Emprendedores',
                icon: 'assets/images/icons/Emprendedor.png',
                palette: 'cyan',
                hue: '600'
            },{
                name: 'Empresas',
                icon: 'assets/images/icons/Empresas.png',
                palette: 'cyan',
                hue: '700'
            },{
                name: 'Organizaciones',
                icon: 'assets/images/icons/Organizaciones.png',
                palette: 'cyan',
                hue: '800'
            },{
                name: 'Proyectos',
                icon: 'assets/images/icons/Proyectos.png',
                palette: 'cyan',
                hue: '900'
            }]
        ];
        vm.openDialog       = openDialog;

        function openDialog(event,template)
        {
            var config = {
                controller: 'introDialogController',
                templateUrl:'app/mainApp/intro/'+template,
                parent: angular.element(document.body),
                targetEvent:event,
                clickOutsideToClose:true,
                fullscreen: true,
                //locals:{selectedConvocatoria:vm.selectedConvocatoria},
                //bindToController:true,
                controllerAs: 'vm'
            };
            $mdDialog.show(config).then(function(reply){
            },function()
            {
            });

        }


    }
})();
