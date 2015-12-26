/**
 * Created by lockonDaniel on 12/17/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('impactoProyectosController', impactoProyectosController);

    /* @ngInject */
    function impactoProyectosController(Translate,Upload,Restangular,toastr,ROUTES) {

        var vm                      = this;
        vm.steps                    = [
            'PROJECT.IMPACT.PROJECT_SELECT',
            'PROJECT.IMPACT.ENVIORNMENTAL_IMPACT',
            'PROJECT.IMPACT.SCIENTIFIC_IMPACT',
            'PROJECT.IMPACT.TECHNOLOGICAL_IMPACT',
            'PROJECT.IMPACT.SOCIAL_IMPACT',
            'PROJECT.IMPACT.ECONOMIC_IMPACT',
            'PROJECT.IMPACT.VALUE_PROPOSAL',
            'PROJECT.IMPACT.CLIENT_SEGMENTS',
            'PROJECT.IMPACT.PROPOSED_SOLUTION',
            'PROJECT.IMPACT.METRICS',
            'PROJECT.IMPACT.CURRENT_SOLUTION'];
        vm.activate                 =  activate();
        vm.completed                =  0;
        vm.proyectos                =  null;
        vm.Impacto                  =  {
            id:null,
            ImpactoAmbiental: null,
            ImpactoCientifico: null,
            ImpactoTecnologico: null,
            ImpactoSocial: null,
            ImpactoEconomico: null,
            PropuestaDeValor: null,
            SegmentosDeClientes: null,
            SolucionPropuesta: null,
            Metricas: null,
            SolucionActual: null
        }
        vm.file                     =  null;
        vm.fileList                 =  null;
        vm.selectedProject          =  null;
        vm.uploadFile               =  uploadFile;
        vm.getImpacto               =  getImpacto;

        //File List
        vm.impactoAFile             = null;
        vm.impactoCFile             = null;
        vm.impactoTFile             = null;
        vm.impactoSFile             = null;
        vm.impactoEFile             = null;
        vm.propuestaVFile           = null;
        vm.segmentosFile            = null;
        vm.solucionPFile            = null;
        vm.metricasFile             = null;
        vm.solucionAFile            = null;
        vm.recursosMFile            = null;

        //Text
        vm.updateText               = updateText;

        //Messages
        vm.proyectoLabel            = 'PROJECT.REGISTER.SELECTING_PROJECT';
        vm.failMessage              = null;
        vm.failTitle                = null;
        vm.successTitle             = null;
        vm.successStore             = null;
        vm.successUpdate            = null;


        /**
         * Función que se activa al inicio del script
         */

        function activate()
        {
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
                vm.proyectos = res.Proyectos;
            }).catch(function(err){

            });
            vm.successStore = Translate.translate('DIALOGS.SUCCESS_STORE');
            vm.successUpdate = Translate.translate('DIALOGS.SUCCESS_UPDATE');
            vm.successTitle = Translate.translate('DIALOGS.SUCCESS');
            vm.failTitle = Translate.translate('DIALOGS.FAILURE');
            vm.failMessage = Translate.translate('DIALOGS.FAIL_STORE');




            /*
             */
        }


        /**
         * Función para obtener la ejecución de un proyecto seleccionado
         */

        function getImpacto()
        {
            vm.proyectoLabel = vm.selectedProject.Titulo;
            Restangular.one('Impacto',vm.selectedProject.id).customGET().then(function(res){
                vm.Impacto = res;

                Restangular.all('Impacto').one('Archivos',vm.selectedProject.id).customGET().then(function(res){
                    vm.fileList             = res.Archivos;
                    vm.impactoAFile         = search('ImpactoAmbiental');
                    vm.impactoCFile         = search('ImpactoCientifico');
                    vm.impactoTFile         = search('ImpactoTecnologico');
                    vm.impactoSFile         = search('ImpactoSocial');
                    vm.impactoEFile         = search('ImpactoEconomico');
                    vm.propuestaVFile       = search('PropuestaDeValor');
                    vm.segmentosFile        = search('SegmentosDeClientes');
                    vm.solucionPFile        = search('SolucionPropuesta');
                    vm.metricasFile         = search('Metricas');
                    vm.solucionAFile        = search('SolucionActual');
                    vm.recursosMFile        = search('RecursosMaterialesP');
                    vm.completed            = checkFinished();

                }).catch(function(err){
                    vm.completed            = checkFinished();

                });


            }).catch(function(err){
                vm.Impacto                =  {
                    id:null,
                    ImpactoAmbiental: null,
                    ImpactoCientifico: null,
                    ImpactoTecnologico: null,
                    ImpactoSocial: null,
                    ImpactoEconomico: null,
                    PropuestaDeValor: null,
                    SegmentosDeClientes: null,
                    SolucionPropuesta: null,
                    Metricas: null,
                    SolucionActual: null
                }
                vm.completed            = checkFinished();


            });

        }

        /**
         * Función para buscar archivos por su tipo una vez que se llama a Ejecución/Archivo/{id}
         * @param type
         * @returns {*}
         */

        function search (type) {
            var results = type ? vm.fileList.filter( createFilterFor(type) ) :null;
            return parseArchivo(results[0]);
        }

        /**
         * Función filtro
         * @param type
         * @returns {Function}
         */

        function createFilterFor(type) {
            return function filterFn(item) {
                return (item.Tipo.indexOf(type) === 0);
            };
        }

        /**
         * Función que recibe un parámetro de tipo archivo y se encarga de darle ruta y nombre
         * @param archivo
         * @returns {*}
         */

        function parseArchivo(archivo)
        {
            if(archivo!=undefined)
            {
                archivo.Ruta = ROUTES.FILE_ROUTE+archivo.Ruta;
                archivo.Nombre = archivo.Ruta.substring(archivo.Ruta.lastIndexOf('/')+1);
                return archivo
            }
            return null;

        }



        /*
         Las siguientes dos funciones trabajan en conjunto con uploadFile. Se encargan de mover la variable
         de ejecución de acuerdo a lo que se suba además de actualizar el archivo correcto en caso de existir
         */


        function updateFileName(type,file)
        {
            switch (type)
            {
                case 'ImpactoAmbiental':
                    vm.impactoAFile = file;
                    break;
                case 'ImpactoCientifico':
                    vm.impactoCFile = file;
                    break;
                case 'ImpactoTecnologico':
                    vm.impactoTFile = file;
                    break;
                case 'ImpactoSocial':
                    vm.impactoSFile = file;
                    break;
                case 'ImpactoEconomico':
                    vm.impactoEFile = file;
                    break;
                case 'PropuestaDeValor':
                    vm.propuestaVFile = file;
                    break;
                case 'SegmentosDeClientes':
                    vm.segmentosFile = file;
                    break;
                case 'SolucionPropuesta':
                    vm.solucionPFile = file;
                    break;
                case 'Metricas':
                    vm.metricasFile =file;
                    break;
                case 'SolucionActual':
                    vm.solucionAFile =file;
                    break;
                case 'RecursosMaterialesP':
                    vm.recursosMFile =file;
                    break;
            }
        }

        function checkFinished()
        {
            var completed = 0;
            if( (vm.Impacto.Requisitos!=null && vm.Impacto.Requisitos!="") || vm.impactoAFile!=null)
                completed+=1;
            if( (vm.Impacto.ImpactoCientifico !=null && vm.Impacto.ImpactoCientifico !="") || vm.impactoCFile!=null)
                completed+=1;
            if( (vm.Impacto.ImpactoTecnologico!=null && vm.Impacto.ImpactoTecnologico!="") || vm.impactoTFile!=null)
                completed+=1;
            if( (vm.Impacto.ImpactoSocial !=null && vm.Impacto.ImpactoSocial !="") || vm.impactoSFile!=null)
                completed+=1;
            if( (vm.Impacto.ImpactoEconomico !=null && vm.Impacto.ImpactoEconomico !="") || vm.impactoEFile!=null)
                completed+=1;
            if( (vm.Impacto.PropuestaDeValor !=null && vm.Impacto.PropuestaDeValor !="") || vm.propuestaVFile!=null)
                completed+=1;
            if( (vm.Impacto.SegmentosDeClientes !=null && vm.Impacto.SegmentosDeClientes !="") || vm.segmentosFile!=null)
                completed+=1;
            if( (vm.Impacto.SolucionPropuesta !=null && vm.Impacto.SolucionPropuesta !="") || vm.solucionPFile!=null)
                completed+=1;
            if( (vm.Impacto.Metricas !=null && vm.Impacto.Metricas !="") || vm.metricasFile!=null )
                completed+=1;
            if( (vm.Impacto.SolucionActual !=null && vm.Impacto.SolucionActual !="") || vm.solucionAFile!=null)
                completed+=1;
            completed = (completed/10)*100
            completed = completed.toFixed(0)
            return completed;
        }


        /**
         * Función general para subir archivos, la BD hace el cambio tan pronto se suba el archivo dado
         * el objeto vm.Impacto dado
         * @param fileType
         */


        function uploadFile(fileType)
        {
            if(vm.file!=null)
            {
                var route = null;
                if(vm.Impacto.id!=null)
                {
                    route = 'Impacto/Update';
                }
                else route = 'Impacto';
                Upload.upload({
                    url: ROUTES.API_ROUTE+route,
                    data:{
                        file:vm.file,
                        type:fileType,
                        name:vm.file.name,
                        Impacto:vm.Impacto,
                        idProyecto:vm.selectedProject.id
                    },
                    disableProgress: false
                }).then(function(res){
                    updateFileName(fileType,parseArchivo(res.data.Archivo));
                    vm.Impacto= res.data.Impacto;
                    vm.completed = checkFinished();
                    toastr.success(vm.successTitle,vm.successUpdate);


                }), function (resp) {
                    console.log('Error status: ' + resp.status);
                    toastr.error(vm.failTitle,vm.failMessage);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                };


            }
        }


        /**
         * Función para actualizar el texto
         */

        function updateText()
        {
            var request = {idProyecto:vm.selectedProject.id,Impacto:vm.Impacto};
            if(vm.Impacto.id==null)
            {
                Restangular.all('Impacto').customPOST(request).then(function(res){
                    vm.Impacto = res.Impacto;
                    toastr.success(vm.successTitle,vm.successStore);
                }).catch(function(err){
                    toastr.error(vm.failTitle,vm.failMessage);
                });
            }
            else
            {
                Restangular.all('Impacto').all('Update').customPOST(request).then(function(res){
                    vm.Impacto = res.Impacto;
                    toastr.success(vm.successTitle,vm.successUpdate);
                }).catch(function(err){
                    toastr.error(vm.failTitle,vm.failMessage);
                });

            }
            vm.completed = checkFinished();
        }


    }
})();
