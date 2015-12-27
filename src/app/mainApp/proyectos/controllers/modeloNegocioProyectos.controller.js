/**
 * Created by lockonDaniel on 12/17/15.
 */
(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('modeloNegocioProyectosController', modeloNegocioProyectosController);

    /* @ngInject */
    function modeloNegocioProyectosController(Translate,Upload,Restangular,toastr,ROUTES) {

        var vm                      = this;
        vm.steps                    = [
            'PROJECT.BUSINESS_MODEL.PROJECT_SELECT',
            'PROJECT.BUSINESS_MODEL.CHANNELS',
            'PROJECT.BUSINESS_MODEL.COMPETITIVE_ADVANTAGE',
            'PROJECT.BUSINESS_MODEL.PROBLEMATIQUE',
            'PROJECT.BUSINESS_MODEL.COSTS',
            'PROJECT.BUSINESS_MODEL.INCOME',
            'PROJECT.BUSINESS_MODEL.KEY_ACTIVITIES',
            'PROJECT.BUSINESS_MODEL.CLIENT_RELATIONSHIPS',
            'PROJECT.BUSINESS_MODEL.KEY_RESOURCES',
            'PROJECT.BUSINESS_MODEL.KEY_ALLIES'
            ];
        vm.activate                 =  activate();
        vm.completed                =  0;
        vm.proyectos                =  null;
        vm.ModeloNegocio                  =  {
            id:null,
            Canales: null,
            VentajaCompetitiva: null,
            Problematica: null,
            Costos: null,
            Ingresos: null,
            ActividadesClave: null,
            RelacionesCliente: null,
            RecursosClave: null,
            AliadosClave: null
        }
        vm.file                     =  null;
        vm.fileList                 =  null;
        vm.selectedProject          =  null;
        vm.uploadFile               =  uploadFile;
        vm.getModeloNegocio         =  getModeloNegocio;

        //File List
        vm.canalesFile              = null;
        vm.ventajaCFile             = null;
        vm.problematicaFile         = null;
        vm.costosFile               = null;
        vm.ingresosFile             = null;
        vm.actividadesCFile         = null;
        vm.relacionesCFile          = null;
        vm.recursosCFile            = null;
        vm.aliadosCFile             = null;

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

        }


        /**
         * Función para obtener la ejecución de un proyecto seleccionado
         */

        function getModeloNegocio()
        {
            vm.proyectoLabel = vm.selectedProject.Titulo;
            Restangular.one('ModeloNegocio',vm.selectedProject.id).customGET().then(function(res){
                vm.ModeloNegocio = res;

                Restangular.all('ModeloNegocio').one('Archivos',vm.selectedProject.id).customGET().then(function(res){
                    vm.fileList             = res.Archivos;
                    vm.canalesFile          = search('Canales');
                    console.log(vm.canalesFile);
                    vm.ventajaCFile         = search('VentajaCompetitiva');
                    vm.problematicaFile     = search('Problematica');
                    vm.costosFile           = search('Costos');
                    vm.ingresosFile         = search('Ingresos');
                    vm.actividadesCFile     = search('ActividadesClave');
                    vm.relacionesCFile      = search('RelacionesCliente');
                    vm.recursosCFile        = search('RecursosClave');
                    vm.aliadosCFile         = search('AliadosClave');
                    vm.completed            = checkFinished();

                }).catch(function(err){
                    vm.completed            = checkFinished();

                });


            }).catch(function(err){
                vm.ModeloNegocio                =  {
                    id:null,
                    Canales: null,
                    VentajaCompetitiva: null,
                    Problematica: null,
                    Costos: null,
                    Ingresos: null,
                    ActividadesClave: null,
                    RelacionesCliente: null,
                    RecursosClave: null,
                    AliadosClave: null
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
                case 'Canales':
                    vm.canalesFile = file;
                    break;
                case 'VentajaCompetitiva':
                    vm.ventajaCFile = file;
                    break;
                case 'Problematica':
                    vm.problematicaFile = file;
                    break;
                case 'Costos':
                    vm.costosFile = file;
                    break;
                case 'Ingresos':
                    vm.ingresosFile = file;
                    break;
                case 'ActividadesClave':
                    vm.actividadesCFile = file;
                    break;
                case 'RelacionesCliente':
                    vm.relacionesCFile = file;
                    break;
                case 'RecursosClave':
                    vm.recursosCFile = file;
                    break;
                case 'AliadosClave':
                    vm.aliadosCFile =file;
                    break;
            }
        }

        function checkFinished()
        {
            var completed = 0;
            if( (vm.ModeloNegocio.Canales!=null && vm.ModeloNegocio.Canales!="") || vm.canalesFile!=null)
                completed+=1;
            if( (vm.ModeloNegocio.VentajaCompetitiva !=null && vm.ModeloNegocio.VentajaCompetitiva !="") || vm.ventajaCFile!=null)
                completed+=1;
            if( (vm.ModeloNegocio.Problematica!=null && vm.ModeloNegocio.Problematica!="") || vm.problematicaFile!=null)
                completed+=1;
            if( (vm.ModeloNegocio.Costos !=null && vm.ModeloNegocio.Costos !="") || vm.costosFile!=null)
                completed+=1;
            if( (vm.ModeloNegocio.Ingresos !=null && vm.ModeloNegocio.Ingresos !="") || vm.ingresosFile!=null)
                completed+=1;
            if( (vm.ModeloNegocio.ActividadesClave !=null && vm.ModeloNegocio.ActividadesClave !="") || vm.actividadesCFile!=null)
                completed+=1;
            if( (vm.ModeloNegocio.RelacionesCliente !=null && vm.ModeloNegocio.RelacionesCliente !="") || vm.relacionesCFile!=null)
                completed+=1;
            if( (vm.ModeloNegocio.RecursosClave !=null && vm.ModeloNegocio.RecursosClave !="") || vm.recursosCFile!=null)
                completed+=1;
            if( (vm.ModeloNegocio.AliadosClave !=null && vm.ModeloNegocio.AliadosClave !="") || vm.aliadosCFile!=null )
                completed+=1;
            completed = (completed/9)*100
            completed = completed.toFixed(0)
            return completed;
        }


        /**
         * Función general para subir archivos, la BD hace el cambio tan pronto se suba el archivo dado
         * el objeto vm.ModeloNegocio dado
         * @param fileType
         */


        function uploadFile(fileType)
        {
            if(vm.file!=null)
            {
                var route = null;
                if(vm.ModeloNegocio.id!=null)
                {
                    route = 'ModeloNegocio/Update';
                }
                else route = 'ModeloNegocio';
                Upload.upload({
                    url: ROUTES.API_ROUTE+route,
                    data:{
                        file:vm.file,
                        type:fileType,
                        name:vm.file.name,
                        ModeloNegocio:vm.ModeloNegocio,
                        idProyecto:vm.selectedProject.id
                    },
                    disableProgress: false
                }).then(function(res){
                    updateFileName(fileType,parseArchivo(res.data.Archivo));
                    vm.ModeloNegocio= res.data.ModeloNegocio;
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
            var request = {idProyecto:vm.selectedProject.id,ModeloNegocio:vm.ModeloNegocio};
            if(vm.ModeloNegocio.id==null)
            {
                Restangular.all('ModeloNegocio').customPOST(request).then(function(res){
                    vm.ModeloNegocio = res.ModeloNegocio;
                    toastr.success(vm.successTitle,vm.successStore);
                }).catch(function(err){
                    toastr.error(vm.failTitle,vm.failMessage);
                });
            }
            else
            {
                Restangular.all('ModeloNegocio').all('Update').customPOST(request).then(function(res){
                    vm.ModeloNegocio = res.ModeloNegocio;
                    toastr.success(vm.successTitle,vm.successUpdate);
                }).catch(function(err){
                    toastr.error(vm.failTitle,vm.failMessage);
                });

            }
            vm.completed = checkFinished();
        }


    }
})();
