/**
 * Created by darkxavier on 12/30/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('revisarProyectosController', revisarProyectosController);

    /* @ngInject */
    function revisarProyectosController(registroProyecto) {
        var vm = this;
        vm.solicitudes=[];
        loadProjects();



        vm.selectedItem = null;

        vm.selectedSolicitudes = [];

        function loadProjects(){
            var promise=registroProyecto.getStatusProjectsByProfile();
            promise.then(function(res){
                console.log(res);
                vm.solicitudes=res.RegistroProyectos;
            });
        }
    }
})

();