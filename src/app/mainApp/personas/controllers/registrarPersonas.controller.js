(function() {
    'use strict';

    angular
        .module('app.mainApp.personas')
        .controller('registrarPersonasController', registrarPersonasController);

    /* @ngInject */
    function registrarPersonasController(Restangular,toastr) {
        var vm = this;
        vm.paises               = null;
        vm.estados              = null;
        vm.ciudades             = null;
        vm.selectedPais         = null;
        vm.selectedEstado       = null;
        vm.getEstados           = getEstados;
        vm.getCiudades          = getCiudades;

        vm.Persona              = null;
        vm.Contacto             = null;
        vm.showContacto         = false;
        vm.showDireccion        = false;
        vm.activate             = activate();
        vm.registrarPersona     = registrarPersona;
        vm.registrarContacto    = registrarContacto;
        vm.registrarDireccion   = registrarDireccion;

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
                    vm.showDireccion = true;
                }).catch(function(err){

                })
            }


        }

        function registrarDireccion()
        {
            if(vm.Direccion.id!=undefined)
            {
                Restangular.all('Direccion').customPUT(vm.Direccion).then(function(res)
                {
                    vm.Direccion = res;
                    toastr.success("Los datos han sido actualizados correctamente");
                }).catch(function(err){

                })
            }
            else
            {
                Restangular.all('Direccion').customPOST(vm.Direccion).then(function(res)
                {
                    vm.Direccion = res;
                    toastr.success("Los datos han sido guardados correctamente");
                }).catch(function(err){

                })
            }
        }





        function activate(){

            getPaises();
            Restangular.all('Persona').all('Current').customGET().then(function(res)
            {
                vm.Persona = res.Persona;
                if(vm.Persona.id!=undefined)
                {
                    vm.showContacto=true;
                    Restangular.all('Contacto').customGET().then(function(res){
                        vm.Contacto = res;
                        Restangular.all('Direccion').customGET().then(function(res){
                            vm.Direccion = res;
                            Restangular.all('Municipio').one('Selected',vm.Direccion.idMunicipio).customGET().then(function(res)
                            {
                                vm.selectedPais=res.Pais;
                                vm.selectedEstado=res.Estado;
                                getEstados();
                                getCiudades();
                                vm.showDireccion=true;

                            }).catch(function(err){
                            })


                        }).catch(function(err){
                            vm.showDireccion=true;
                        })
                    }).catch(function(err){});
                }
            }).catch(function(err){

            })
        }


        function getPaises()
        {
            Restangular.all('Pais').customGET().then(function(res){
                vm.paises = res;
            }).catch(function(err){
                ;
            })
        }

        function getEstados()
        {
            Restangular.all('Pais').one('EntidadFederativa',vm.selectedPais).customGET().then(function(res){
                vm.estados = res;
            }).catch(function(err){
                ;
            })
        }

        function getCiudades()
        {
            Restangular.all('EntidadFederativa').one('Municipio',vm.selectedEstado).customGET().then(function(res){
             vm.ciudades=res;
            }).catch(function(err){
                ;
            })
        }




    }


})

();
