(function() {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('convocatoriaFondeosController', convocatoriaFondeosController);

    /* @ngInject */
    function  convocatoriaFondeosController($scope, $timeout ,$rootScope,Modalidad, Fondeo , Convocatoria, toastr, Restangular, $state, Translate) {
        var vm = this;
        vm.activate = activate();
        //Inicializacion objetos
        //Programas de Fondeo
        vm.fondeo = {
            "id": null,
            "Titulo": null,
            "PublicoObjetivo": null,
            "FondoTotal": null,
            "Justificacion": null,
            "Descripcion": null,
            "RubrosDeApoyo": null,
            "CriteriosElegibilidad": null,
            "created_at": null,
            "updated_at": null
        };
        //arreglo de objetos Fondeo
        vm.Fondeos=null;
        //Objeto de Modalidad.
        vm.Modalidad ={
            "id": null,
            "idProgramaFondeo":null,
            "Nombre":null,
            "Montos":null,
            "FigurasApoyo":null,
            "CriteriosEvaluacion":null,
            "Entregables":null,
            "created_at":null,
            "updated_at":null
        }
        //arreglo de modalidades
        //Todas las Modalidades
        vm.Modalidades=[];
        //modalidades asociadas a la convocatoria
        vm.ModalidadesAsociadas=null;
        vm.Validator = [{
            title: 'Activo',
            value: true
        },{
            title: 'Inactivo',
            value: false
        }];
        //Objeto Convocatoria
        vm.Convocatoria={
            "id": null,
            "Nombre":null,
            "FechaInicio":null,
            "FechaTermino":null,
            "Requisitos":null,
            "MontosMaximosTotales":null,
            "Activo":null,
            "ProgramaAsociado":null,
            "created_at":null,
            "updated_at":null,
            "modalidad":null

        }
        //Arreglo Convocatorias
        vm.Convocatorias=null;

        //Objeto Requisito
        vm.requisito={
            "Nombre":null,
            "Descripcion":null
        }
        //Arreglo requisitos
        vm.Requisitos=[];
        //Objeto de tabla Pivote:
        vm.pivot={
            "idConvocatoria":null,
            "idModalidad":null,
            "created_at":null,
            "updated_at":null
        }
        //objeto para agregarconvocatoria
        vm.agrega={
            "idConvocatoria" : null,
            "Modalidad": null
        }
        //variables


        vm.tmp = null;
        vm.selectedConvocatoria =null;
        vm.selectedModalidad = null;
        vm.selectedFondeo = null;
        vm.selectedRequisito = null;
        //controles GUIS
        vm.isDisabled = false;
        vm.isNewConvocatoria = true;
        vm.isNewRequisito=true;

        //DeclaracionFunciones
        //funciones para el To-Do

        //funcionalidad

        vm.getModalidades = getModalidades;//listo
        vm.getFondeos = getFondeos;//listo
        vm.getFondeo=getFondeo;//Listo
        vm.cancel =cancel;//listo
        vm.getAllConvocatorias= getAllConvocatorias;//listo
        vm.getConvocatoria= getConvocatoria;//listo
        vm.registrarConvocatoria=registrarConvocatoria;//listo
        vm.eliminarConvocatoria=eliminarConvocatoria;
        vm.showModalitiesRelation=showModalitiesRelation;//Listo
        vm.addConvocatoriaModalidad=addConvocatoriaModalidad;//Listo
        vm.quitarModalidadConvocatoria=quitarModalidadConvocatoria;//Listo
        vm.quitarTodasModalidadConvocatoria=QuitarTodasModalidadConvocatoria;//listo
        vm.crearRequisito=crearRequisito;


        //Funcionalidades
        function activate()
        {
            //mensajes del toastr
            vm.sureText = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText = Translate.translate('DIALOGS.WARNING');
            vm.successText = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText = Translate.translate('DIALOGS.FAIL_DELETE');
            getFondeos();

            getAllConvocatorias();

        }
        function getFondeo() {
            console.log("El programa Asociado a Buscar es:");
            console.log(vm.Convocatoria.ProgramaAsociado);
            var promise = Fondeo.getFondeoById(vm.Convocatoria.ProgramaAsociado);
            promise.then(function (value) {
                vm.selectedFondeo=value;
                console.log("PateaLalata");
                console.log(vm.selectedFondeo);
            });
        }
        //Obtener todos los fondeos
        function getFondeos() {
            var promise = Fondeo.getAllFondeos();
            promise.then(function (value) {
                vm.Fondeos = value;
                console.log(vm.Fondeos)

            });
        }

        //Obtener Modalidades  relacionadas a Programas de Fondeo
        function getModalidades() {
            //obtengo el programa de fondeo
            var promise = Fondeo.getFondeoById(vm.Convocatoria.ProgramaAsociado);
            promise.then(function (value) {
                vm.selectedFondeo=value;
                //console.log(vm.selectedFondeo);
            });
            console.log(vm.selectedFondeo);
            //console.log("Consultando Modalidades");
            var promise = Modalidad.showModalitiesRelationFondeos(vm.selectedFondeo);
            promise.then(function (value) {
                vm.tmp = value;
               console.log("Tmp");
                console.log(vm.tmp)
                vm.Modalidades=vm.tmp;
               console.log("Modalidades");
                console.log(vm.Modalidades);
                //hello

            });
        }
        //Funcion Obtener todas las Convocatorias
        function getAllConvocatorias() {
            var promise = Convocatoria.getAllConvocatorias();
            promise.then(function (value) {

                    vm.Convocatorias=value;

                console.log(vm.Convocatorias)

            });
        }
        //Funcion para Seleccionar 1 Convocatoria
        function getConvocatoria() {
            console.log("Ya seleccione");
            console.log(vm.selectedConvocatoria);
            vm.Convocatoria=vm.selectedConvocatoria;
            vm.Requisitos=JSON.parse(vm.Convocatoria.Requisitos);
            getModalidades();

        }
        //Funcion Cancelar
        function cancel() {

            vm.selectedFondeo=null;
            vm.fondeo = null;
            vm.isNewFondeo=true;
            vm.Modalidad=null;
            vm.selectedModalidad=null;
            vm.isNewModalidad=null;
            vm.requisito=null;
            vm.selectedRequisito=null;
            vm.isNewRequisito=null;
            vm.Convocatoria=null;
            vm.isNewConvocatoria=null;
            vm.Requisitos=null;


        }
        //Registrar Convocatoria
        function registrarConvocatoria() {
            vm.Convocatoria.ProgramaAsociado=vm.selectedFondeo.id;
            vm.Convocatoria.Requisitos=vm.Requisitos;
            console.log("Entrando a la funcion");
            console.log(vm.Convocatoria)
            if (vm.Convocatoria.id == null) {
                console.log("Creando Convocatoria");
                var promise = Convocatoria.crearConvocatoria(vm.Convocatoria);
                promise.then(function(res){
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.Convocatoria = res;
                    vm.ConvocatoriaLabel = vm.Convocatoria.Nombre;
                }).catch(function(err){
                    toastr.error(vm.failureText, vm.failureStoreText);
                    console.log(err);
                });
            }
            else {
                console.log("Estoy editando");
                var promise = Convocatoria.updateConvocatoria(vm.Convocatoria);
                promise.then(function(res){
                    toastr.success(vm.successText, vm.successUpdateText);
                    vm.ConvocatoriaLabel = vm.Convocatoria.Nombre;
                }).catch(function(err){
                    toastr.error(vm.failureText, vm.failureStoreText);
                    console.log(err);
                });
            }

            console.log("Estoy Actualizando Lista de Convocatorias");
            var promise = Convocatoria.getAllConvocatorias(vm.Convocatoria);
            getAllConvocatorias();
            promise.then(function (value) {
                vm.Convocatorias = value;
                console.log("Consultare Modalidades del Programa");
                getModalidades();
                console.log("Consultare modalidades Relacionadas");
                showModalitiesRelation();
                console.log("Ya debi mostrar Tabla");
            });
        }
        //funcion para mostrar Modalidades asociadas a la convocatoria
        function showModalitiesRelation() {
            var promise = Convocatoria.showModalitiesRelation(vm.Convocatoria);
            promise.then(function (value) {

                vm.ModalidadesAsociadas=value;

                console.log(vm.ModalidadesAsociadas)

            });
        }
        //funcion para inscribir una modalidad a la convocatoria
        function addConvocatoriaModalidad() {
            vm.agrega.idConvocatoria=vm.Convocatoria.id;
            vm.agrega.Modalidad.push(vm.Convocatoria.id);
            vm.agrega.Modalidad.push(vm.Modalidad.id);
            var promise = Convocatoria.showModalitiesRelation(vm.agrega);
            promise.then(function (value) {

                vm.ModalidadesAsociadas=value;

                console.log(vm.ModalidadesAsociadas)
                vm.agrega={
                    "idConvocatoria" : null,
                    "Modalidad": null
                }

            });
        }

        //funcion para quitar modalidades de la convocatoria
        function quitarModalidadConvocatoria() {

            var promise = Convocatoria.deleteConvocatoriaModalidad(vm.Convocatoria);
            promise.then(function (value) {

                vm.ModalidadesAsociadas=value;

                console.log(vm.ModalidadesAsociadas)

            });
        }
        //funcion eliminar todas las modalidades
        function QuitarTodasModalidadConvocatoria(){
            var promise = Convocatoria.deleteConvocatoriaModalidadAll(vm.Convocatoria);
            promise.then(function (value) {

                vm.ModalidadesAsociadas=value;

                console.log(vm.ModalidadesAsociadas)

            });
        }
        // Crear requisito

        function crearRequisito(){
            vm.Requisitos.push(vm.requisito);

            vm.requisito={
                "Nombre":null,
                "Descripcion":null
            }
            console.log("Los requisitos son:");
            console.log(vm.Requisitos);
        }

        function eliminarConvocatoria() {

            var promise = Convocatoria.deleteConvocatoria(vm.Convocatoria);
            promise.then(function (value) {
                toastr.success(vm.successDeleteText,vm.successDeleteText);
                vm.Convocatoria={
                    "id": null,
                    "Nombre":null,
                    "FechaInicio":null,
                    "FechaTermino":null,
                    "Requisitos":null,
                    "MontosMaximosTotales":null,
                    "Activo":null,
                    "ProgramaAsociado":null,
                    "created_at":null,
                    "updated_at":null,
                    "modalidad":null

                };
                getAllConvocatorias();
                cancel();
            });

        }








    }

})();

