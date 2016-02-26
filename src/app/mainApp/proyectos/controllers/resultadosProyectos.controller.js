/**
 * Created by lockonDaniel on 10/16/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('resultadosProyectosController', resultadosProyectosController)

    ;

    /* @ngInject */
    function resultadosProyectosController( $translate,Catalogo,Proyecto,TRL,$scope,Translate,toastr,moment) {
        var vm = this;
        vm.language="en";
        vm.language=$translate.use();
        vm.activate = activate();
        vm.waiting = true;
        vm.isCreating = true;
        vm.paisesProteccion = [];
        vm.proyectosTRL=[];
        vm.resultado = {
            id: null,
            idProyectoTRL: null,
            Tipo: null,
            Nombre: null,
            Resumen: null,
            NumeroRegistro: null,
            Status: null,
            PaisesProteccion: [],
            PlanDeExplotacion: null,
            AreaDeAplicacion: null,
            Avance: null,
            Fecha: null,
            FechaAprobacion: null
        };


        vm.tipos = [{value:"Proceso",display:"Proceso"},{value:"Producto",display:"Producto"},{value:"Servicio",display:"Servicio"}];
        vm.status = [{value:"Sin iniciar",display:"Sin iniciar"},{value:"En Proceso",display:"En Proceso"},{value:"Completado",display:"Completado"}];


        //
        vm.changeModel        = changeModel;
        vm.showTable          = true;
        vm.changeResult       = changeResult;
        vm.addResult          = addResult;

        //Variables para el md-autocomplete de proyecto
        vm.querySearch        = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.proyectos          = null;
        vm.selectedItem       = null;
        vm.searchText         = null;
        vm.simulateQuery      = false;
        vm.isDisabled         = false;
        //Variables para el md-autocomplete de países
        vm.selectedPais       = null;
        vm.searchTextPais     = null;
        vm.paisSearch         = paisSearch;
        vm.appendPais         = appendPais;


        //Variables para la tabla
        vm.resultados         = null;
        vm.patentes           = null;
        vm.proyectosPromise   = null;
        vm.tableModel         = null;

        vm.query            = {
            filter: '',
            limit: '10',
            order: 'id',
            page: 1
        };



        function activate()
        {
            var promise = Proyecto.getAllProjects();
            promise.then(function (res) {
                vm.proyectos = res;

                var proms = Catalogo.getAllCatalogo('Pais');
                proms.then(function (res) {
                    vm.paises = res.Pais;
                    vm.waiting = false;
                    vm.isCreating = false;
                }).catch(function (err) {
                    vm.waiting = false;
                    vm.isCreating = false;
                    toastr.error(vm.failureText, vm.failureLoad);
                });
            }).catch(function (err) {
                vm.waiting = false;
                vm.isCreating = false;
                toastr.error(vm.failureText, vm.failureLoad);
            });

            vm.sureText             = Translate.translate('DIALOGS.YOU_SURE');
            vm.acceptText           = Translate.translate('DIALOGS.ACCEPT');
            vm.cancelText           = Translate.translate('DIALOGS.CANCEL');
            vm.dialogText           = Translate.translate('DIALOGS.WARNING');
            vm.successText          = Translate.translate('DIALOGS.SUCCESS');
            vm.successStoreText     = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdateText    = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successDeleteText    = Translate.translate('DIALOGS.SUCCESS_DELETE');
            vm.failureText          = Translate.translate('DIALOGS.FAILURE');
            vm.failureStoreText     = Translate.translate('DIALOGS.FAIL_STORE');
            vm.failureDeleteText    = Translate.translate('DIALOGS.FAIL_DELETE');
            vm.failureLoad          = Translate.translate('DIALOGS.FAIL_LOAD');
            vm.cancelDelete = Translate.translate('DIALOGS.CANCEL_DELETE');
            vm.cancelTitle = Translate.translate('DIALOGS.CANCEL_TITLE');
            vm.dialogTextOne        = Translate.translate('DIALOGS.WARNING_ONE');

        }


        //
        function changeResult(item)
        {
            vm.resultado = item;
            if(vm.resultado.PaisesProteccion==null && vm.resultado.Tipo!='Patente')
            {
                vm.resultado.PaisesProteccion = [];
            }
            else
            {
                try{
                    vm.resultado.PaisesProteccion = angular.fromJson(vm.resultado.PaisesProteccion);
                }catch (err)
                {
                }

            }
        }

        ///

        function changeModel()
        {
            vm.resultado = {
                "id": null,
                "idProyectoTRL": null,
                "Tipo": null,
                "Nombre": null,
                "Resumen": null,
                "NumeroRegistro": null,
                "Status": null,
                "PaisesProteccion": [],
                "PlanDeExplotacion": null,
                "AreaDeAplicacion": null,
                "Avance": null,
                "Fecha": null,
                "FechaAprobacion": null
            };
            if(vm.showTable)
            {
                vm.tableModel = vm.resultados;
            }
            else
            {
                vm.tableModel = vm.patentes;
            }
        }


        //////////////////
        function querySearch (query) {
            var results = query ? vm.proyectos.filter( createFilterForProyecto(query) ) : vm.proyectos, deferred;
            return results;

        }


        /**
         * Filtro para Proyecto
         */
        function createFilterForProyecto(query) {

            return function filterFn(proyecto) {
                return (proyecto.Titulo.indexOf(query) === 0);
            };
        }

        /**
         * Filtro para País
         */
        function createFilterForPais(query) {
            return function filterFn(pais) {
                return (pais.Nombre.indexOf(query) === 0);
            };
        }


        /**
         * Buscar País
         */
        function paisSearch (query) {
            var results = query ? vm.paises.filter( createFilterForPais(query) ) : vm.paises, deferred;
            return results;
        }

        /**
         * Función que regresa el mapeo del chip a un modelo
         */
        function appendPais(chip)
        {
            var index  =_.findIndex(vm.resultado.PaisesProteccion,function(obj){
                return obj.Nombre === chip.Nombre;
            });
            if(index!=-1)
            {
                vm.resultado.PaisesProteccion.splice(index,1);
            }
            return chip;
        }


        /**
         * Función de selección de proyecto
         */

        function selectedItemChange()
        {
            var promise=null;
            promise = Proyecto.getResultado(vm.selectedItem.id,'Todos');
            promise.then(function (res) {
                res.Resultado.forEach(function(value,index){
                    value.Fecha=moment(value.Fecha).format("DD/MM/YYYY");
                });
               vm.resultados = res.Resultado;
               vm.tableModel = vm.resultados;

            }).catch(function(err){
                toastr.error(vm.failureText, vm.failureLoad);
            });
            promise = Proyecto.getResultado(vm.selectedItem.id,'Patente');
            promise.then(function (res) {
                res.Resultado.forEach(function(value,index){
                    value.Fecha=moment(value.Fecha).format("DD/MM/YYYY");
                    value.FechaAprobacion=moment(value.FechaAprobacion).format("DD/MM/YYYY");
                });
                vm.patentes = res.Resultado;
            }).catch(function(err){
                toastr.error(vm.failureText, vm.failureLoad);
            });
            promise=TRL.getTRLByProject(vm.selectedItem.id);
            promise.then(function (res) {
                vm.proyectosTRL = res.TRL;
            }).catch(function(err){
            });
        }


        /**
         * Funcion para agregar resultado
         */

        function addResult(type)
        {
            vm.resultado.idProyecto = vm.selectedItem.id;
            vm.resultado.Fecha=moment(vm.resultado.Fecha).format('YYYY-MM-DD');
            if(type=="Patente")
            {
                vm.resultado.Tipo = type;
                vm.resultado.PaisesProteccion = angular.toJson(vm.resultado.PaisesProteccion,0);
            }
            var request={
                idProyecto:vm.selectedItem.id,
                Resultado:vm.resultado
            };
            var promise;
            if(vm.resultado.id !=null)
            {
                promise=Proyecto.updateResultado(request);
                promise.then(function(res){
                   vm.resultado = res;
                   toastr.success(vm.successText,vm.successUpdateText);
                }).catch(function(err)
                {
                    toastr.error(vm.failureText,vm.failureStoreText);
                });
            }
            else
            {
                promise=Proyecto.saveResultado(request);
                promise.then(function(res){
                    vm.resultado = res;
                    toastr.success(vm.successText,vm.successUpdateText);
                }).catch(function(err)
                {
                    toastr.error(vm.failureText,vm.failureStoreText);
                });

            }

            $scope.agregarResultado.$setPristine();
        }



    }
})();
