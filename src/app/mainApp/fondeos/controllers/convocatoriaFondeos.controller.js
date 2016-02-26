(function () {
    'use strict';

    angular
        .module('app.mainApp.fondeos')
        .controller('convocatoriaFondeosController', convocatoriaFondeosController);

    /* @ngInject */
    function convocatoriaFondeosController($scope, $timeout, $rootScope, Modalidad, Fondeo, Convocatoria, toastr, Restangular, $state, Translate) {
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
        vm.Fondeos = null;
        //Objeto de Modalidad.
        vm.Modalidad = {
            "id": null,
            "idProgramaFondeo": null,
            "Nombre": null,
            "Montos": null,
            "FigurasApoyo": null,
            "CriteriosEvaluacion": null,
            "Entregables": null,
            "created_at": null,
            "updated_at": null
        }
        //arreglo de modalidades
        //Todas las Modalidades
        vm.Modalidades = [];
        //modalidades asociadas a la convocatoria
        vm.ModalidadSeleccionada = [];
        vm.ModalidadesAsociadas = null;

        vm.Validator = [{
            title: 'Activo',
            value: 1
        }, {
            title: 'Inactivo',
            value: 0
        }];
        //Objeto Convocatoria
        vm.Convocatoria = {
            "id": null,
            "Nombre": null,
            "FechaInicio": null,
            "FechaTermino": null,
            "Requisitos": null,
            "MontosMaximosTotales": null,
            "Activo": null,
            "ProgramaAsociado": null,
            "created_at": null,
            "updated_at": null,
            "modalidad": null

        }
        vm.ModalidadAgregada = {
            "idConvocatoria": null,
            "Modalidad": []
        }
        vm.ModalidadEliminada = {
            "idConvocatoria": null,
            "modalidad": null
        }
        //Arreglo Convocatorias
        vm.Convocatorias = null;

        //Objeto Requisito
        vm.requisito = {
            "Nombre": null,
            "Descripcion": null
        }
        //Arreglo requisitos
        vm.Requisitos = [];
        //Objeto de tabla Pivote:
        vm.pivot = {
            "idConvocatoria": null,
            "idModalidad": null,
            "created_at": null,
            "updated_at": null
        }
        //objeto para agregarconvocatoria
        vm.agrega = {
            "idConvocatoria": null,
            "modalidad": null
        }
        //variables


        vm.tmp = null;
        vm.selectedConvocatoria = null;
        vm.selectedModalidad = null;
        vm.selectedFondeo = null;
        vm.selectedRequisito = null;
        //controles GUIS
        vm.isDisabled = false;
        vm.isNewConvocatoria = true;
        vm.isNewRequisito = true;

        //DeclaracionFunciones
        //funciones para el To-Do

        //funcionalidad
        vm.error = null;
        vm.getModalidades = getModalidades;//listo
        vm.getFondeos = getFondeos;//listo
        vm.getFondeo = getFondeo;//Listo
        vm.cancel = cancel;//listo
        vm.getAllConvocatorias = getAllConvocatorias;//listo
        vm.getConvocatoria = getConvocatoria;//listo
        vm.registrarConvocatoria = registrarConvocatoria;//listo
        vm.eliminarConvocatoria = eliminarConvocatoria;
        vm.showModalitiesRelation = showModalitiesRelation;//Listo
        vm.addConvocatoriaModalidad = addConvocatoriaModalidad;//Listo
        vm.quitarModalidadConvocatoria = quitarModalidadConvocatoria;//Listo
        vm.quitarTodasModalidadConvocatoria = QuitarTodasModalidadConvocatoria;//listo
        vm.crearRequisito = crearRequisito;
        vm.eliminarRequisito = eliminarRequisito;
        vm.editarRequisito = editarRequisito;


        //Funcionalidades
        function activate() {
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
                vm.selectedFondeo = value;
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
                vm.selectedFondeo = value;
                var promise = Modalidad.showModalitiesRelationFondeos(vm.selectedFondeo);
                promise.then(function (value) {
                    vm.Modalidades = value;
                    console.log("Modalidades");
                    console.log(vm.Modalidades);
                    //hello

                });
                //console.log(vm.selectedFondeo);
            });
            console.log(vm.selectedFondeo);
            //console.log("Consultando Modalidades");

        }

        //Funcion Obtener todas las Convocatorias
        function getAllConvocatorias() {
            var promise = Convocatoria.getAllConvocatorias();
            promise.then(function (value) {

                vm.Convocatorias = value;

                console.log(vm.Convocatorias)

            });
        }

        //Funcion para Seleccionar 1 Convocatoria
        function getConvocatoria() {
            console.log("Ya seleccione");
            console.log(vm.selectedConvocatoria);
            vm.Convocatoria = vm.selectedConvocatoria;
            vm.Requisitos = JSON.parse(vm.Convocatoria.Requisitos);
            getModalidades();
            showModalitiesRelation();

        }

        //Funcion Cancelar
        function cancel() {

            vm.selectedFondeo = null;
            vm.fondeo = null;
            vm.isNewFondeo = true;
            vm.Modalidad = null;
            vm.selectedModalidad = null;
            vm.isNewModalidad = null;
            vm.requisito = null;
            vm.selectedRequisito = null;
            vm.isNewRequisito = null;
            vm.Convocatoria = null;
            vm.isNewConvocatoria = null;
            vm.Requisitos = null;
            vm.Modalidades = null;


        }

        //Registrar Convocatoria
        function registrarConvocatoria() {
            vm.Convocatoria.ProgramaAsociado = vm.selectedFondeo.id;
            vm.Convocatoria.Requisitos = vm.Requisitos;
            console.log("Entrando a la funcion");
            console.log(vm.Convocatoria)
            if (vm.Convocatoria.id == null) {
                console.log("Creando Convocatoria");
                var promise = Convocatoria.crearConvocatoria(vm.Convocatoria);
                promise.then(function (res) {
                    toastr.success(vm.successText, vm.successStoreText);
                    vm.Convocatoria = res;
                    vm.ConvocatoriaLabel = vm.Convocatoria.Nombre;
                }).catch(function (err) {
                    toastr.error(vm.failureText, vm.failureStoreText);
                    console.log(err);
                });
            }
            else {
                console.log("Estoy editando");
                var promise = Convocatoria.updateConvocatoria(vm.Convocatoria);
                promise.then(function (res) {
                    toastr.success(vm.successText, vm.successUpdateText);
                    vm.ConvocatoriaLabel = vm.Convocatoria.Nombre;
                }).catch(function (err) {
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

                vm.ModalidadesAsociadas = value;
                console.log("Modalidades Asociadas:")
                console.log(vm.ModalidadesAsociadas)

            });
        }

        //funcion para inscribir una modalidad a la convocatoria
        function addConvocatoriaModalidad(modal) {

            //vm.agrega.idConvocatoria=vm.Convocatoria.id;
            //vm.agrega.Modalidad=modal.id;
            console.log("Modal es igual:")
            console.log(modal);
            console.log("id:" + vm.Convocatoria.id)
            vm.ModalidadAgregada.idConvocatoria = vm.Convocatoria.id;
            vm.ModalidadAgregada.Modalidad.push(modal.id);
            console.log("Modalidad:" + modal.id)
            console.log("El objeto a Enviar quedo:")
            console.log(vm.ModalidadAgregada);
            if (modal != null) {
                console.log("Voy a hacer el promise:")
                //Prueba Manual

                console.log(vm.ModalidadAgregada);

                var promise = Convocatoria.addConvocatoriaModalidad(vm.ModalidadAgregada);
                promise.then(function (value) {
                    toastr.success(vm.successText, vm.successStoreText);
                    console.log("Ya hice el promise")
                    vm.Convocatoria = value;
                    console.log("La respuesta del server Fue:");
                    console.log(vm.Convocatoria)
                    console.log(vm.ModalidadesAsociadas)
                    vm.ModalidadAgregada.idConvocatoria = null;
                    vm.ModalidadAgregada.Modalidad = [];
                    showModalitiesRelation();

                });

            }


            showModalitiesRelation();
        }


        //funcion para quitar modalidades de la convocatoria
        function quitarModalidadConvocatoria(modality) {
            console.log("Modality es igual:")
            console.log(modality);
            console.log("id:" + vm.Convocatoria.id)
            vm.ModalidadEliminada.idConvocatoria = vm.Convocatoria.id;
            vm.ModalidadEliminada.modalidad = modality.id;
            console.log("Modalidad:" + modality.id)
            console.log("El objeto a Enviar quedo:")
            console.log(vm.ModalidadEliminada);
            var promise = Convocatoria.deleteConvocatoriaModalidad(vm.ModalidadEliminada);
            promise.then(function (value) {
                toastr.success(vm.successDeleteText, vm.successDeleteText);


                showModalitiesRelation();

            });
        }

        //funcion eliminar todas las modalidades
        function QuitarTodasModalidadConvocatoria() {
            var promise = Convocatoria.deleteConvocatoriaModalidadAll(vm.Convocatoria);
            promise.then(function (value) {

                vm.ModalidadesAsociadas = value;

                console.log(vm.ModalidadesAsociadas)

            });
        }

        // Crear requisito

        function crearRequisito() {
            if (vm.requisito != null) {
                console.log(vm.Requisitos);
                vm.Requisitos.push(vm.requisito);

                vm.requisito = {
                    "Nombre": null,
                    "Descripcion": null
                };

                console.log("Los requisitos son:");
                console.log(vm.Requisitos);
            }
        }

        // Eliminar Requisito
        // Crear requisito

        function eliminarRequisito(requi) {

           vm.Requisitos.forEach(function (value, index) {
                console.log(value);
                if (value.nombre === requi.nombre) {
                    console.log(requi);
                    console.log(vm.Requisitos);
                    //vm.Requisitos.splice(index, 1);
                }
            });
        }

        function editarRequisito(requisito) {


        }


        function eliminarConvocatoria() {

            var promise = Convocatoria.deleteConvocatoria(vm.Convocatoria);
            promise.then(function (value) {
                toastr.success(vm.successDeleteText, vm.successDeleteText);
                vm.Convocatoria = {
                    "id": null,
                    "Nombre": null,
                    "FechaInicio": null,
                    "FechaTermino": null,
                    "Requisitos": null,
                    "MontosMaximosTotales": null,
                    "Activo": null,
                    "ProgramaAsociado": null,
                    "created_at": null,
                    "updated_at": null,
                    "modalidad": null

                };
                getAllConvocatorias();
                cancel();
            });

        }


    }

})();

