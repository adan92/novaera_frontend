/**
 * Created by lockonDaniel on 10/15/15.
 */

(function() {
    'use strict';

    angular
        .module('app.mainApp.proyectos')
        .controller('ejecucionProyectosController', ejecucionProyectosController);

    /* @ngInject */
    function ejecucionProyectosController($scope,Upload,Restangular,ROUTES) {
        var vm = this;
        vm.activate                 =  activate();
        vm.proyectos                =  null;
        vm.Ejecucion                =  {
            "id":null,
            "Requisitos": 0,
            "AnalisisEntornoP": 0,
            "FactibilidadTecnicaP": 0,
            "FactibilidadEconomicaP": 0,
            "FactibilidadComercialP": 0,
            "BenchmarkComercialP": 0,
            "BenchmarkTecnologicoP": 0,
            "RecursosHumanosP": 0,
            "RecursosFinancierosP": 0,
            "RecursosTecnologicosP": 0,
            "RecursosMaterialesP": 0
        }
        vm.file                     =  null;
        vm.fileList                 =  null;
        vm.steps                    = [
                'PROJECT.IMPACT.PROJECT_SELECT',
                'PROJECT.EXECUTION.REQUIREMENTS',
                'PROJECT.EXECUTION.ENVIORNMENT',
                'PROJECT.EXECUTION.TECHNICAL_FACTIBILITY',
                'PROJECT.EXECUTION.ECONOMICAL_FACTIBILITY',
                'PROJECT.EXECUTION.COMMERCIAL_FACTIBILITY',
                'PROJECT.EXECUTION.COMMERCIAL_BENCHMARK',
                'PROJECT.EXECUTION.TECHNOLOGICAL_BENCHMARK',
                'PROJECT.EXECUTION.HUMAN_RESOURCES',
                'PROJECT.EXECUTION.TECHNOLOGICAL_RESOURCES',
                'PROJECT.EXECUTION.MATERIAL_RESOURCES'
            ];
        vm.selectedProject          =  null;
        vm.uploadFile               =  uploadFile;
        vm.getEjecucion             =  getEjecucion;

        //File List
        vm.requerimientosFile       = null;
        vm.entornoFile              = null;
        vm.factibilidadTFile        = null;

        /**
         * Función que se activa al inicio del script
         */

        function activate()
        {
            Restangular.all('Proyecto').all('Persona').customGET().then(function(res){
                vm.proyectos = res.Proyectos;
            }).catch(function(err){

            });

            /*
            */
        }


        /**
         * Función para obtener la ejecución de un proyecto seleccionado
         */

        function getEjecucion()
        {
            Restangular.one('Ejecucion',vm.selectedProject).customGET().then(function(res){
                vm.Ejecucion = res;
                Restangular.all('Ejecucion').one('Archivos',vm.selectedProject).customGET().then(function(res){
                    vm.fileList             = res.Archivos;
                    vm.requerimientosFile   = search('Requerimientos');
                    vm.entornoFile          = search('AnalisisEntornoP');
                    vm.factibilidadTFile    = search('FactibilidadTecnicaP');
                }).catch(function(err){});


            }).catch(function(err){

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
            archivo.Ruta = ROUTES.FILE_ROUTE+archivo.Ruta;
            archivo.Nombre = archivo.Ruta.substring(archivo.Ruta.lastIndexOf('/')+1);
            return archivo
        }



        /*
            Las siguientes dos funciones trabajan en conjunto con uploadFile. Se encargan de mover la variable
            de ejecución de acuerdo a lo que se suba además de actualizar el archivo correcto en caso de existir
         */

        function updateLocalEjecucion(type)
        {
            switch (type)
            {
                case 'Requerimientos':
                    vm.Ejecucion.Requisitos = 1;
                    break;
                case 'AnalisisEntornoP':
                    vm.Ejecucion.AnalisisEntornoP=1;
                    break;
                case 'FactibilidadTecnicaP':
                    vm.Ejecucion.FactibilidadTecnicaP = 1;
                    break;
            }

        }
        function updateFileName(type,file)
        {
            switch (type)
            {
                case 'Requerimientos':
                    vm.requerimientosFile = file;
                    break;
                case 'AnalisisEntornoP':
                    vm.entornoFile = file;
                    break;
                case 'FactibilidadTecnicaP':
                    vm.factibilidadTFile = file;
                    break;
            }
        }


        /**
         * Función general para subir archivos, la BD hace el cambio tan pronto se suba el archivo dado
         * el objeto vm.Ejecucion dado
         * @param fileType
         */


        function uploadFile(fileType)
        {
            if(vm.file!=null)
            {
                var route = null;
                if(vm.Ejecucion.id!=null)
                {
                    route = 'Ejecucion/Update';
                }
                else route = 'Ejecucion';
                updateLocalEjecucion(fileType);
                Upload.upload({
                    url: ROUTES.API_ROUTE+route,
                    data:{
                        file:vm.file,
                        type:fileType,
                        name:vm.file.name,
                        Ejecucion:vm.Ejecucion,
                        idProyecto:vm.selectedProject
                    },
                    disableProgress: false
                }).then(function(res){
                    updateFileName(fileType,parseArchivo(res.data.Archivo));
                    vm.Ejecucion= res.data.Ejecucion;
                }), function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                };


            }
        }


    }
})();
