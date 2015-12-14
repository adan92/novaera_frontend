(function() {
    'use strict';

    angular
        .module('app.mainApp.personas')
        .controller('registrarPersonasController', registrarPersonasController);

    /* @ngInject */
    function registrarPersonasController($scope, Restangular,toastr,$timeout, $mdToast, $rootScope, $state) {
        var vm = this;
        vm.Persona = null;
        vm.Contacto = null;
        vm.showContacto =false;
        vm.activate = activate();
        vm.registrarPersona = registrarPersona;
        vm.registrarContacto = registrarContacto;


        function registrarPersona()
        {
            if(vm.Persona.id!=undefined)
            {
                Restangular.all('Persona').customPUT(vm.Persona).then(function(res)
                {
                    vm.Persona = res;
                    toastr.success("Los datos han sido actualizados correctamente");
                }).catch(function(err){

                })
            }
            else
            {
                Restangular.all('Persona').customPOST(vm.Persona).then(function(res)
                {
                    vm.Persona = res;
                    toastr.success("Los datos han sido guardados correctamente");
                    vm.showContacto = true;
                }).catch(function(err){

                })
            }


        }

        function registrarContacto()
        {
            if(vm.Contacto.id!=undefined)
            {
                Restangular.all('Contacto').customPUT(vm.Contacto).then(function(res)
                {
                    vm.Contacto = res;
                    toastr.success("Los datos han sido actualizados correctamente");
                }).catch(function(err){

                })
            }
            else
            {
                Restangular.all('Contacto').customPOST(vm.Contacto).then(function(res)
                {
                    vm.Contacto = res;
                    toastr.success("Los datos han sido guardados correctamente");
                    vm.showContacto = true;
                }).catch(function(err){

                })
            }


        }





        function activate(){
            Restangular.all('Persona').customGET().then(function(res)
            {
                vm.Persona = res;
                if(vm.Persona.id!=undefined)
                {
                    vm.showContacto=true;
                    Restangular.all('Contacto').customGET().then(function(res){
                        vm.Contacto = res;
                    }).catch(function(err){});
                }
            }).catch(function(err){

            })
        }




        $scope.paises = ('Mexico-Estados Unidos-Canada-Brasil-Colombia'+
        '-Chile').split('-').map(function(pais) {
                return {abbrev: pais};
            })

        $scope.estados = ('Estado de Mexico-Distrito Federal-Guanajuato-Queretaro-Michoacan'+
        '-Aguascalientes').split('-').map(function(pais) {
                return {abbrev: pais};
            })
        $scope.ciudades = ('San Miguel Allende-Irapuato-Leon-Apaseo el Alto-Dolores Hidalgo'+
        '-Celaya').split('-').map(function(ciudad) {
                return {abbrev: ciudad};
            })






    }


})

();
